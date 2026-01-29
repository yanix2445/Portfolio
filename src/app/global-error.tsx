"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="font-bold text-3xl tracking-tight">System Error</h2>
          <p className="max-w-[500px] text-muted-foreground">
            A critical error occurred. Please try refreshing the page.
          </p>
          <Button onClick={() => reset()} variant="default" className="mt-4">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
