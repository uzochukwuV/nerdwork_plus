"use client";
import { Button } from "@/components/ui/button";
import { ComicSeriesFormData, comicSeriesSchema } from "@/lib/schema";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import NewComicStepTwo from "@/app/(protected)/(creator)/_components/comics/NewComicStepTwo";
import NewComicStepThree from "@/app/(protected)/(creator)/_components/comics/NewComicStepThree";
import NewComicStepOne from "@/app/(protected)/(creator)/_components/comics/NewComicStepOne";
import { useRouter } from "next/navigation";
import { comicsApi, fileApi } from "@/lib/api/comics";

const NewComicsPage = () => {
  const [newTag, setNewTag] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleNext = () => {
    // You can add validation logic here before advancing
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: ComicSeriesFormData) => {
    console.log("Form data:", data);
    
    try {
      // First, upload the cover image if provided
      let imageUrl = "";
      if (data.coverImage) {
        toast.loading("Uploading cover image...");
        const uploadResponse = await fileApi.uploadToS3(data.coverImage);
        if (uploadResponse.success) {
          imageUrl = uploadResponse.url;
          toast.success("Cover image uploaded!");
        } else {
          throw new Error("Failed to upload cover image");
        }
      }

      // Get auth token (you'll need to implement your auth context)
      const token = localStorage.getItem("authToken"); // Replace with your auth system
      if (!token) {
        toast.error("Please log in to create a comic");
        return;
      }

      // Create comic with backend API
      toast.loading("Creating comic...");
      const comicData = {
        title: data.title,
        language: data.language,
        ageRating: data.contentRating,
        description: data.description,
        image: imageUrl,
        genre: data.genres,
        tags: data.tags,
      };

      const response = await comicsApi.createComic(comicData, token);
      
      if (response.success) {
        toast.success("Comic created successfully!");
        setTimeout(() => {
          router.push("/creator/comics");
        }, 2000);
      } else {
        throw new Error(response.message || "Failed to create comic");
      }
    } catch (error) {
      console.error("Error creating comic:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create comic");
    }
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

  const MobileForm = (
    <div className="flex flex-col gap-6">
      {/* Conditionally render based on current step */}
      {currentStep === 0 && <NewComicStepOne />}
      {currentStep === 1 && <NewComicStepTwo />}
      {currentStep === 2 && (
        <NewComicStepThree
          newTag={newTag}
          setNewTag={setNewTag}
          addTag={addTag}
          removeTag={removeTag}
          toggleGenre={toggleGenre}
        />
      )}

      <div className="flex justify-between mt-6">
        {currentStep == 0 && (
          <div className="w-full flex flex-col gap-3">
            <Button
              className="w-full"
              variant={"primary"}
              type="button"
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              onClick={() => router.push("/creator/comics")}
              className="w-full"
              type="button"
            >
              Cancel
            </Button>
          </div>
        )}
        {currentStep == 1 && (
          <div className="w-full flex flex-col gap-3">
            <Button
              className="w-full"
              variant={"primary"}
              type="button"
              onClick={handleNext}
            >
              Next
            </Button>
            <Button className="w-full" type="button" onClick={handlePrevious}>
              Back
            </Button>
          </div>
        )}
        {currentStep == 2 && (
          <div className="w-full flex flex-col gap-3">
            <Button variant={"primary"} type="submit">
              Submit
            </Button>
            <Button className="w-full" type="button" onClick={handlePrevious}>
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const DesktopForm = (
    <div className="flex gap-6">
      <div className="w-3/5 flex flex-col gap-5">
        <NewComicStepOne />
        <NewComicStepThree
          newTag={newTag}
          setNewTag={setNewTag}
          addTag={addTag}
          removeTag={removeTag}
          toggleGenre={toggleGenre}
        />
        <div className="flex gap-3 justify-end">
          <Button>Cancel</Button>
          <Button type="submit" variant={"primary"}>
            Update Series
          </Button>
        </div>
      </div>
      <div className="w-2/5">
        <NewComicStepTwo />
      </div>
    </div>
  );

  return (
    <main className="max-w-[1100px] mx-auto w-full md:py-10 font-inter px-5">
      {!isMobile && (
        <Link href={"/creator/comics"}>
          <button className="flex items-center cursor-pointer gap-2.5 text-sm font-medium">
            <ArrowLeft size={16} /> back to Dashboard
          </button>
        </Link>
      )}
      <h3 className="font-semibold max-md:text-base text-[28px] my-6">
        New Series
      </h3>

      {isMobile && (
        <div className="flex gap-3 items-center border-b border-[#292A2E] pb-3 text-sm text-[#707073] mb-4">
          <p className={`${currentStep == 0 ? "!text-white" : ""}`}>
            1. Information
          </p>
          <ChevronRight size={16} />
          <p className={`${currentStep == 1 ? "!text-white" : ""}`}>2. Cover</p>
          <ChevronRight size={16} />
          <p className={`${currentStep == 2 ? "!text-white" : ""}`}>
            3. Finish
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {isMobile ? MobileForm : DesktopForm}
        </form>
      </Form>
    </main>
  );
};

export default NewComicsPage;
