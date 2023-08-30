"use client";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function OAuthButtons({ isLoading }: { isLoading: boolean }) {
  const handleLogin = () => signIn("github")

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleLogin}
        disabled={isLoading}
        size="lg"
        variant="outline"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
      <Button onClick={() => signIn("google")} disabled={isLoading} size="lg" variant="outline">
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
}
