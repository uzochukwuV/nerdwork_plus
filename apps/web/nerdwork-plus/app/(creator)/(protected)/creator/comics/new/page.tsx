"use client";
import { Button } from "@/components/ui/button";
import { ComicSeriesFormData, comicSeriesSchema } from "@/lib/schema";
import { ArrowLeft, Globe, Users2, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ImageUpload } from "@/app/(creator)/_components/comics/ImageUpload";
import { toast } from "sonner";
import { LANGUAGES, CONTENT_RATINGS, GENRES } from "@/lib/constants";

const NewComicsPage = () => {
  const [newTag, setNewTag] = useState("");

  const form = useForm<ComicSeriesFormData>({
    resolver: zodResolver(comicSeriesSchema),
    defaultValues: {
      title: "",
      language: "",
      contentRating: "",
      description: "",
      genres: [],
      tags: [],
      coverImage: "",
    },
  });

  const onSubmit = (data: ComicSeriesFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("language", data.language);
    formData.append("contentRating", data.contentRating);
    formData.append("description", data.description);
    data.genres.forEach((genre) => formData.append("genres[]", genre));
    data.tags.forEach((tag) => formData.append("tags[]", tag));
    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    toast.success("Series updated successfully!");
  };

  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = form.getValues("tags");
      if (!currentTags.includes(newTag.trim())) {
        form.setValue("tags", [...currentTags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const toggleGenre = (genre: string) => {
    const currentGenres = form.getValues("genres");
    if (currentGenres.includes(genre)) {
      form.setValue(
        "genres",
        currentGenres.filter((g) => g !== genre)
      );
    } else {
      form.setValue("genres", [...currentGenres, genre]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <main className="max-w-[1100px] mx-auto w-full py-10 font-inter">
      <Link href={"/creator/comics"}>
        <button className="flex items-center cursor-pointer gap-2.5 text-sm font-medium">
          <ArrowLeft size={16} /> back to Dashboard
        </button>
      </Link>
      <h3 className="font-semibold text-[28px] my-6">New Series</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <section className="flex gap-6">
            <div className="w-3/5 flex flex-col gap-5">
              <div className="border border-[#292A2E] rounded-[12.75px] p-6">
                <p className="font-semibold mb-1">Basic Information</p>
                <p className="text-sm text-[#707073] mb-5">
                  Essential details about your comic series
                </p>

                {/* Series Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 mb-5">
                      <FormLabel className="text-white">
                        Series Title *
                      </FormLabel>
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
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-3 mb-5">
                        <FormLabel className="text-white">Language *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#1D1E21] border-[#292A2E] text-white">
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
                    control={form.control}
                    name="contentRating"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-3 mb-5">
                        <FormLabel className="text-white">
                          Content Rating *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#1D1E21] border-[#292A2E] text-white">
                              <Users2 />
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1D1E21] border-none text-white">
                            {CONTENT_RATINGS.map((rating) => (
                              <SelectItem
                                key={rating.value}
                                value={rating.value}
                              >
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
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel className="text-white">
                        Description *
                      </FormLabel>
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

              <div className="border border-[#292A2E] rounded-[12.75px] p-6">
                <FormField
                  control={form.control}
                  name="genres"
                  render={() => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel className="text-white font-semibold">
                        Genre
                      </FormLabel>
                      <FormDescription className="text-sm text-[#707073]">
                        Select genres that best describe your series
                      </FormDescription>
                      <div className="flex flex-wrap gap-2">
                        {GENRES.map((genre) => {
                          const isSelected = form
                            .watch("genres")
                            .includes(genre);
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
              </div>

              <div className="border border-[#292A2E] rounded-[12.75px] p-6">
                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel className="text-white font-semibold">
                        Tags
                      </FormLabel>
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
                      {form.watch("tags").length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {form.watch("tags").map((tag, index) => (
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
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button>Cancel</Button>
                <Button type="submit" variant={"primary"}>
                  Update Series
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem className="w-2/5 h-fit border border-[#292A2E] rounded-[12.75px] p-6">
                  <FormLabel className="font-semibold mb-1">
                    Cover Image
                  </FormLabel>
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
          </section>
        </form>
      </Form>
    </main>
  );
};

export default NewComicsPage;
