"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const pinSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export function SetPinForm({ onNext }: { onNext: (pin: string) => void }) {
  const form = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof pinSchema>) {
    onNext(data.pin);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-white px-5">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Set your payment pin</h1>
        <p className="text-sm text-[#707073] mb-8">
          Create a 4-digit pin to keep your purchases secure
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">4-Digit PIN</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup className="mx-auto gap-3">
                        <InputOTPSlot
                          index={0}
                          className="bg-[#1D1E21] border border-[#292A2E] h-16 w-16 text-2xl"
                        />
                        <InputOTPSlot
                          index={1}
                          className="bg-[#1D1E21] border border-[#292A2E] h-16 w-16 text-2xl"
                        />
                        <InputOTPSlot
                          index={2}
                          className="bg-[#1D1E21] border border-[#292A2E] h-16 w-16 text-2xl"
                        />
                        <InputOTPSlot
                          index={3}
                          className="bg-[#1D1E21] border border-[#292A2E] h-16 w-16 text-2xl"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="sr-only">
                    Please enter the 4-digit pin you want to set.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
