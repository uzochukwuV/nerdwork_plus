"use client";
import { Button } from "@/components/ui/button";
import { ComicSeriesFormData, comicSeriesSchema } from "@/lib/schema";
import { ArrowLeft, Image, X } from "lucide-react";
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

export const GENRES = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Adventure",
  "Historical Fiction",
  "Comedy",
  "Drama",
  "Superhero",
  "Dystopian",
  "Musical",
  "Western",
  "Biographical",
  "Cyberpunk",
] as const;

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
] as const;

export const CONTENT_RATINGS = [
  { value: "all-ages", label: "All Ages" },
  { value: "teens-13+", label: "Teens - Age 13+" },
  { value: "mature-17+", label: "Mature - Age 17+" },
  { value: "adults-18+", label: "Adults - Age 18+" },
] as const;

const NewComicsPage = () => {
  //   const [files, setFiles] = useState<File[]>([]);
  //   const handleFileUpload = (files: File[]) => {
  //     setFiles(files);
  //     console.log(files);
  //   };

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
    console.log(data);
    console.log(data.coverImage);
    alert("Series updated successfully!");
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
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone"
                        className="group  w-[352px] h-[521px] flex flex-col items-center justify-center border border-dashed rounded-lg cursor-pointer bg-transparent border-[#9D9D9F] hover:border-[#646464]"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Image />
                          <p className="mb-2 text-sm font-semibold text-center group-hover:opacity-75">
                            Drag and drop
                            <br />
                            <span className="font-normal text-xs text-[#707073]">
                              or Click to upload
                            </span>
                          </p>
                        </div>
                        <Input
                          id="dropzone"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => field.onChange(e.target.files)}
                        />{" "}
                      </label>
                    </div>
                    {/* <div className="w-[352px] h-[521px] mx-auto border border-dashed bg-transparent border-neutral-800 rounded-lg">
                      <FileUpload onChange={handleFileUpload} />
                    </div> */}
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
