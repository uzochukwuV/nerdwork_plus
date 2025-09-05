"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { createCreatorProfile } from "@/actions/profile.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { useState } from "react";
import { toast } from "sonner";

const creatorProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  creatorName: z
    .string()
    .min(2, { message: "Creator name must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
});

export function CreatorProfileForm({ onNext }: { onNext: () => void }) {
  const { data: session, update } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof creatorProfileSchema>>({
    resolver: zodResolver(creatorProfileSchema),
    defaultValues: {
      fullName: "",
      creatorName: "",
      phoneNumber: "",
      bio: "",
    },
  });

  async function onSubmit(data: z.infer<typeof creatorProfileSchema>) {
    setLoading(true);

    try {
      const response = await createCreatorProfile(data);

      if (!response?.success) {
        toast.error(
          response?.message ?? "An error occurred while submitting the form."
        );
        return;
      }

      await update({ cProfile: true });

      toast.success("Profile Updated Successfully!");
      onNext();
    } catch (err) {
      toast.error("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-white min-h-[75vh]">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">
          Setup your Creator profile
        </h1>
        <p className="text-sm text-[#707073] text-center mt-3 mb-8">
          Tell us more about yourself
        </p>

        <div className="flex justify-center mb-6">
          <Avatar>
            {user?.profilePicture && (
              <AvatarImage
                src={user?.profilePicture}
                alt={`${user.email} profile image`}
              />
            )}
            {user?.email && (
              <AvatarFallback className="uppercase">
                {user?.email[0]}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Name"
                      {...field}
                      className="bg-[#1D1E21] border-[#292A2E] text-white placeholder:text-[#707073]"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your first and last Name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creatorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Name"
                      {...field}
                      className="bg-[#1D1E21] border-[#292A2E] text-white placeholder:text-[#707073]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Number"
                      {...field}
                      className="bg-[#1D1E21] border-[#292A2E] text-white placeholder:text-[#707073]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your series story, characters and setting"
                      className="resize-none bg-[#1D1E21] border-[#292A2E] text-white placeholder:text-[#707073] h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              isLoading={loading}
              loadingText="Processing..."
              type="submit"
              variant={"primary"}
              className="w-full mt-4"
            >
              Continue
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
