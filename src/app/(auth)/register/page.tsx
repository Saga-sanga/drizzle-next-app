import RegisterForm from "@/components/register-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListTodo } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="grid lg:grid-cols-2 min-h-screen">
      <div className="col-span-1 bg-black hidden lg:block"></div>
      <div className="col-span-1 space-y-6 relative grid place-content-center">
        <Link
          className={cn(
            "absolute right-4 top-4 md:right-8 md:top-8",
            buttonVariants({ variant: "ghost" })
          )}
          href="/login"
        >
          Login
        </Link>
        <div className="text-center flex flex-col space-y-2">
          <ListTodo className="w-8 h-8 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <RegisterForm/>
      </div>
    </main>
  );
}
