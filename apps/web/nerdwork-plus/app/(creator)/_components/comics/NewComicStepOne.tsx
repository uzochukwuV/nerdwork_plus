import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Users2 } from "lucide-react";
import { LANGUAGES, CONTENT_RATINGS } from "@/lib/constants";
import { useFormContext } from "react-hook-form"; // Import the hook
import { ComicSeriesFormData } from "@/lib/schema";

const NewComicStepOne = () => {
  const { control } = useFormContext<ComicSeriesFormData>();
  return (
    <>
      <div className="md:border border-[#292A2E] rounded-[12.75px] md:p-6">
        <p className="font-semibold mb-1">Basic Information</p>
        <p className="text-sm text-[#707073] mb-5">
          Essential details about your comic series
        </p>

        {/* Series Title */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 mb-5">
              <FormLabel className="text-white">Series Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Series Title"
                  className="bg-[#1D1E21] border-[#292A2E] text-white placeholder-gray-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Language and Content Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 mb-5">
                <FormLabel className="text-white">Language *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full bg-[#1D1E21] border-[#292A2E] text-white">
                      <Globe />
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1D1E21] border-none text-white">
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="contentRating"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 mb-5">
                <FormLabel className="text-white">Content Rating *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full bg-[#1D1E21] border-[#292A2E] text-white">
                      <Users2 />
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1D1E21] border-none text-white">
                    {CONTENT_RATINGS.map((rating) => (
                      <SelectItem key={rating.value} value={rating.value}>
                        {rating.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel className="text-white">Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your series story, characters and setting"
                  className="bg-[#1D1E21] border-[#292A2E] text-white placeholder-gray-400 min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
export default NewComicStepOne;
