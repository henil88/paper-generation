"use client"
import { BookOpen } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  stats?: ReactNode;
};

export const AdminHero = ({ title, description, stats }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-card p-5 sm:p-8">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-16 sm:w-16">
            <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              {title}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {stats}
      </div>
    </div>
  );
};
