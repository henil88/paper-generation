"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AdminBreadcrumb } from "@/components/adminComponents/AdminBreadcrumb";
import { AdminHero } from "@/components/adminComponents/AdminHero";
import { AdminPageLayout } from "@/components/adminComponents/AdminPageLayout";
import { subjectChapters } from "@/lib/utils";

export default function Page() {
  const { id, subject } = useParams<{
    id: string;
    subject: string;
  }>();

  const chapters = subjectChapters[Number(id)]?.[subject] ?? [];

  return (
    <AdminPageLayout>
      <AdminBreadcrumb
        items={[
          {
            label: "Standards",
            href: "/admin",
          },
          {
            label: `Std ${id}`,
            href: `/admin/standard/${id}`,
          },
          {
            label: subject,
            href: `/admin/standard/${id}/${subject}`,
          },
        ]}
      />

      <AdminHero
        title={decodeURIComponent(subject)}
        description="Select chapter to manage questions and paper generation"
        stats={
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border bg-background px-4 py-4 sm:px-5">
              <p className="text-xs text-muted-foreground">Standard</p>

              <h3 className="mt-1 text-lg font-bold sm:text-xl">{id}</h3>
            </div>

            <div className="rounded-2xl border bg-background px-4 py-4 sm:px-5">
              <p className="text-xs text-muted-foreground">Chapters</p>

              <h3 className="mt-1 text-lg font-bold sm:text-xl">{chapters.length}</h3>
            </div>
          </div>
        }
      />

      <div
        className="
          grid grid-cols-1 gap-4
          sm:grid-cols-2 sm:gap-5
          xl:grid-cols-3
          2xl:grid-cols-4
        "
      >
        {chapters.map((chapter) => (
          <Link
            key={chapter.name}
            href={`/admin/standard/${id}/${subject}/${encodeURIComponent(chapter.name)}`}
            className="
              group relative flex min-h-[320px]
              flex-col overflow-hidden rounded-3xl
              border bg-card p-5 transition-all
              duration-300 hover:-translate-y-2
              hover:border-primary/30
              hover:shadow-2xl sm:p-6
            "
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

            <div className="flex items-start justify-between">
              <div
                className="
                  flex h-14 w-14 items-center
                  justify-center rounded-2xl
                  bg-primary/10 text-primary
                "
              >
                <chapter.logo className="h-7 w-7" />
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </div>

            <div className="mt-6 flex flex-1 flex-col">
              <div className="mb-3 inline-flex w-fit rounded-full border px-3 py-1 text-xs text-muted-foreground">
                Chapter
              </div>

              <h3 className="line-clamp-2 text-lg font-semibold sm:text-xl">{chapter.name}</h3>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                Manage questions, marks distribution and paper generation.
              </p>

              <div className="mt-auto pt-6">
                <div className="rounded-2xl bg-primary/10 px-4 py-3 text-center text-sm font-medium text-primary">
                  Open Chapter
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AdminPageLayout>
  );
}
