"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { AdminBreadcrumb } from "@/components/adminComponents/AdminBreadcrumb";
import { AdminHero } from "@/components/adminComponents/AdminHero";
import { AdminPageLayout } from "@/components/adminComponents/AdminPageLayout";

const Chapter = () => {
  const { id, subject, chapter } = useParams<{
    id: string;
    subject: string;
    chapter: string;
  }>();

  const decodedChapter = decodeURIComponent(chapter);

  const marks = [
    {
      mark: 1,
      label: "Very Short",
      desc: "MCQ / one line questions",
    },
    {
      mark: 2,
      label: "Short",
      desc: "Short answer questions",
    },
    {
      mark: 3,
      label: "Medium",
      desc: "Explanation based questions",
    },
    {
      mark: 5,
      label: "Long",
      desc: "Detailed answer questions",
    },
  ];

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
          {
            label: decodedChapter,
            href: `/admin/standard/${id}/${subject}/${chapter}`,
          },
        ]}
      />

      <AdminHero
        title={decodedChapter}
        description="Select marks category to manage questions and paper generation"
        stats={
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border bg-background px-4 py-4 sm:px-5">
              <p className="text-xs text-muted-foreground">Standard</p>

              <h3 className="mt-1 text-lg font-bold sm:text-xl">{id}</h3>
            </div>

            <div className="rounded-2xl border bg-background px-4 py-4 sm:px-5">
              <p className="text-xs text-muted-foreground">Subject</p>

              <h3 className="mt-1 line-clamp-1 text-lg font-bold sm:text-xl">
                {subject}
              </h3>
            </div>
          </div>
        }
      />

      <div
        className="
          grid grid-cols-1 gap-4
          sm:grid-cols-2 sm:gap-5
          xl:grid-cols-4
        "
      >
        {marks.map((item) => (
          <Link
            key={item.mark}
            href={`/admin/standard/${id}/${subject}/${chapter}/${item.mark}`}
            className="
              group relative flex min-h-[300px]
              flex-col overflow-hidden rounded-3xl
              border bg-card p-5 transition-all
              duration-300 hover:-translate-y-2
              hover:border-primary/30
              hover:shadow-2xl sm:p-6
            "
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

            <div className="flex items-start justify-between">
              <div className="rounded-2xl bg-primary/10 px-5 py-4 text-primary">
                <span className="text-3xl font-bold">{item.mark}</span>
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </div>

            <div className="mt-6 flex flex-1 flex-col">
              <div className="mb-3 inline-flex w-fit rounded-full border px-3 py-1 text-xs text-muted-foreground">
                Marks Category
              </div>

              <h3 className="text-xl font-semibold">
                {item.mark} Mark Questions
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.desc}
              </p>

              <div className="mt-auto pt-6">
                <div className="rounded-2xl bg-primary/10 px-4 py-3 text-center text-sm font-medium text-primary">
                  Manage Questions
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AdminPageLayout>
  );
};

export default Chapter;
