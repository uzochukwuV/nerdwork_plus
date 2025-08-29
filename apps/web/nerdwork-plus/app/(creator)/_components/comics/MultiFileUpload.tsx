"use client";

import { useState, useRef } from "react";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { Image as ImageIcon, Plus, X, Trash, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Define a type for the file with a preview URL
interface FileWithPreview extends File {
  preview: string;
}

// Props for the component to integrate with React Hook Form
interface MultiFileUploadProps {
  field: ControllerRenderProps<any, any>;
}

// The individual sortable file item
const SortableFileItem = ({
  file,
  onRemove,
}: {
  file: FileWithPreview;
  onRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.name + file.lastModified });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="relative w-full aspect-[2/3] group overflow-hidden border-gray-700"
    >
      <img
        src={file.preview}
        alt={`Preview ${file.name}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-row-reverse justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
        {/* Drag Handle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 cursor-grab"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="w-6 h-6" />
        </Button>
        {/* Remove Button */}
        <Button
          size="icon"
          className="rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </Card>
  );
};

export function MultiFileUpload({ field }: MultiFileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const files = (field.value as FileWithPreview[]) || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileWithPreview[];

      const updatedFiles = [...files, ...newFiles];
      field.onChange(updatedFiles);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileWithPreview[];

      const updatedFiles = [...files, ...newFiles];
      field.onChange(updatedFiles);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    field.onChange(updatedFiles);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = files.findIndex(
        (file) => file.name + file.lastModified === active.id
      );
      const newIndex = files.findIndex(
        (file) => file.name + file.lastModified === over.id
      );

      const newOrder = arrayMove(files, oldIndex, newIndex);
      field.onChange(newOrder);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center p-6 border border-dashed border-[#292A2E] hover:opacity-75 hover:border-neutral-500 rounded-lg cursor-pointer transition-colors
        ${isDragOver ? "border-neutral-500" : ""}`}
      >
        <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
        <p className="text-sm font-semibold">
          {isDragOver ? "Drop files here" : "Add more pages"}
        </p>
        <p className="text-xs text-gray-500">
          Supports JPG, PNG, GIF. Multiple files allowed.
        </p>
        <p className="text-xs text-gray-500">
          Pages will be automatically sorted by filename, but you can reorder
          them below.
        </p>
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Draggable File Previews */}
      {files.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={files.map((file) => file.name + file.lastModified)}
          >
            <p className="font-semibold">Pages ({files.length})</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file, index) => (
                <SortableFileItem
                  key={file.name + file.lastModified}
                  file={file}
                  onRemove={() => removeFile(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
