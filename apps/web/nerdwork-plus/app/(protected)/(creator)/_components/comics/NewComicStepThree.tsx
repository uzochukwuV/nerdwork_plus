import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { GENRES } from "@/lib/constants";
import { useFormContext } from "react-hook-form";

interface ThreeProps {
  newTag: string;
  setNewTag: (value: string) => void;
  addTag: () => void;
  removeTag: (tag: string) => void;
  toggleGenre: (genre: string) => void;
}

const NewComicStepThree = ({
  newTag,
  setNewTag,
  addTag,
  removeTag,
  toggleGenre,
}: ThreeProps) => {
  const { control, watch } = useFormContext();
  const watchedGenres = watch("genres");
  const watchedTags = watch("tags");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="md:border border-[#292A2E] rounded-[12.75px] md:p-6">
      {/* Genres */}
      <FormField
        control={control}
        name="genres"
        render={() => (
          <FormItem className="flex flex-col gap-3">
            <FormLabel className="text-white font-semibold">Genre</FormLabel>
            <FormDescription className="text-sm text-[#707073]">
              Select genres that best describe your series
            </FormDescription>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => {
                const isSelected = watchedGenres.includes(genre);
                return (
                  <Button
                    key={genre}
                    type="button"
                    variant={isSelected ? "secondary" : "outline"}
                    size="sm"
                    className={
                      isSelected
                        ? " hover:opacity-75"
                        : "bg-[#1D1E21] border-[#292A2E] text-white hover:opacity-75"
                    }
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </Button>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Tags */}
      <FormField
        control={control}
        name="tags"
        render={() => (
          <FormItem className="flex flex-col gap-3 mt-6">
            <FormLabel className="text-white font-semibold">Tags</FormLabel>
            <FormDescription className="">
              Add tags to help readers discover your series
            </FormDescription>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter tag"
                className="bg-[#1D1E21] border-[#292A2E] text-white placeholder-gray-400"
              />
              <Button
                type="button"
                onClick={addTag}
                variant="secondary"
                className=""
              >
                Add
              </Button>
            </div>
            {watchedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {watchedTags.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#1D1E21] py-1 text-white"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-400 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default NewComicStepThree;
