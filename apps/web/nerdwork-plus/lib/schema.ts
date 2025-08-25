import { z } from "zod";

export const NewSeriesSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  language: z.enum(["english"]),
  rating: z.enum(["teens", "adults"]),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  genre: z.array,
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const comicSeriesSchema = z.object({
  title: z
    .string()
    .min(1, "Series title is required")
    .max(100, "Series title must be less than 100 characters"),

  language: z.string().min(1, "Language is required"),

  contentRating: z.string().min(1, "Content rating is required"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),

  genres: z
    .array(z.string())
    .min(1, "At least one genre is required")
    .max(5, "Maximum 5 genres allowed"),

  tags: z
    .array(z.string())
    .refine(
      (tags) => tags.every((tag) => tag.length >= 2 && tag.length <= 30),
      "Each tag must be between 2 and 30 characters"
    ),

  coverImage: z
    .any()
    .refine((files) => files?.length === 1, "Cover image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type ComicSeriesFormData = z.infer<typeof comicSeriesSchema>;
