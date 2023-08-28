import { Icons } from "@/components/icons";
import LoginForm from "@/components/login-form";

export default function Page() {
  return (
    <main className="space-y-6 min-h-screen grid place-content-center">
      <div className="flex flex-col space-y-2 items-center text-center">
        <Icons.logo className="w-12 h-12"/>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
