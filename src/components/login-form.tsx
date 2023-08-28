"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

type Schema = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: Schema) {
    console.log({ data });
    alert(JSON.stringify(data))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center"
      >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input className="peer w-80" {...field} required/>
                </FormControl>
                <FormLabel className="peer-valid:-translate-y-4 peer-valid:scale-90 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-black transition text-slate-500 duration-50 ease-out cursor-text bg-white px-1 absolute top-0 translate-x-3 translate-y-1">
                  Email
                </FormLabel>
                {/* <FormDescription>Enter your email above.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    // placeholder="John Doe"
                    className="peer w-80"
                    {...field}
                    required
                  />
                </FormControl>
                <FormLabel className="peer-valid:-translate-y-4 peer-valid:scale-90 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-black transition text-slate-500 duration-50 ease-out cursor-text bg-white px-1 absolute top-0 translate-x-3 translate-y-1">
                  Full Name
                </FormLabel>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        <Button className="w-28" type="submit">Login</Button>
      </form>
    </Form>
  );
}
