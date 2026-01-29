"use client";

import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-destructive/10 p-3">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="font-bold text-3xl tracking-tight">
        Something went wrong!
      </h2>
      <p className="max-w-[500px] text-muted-foreground">
        {error.message ||
          "An unexpected error occurred. Please try again later."}
      </p>
      <div className="mt-4 flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button onClick={() => router.push("/")} variant="outline">
          Return Home
        </Button>
      </div>
    </div>
  );
}
