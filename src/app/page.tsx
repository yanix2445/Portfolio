import { Construction } from "lucide-react";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background p-4 text-center">
      <div className="rounded-full bg-muted p-6">
        <Construction className="h-12 w-12 text-foreground" />
      </div>
      <div className="space-y-2">
        <h1 className="font-bold text-4xl tracking-tight sm:text-5xl">
          Work in Progress
        </h1>
        <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
          We're working hard to bring you something amazing. This portfolio is
          currently under construction.
        </p>
      </div>
    </main>
  );
}
