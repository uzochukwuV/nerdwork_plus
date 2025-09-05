// "use client";

// import { useState, useRef } from "react";
// import { ControllerRenderProps } from "react-hook-form";
// import { Image as ImageIcon, Trash, GripVertical } from "lucide-react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   arrayMove,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { chapterSchema } from "@/lib/schema";
// import z from "zod";
// import Image from "next/image";

// // Define a type for the file with a preview URL
// interface FileWithPreview extends File {
//   preview: string;
// }

// // Props for the component to integrate with React Hook Form
// interface MultiFileUploadProps {
//   field: ControllerRenderProps<z.infer<typeof chapterSchema>, "chapterPages">;
// }

// // The individual sortable file item
// const SortableFileItem = ({
//   file,
//   onRemove,
// }: {
//   file: FileWithPreview;
//   onRemove: () => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: file.name + file.lastModified });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <Card
//       ref={setNodeRef}
//       style={style}
//       className="relative w-full aspect-[2/3] group overflow-hidden border-gray-700"
//     >
//       <Image
//         src={file.preview}
//         width={187}
//         height={281}
//         alt={`Preview ${file.name}`}
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black/50 flex flex-row-reverse justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
//         {/* Drag Handle Button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="text-white hover:bg-white/20 cursor-grab"
//           {...listeners}
//           {...attributes}
//         >
//           <GripVertical className="w-6 h-6" />
//         </Button>
//         {/* Remove Button */}
//         <Button
//           size="icon"
//           className="rounded-full"
//           onClick={(e) => {
//             e.stopPropagation();
//             onRemove();
//           }}
//         >
//           <Trash className="w-4 h-4 text-red-500" />
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export function MultiFileUpload({ field }: MultiFileUploadProps) {
//   const [isDragOver, setIsDragOver] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const files = (field.value as FileWithPreview[]) || [];

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files).map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       ) as FileWithPreview[];

//       const updatedFiles = [...files, ...newFiles];
//       field.onChange(updatedFiles);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     if (e.dataTransfer.files) {
//       const newFiles = Array.from(e.dataTransfer.files).map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       ) as FileWithPreview[];

//       const updatedFiles = [...files, ...newFiles];
//       field.onChange(updatedFiles);
//     }
//   };

//   const removeFile = (index: number) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     field.onChange(updatedFiles);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       const oldIndex = files.findIndex(
//         (file) => file.name + file.lastModified === active.id
//       );
//       const newIndex = files.findIndex(
//         (file) => file.name + file.lastModified === over.id
//       );

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newOrder = arrayMove(files, oldIndex, newIndex);
//         field.onChange(newOrder);
//       }
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Drag and Drop Area */}
//       <div
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragOver(true);
//         }}
//         onDragLeave={() => setIsDragOver(false)}
//         onDrop={handleDrop}
//         onClick={() => fileInputRef.current?.click()}
//         className={`flex flex-col items-center justify-center p-6 border border-dashed border-[#292A2E] hover:opacity-75 hover:border-neutral-500 rounded-lg cursor-pointer transition-colors
//         ${isDragOver ? "border-neutral-500" : ""}`}
//       >
//         <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
//         <p className="text-sm font-semibold">
//           {isDragOver ? "Drop files here" : "Add more pages"}
//         </p>
//         <p className="text-xs text-gray-500">
//           Supports JPG, PNG, GIF. Multiple files allowed.
//         </p>
//         <p className="text-xs text-gray-500">
//           Pages will be automatically sorted by filename, but you can reorder
//           them below.
//         </p>
//         <Input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           className="hidden"
//         />
//       </div>

//       {/* Draggable File Previews */}
//       {files.length > 0 && (
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={files.map((file) => file.name + file.lastModified)}
//           >
//             <p className="font-semibold">Pages ({files.length})</p>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//               {files.map((file, index) => (
//                 <SortableFileItem
//                   key={file.name + file.lastModified}
//                   file={file}
//                   onRemove={() => removeFile(index)}
//                 />
//               ))}
//             </div>
//           </SortableContext>
//         </DndContext>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Image as ImageIcon, Trash, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
import { chapterSchema } from "@/lib/schema";
import z from "zod";
import Image from "next/image";
import { uploadImage } from "@/actions/comic.actions";
import { toast } from "sonner";

// The individual sortable file item. It now uses a URL string.
const SortableFileItem = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: url });

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
      <Image
        src={url}
        width={187}
        height={281}
        alt="Comic page preview"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-row-reverse justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
        {/* Drag Handle Button */}
        <Button
          type="button"
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
          type="button"
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

// Props for the component to integrate with React Hook Form
interface MultiFileUploadProps {
  field: ControllerRenderProps<z.infer<typeof chapterSchema>, "chapterPages">;
}

export function MultiFileUpload({ field }: MultiFileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pages = (field.value as string[]) || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const uploadFiles = async (filesToUpload: File[]) => {
    setIsUploading(true);
    const newUrls: string[] = [];

    for (const file of filesToUpload) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await uploadImage(formData);
        if (!response?.success) {
          toast.error(
            response?.message ?? "An error occurred while submitting the form."
          );
          return;
        }
        if (response.data) {
          newUrls.push(response.data);
        } else {
          console.error("Upload failed for file:", file.name, response.message);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    const updatedPages = [...pages, ...newUrls];
    field.onChange(updatedPages);
    setIsUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      uploadFiles(filesArray);
      // Clear the input to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      uploadFiles(filesArray);
    }
  };

  const removePage = (index: number) => {
    const updatedPages = pages.filter((_, i) => i !== index);
    field.onChange(updatedPages);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pages.findIndex((url) => url === active.id);
      const newIndex = pages.findIndex((url) => url === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(pages, oldIndex, newIndex);
        field.onChange(newOrder);
      }
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
        className={`flex flex-col items-center justify-center p-6 border border-dashed border-[#292A2E] hover:opacity-75 hover:border-neutral-500 rounded-lg cursor-pointer transition-colors ${
          isDragOver || isUploading ? "border-neutral-500" : ""
        }`}
      >
        {isUploading ? (
          <p className="text-sm font-semibold">Uploading pages...</p>
        ) : (
          <>
            <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm font-semibold">
              {isDragOver ? "Drop files here" : "Add more pages"}
            </p>
            <p className="text-xs text-gray-500">
              Supports JPG, PNG, GIF. Multiple files allowed.
            </p>
            <p className="text-xs text-gray-500">
              Pages will be automatically sorted by filename, but you can
              reorder them below.
            </p>
          </>
        )}
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* Draggable File Previews */}
      {pages.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={pages}>
            <p className="font-semibold">Pages ({pages.length})</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pages.map((url, index) => (
                <SortableFileItem
                  key={index}
                  url={url}
                  onRemove={() => removePage(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
