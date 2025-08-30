import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { ImageUpload } from "./ImageUpload";
import { useFormContext } from "react-hook-form";
import { ComicSeriesFormData } from "@/lib/schema";

export default function NewComicStepTwo() {
  const { control } = useFormContext<ComicSeriesFormData>();
  return (
    <div>
      <FormField
        control={control}
        name="coverImage"
        render={({ field }) => (
          <FormItem className="h-fit md:border border-[#292A2E] rounded-[12.75px] md:p-6">
            <FormLabel className="font-semibold mb-1">Cover Image</FormLabel>
            <FormDescription className="text-sm text-[#707073] mb-5">
              Upload a cover image for your series
            </FormDescription>
            <FormControl className="">
              <ImageUpload field={field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
