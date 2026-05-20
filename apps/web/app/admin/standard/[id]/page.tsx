"use client";

import { stdWiseSub } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

const Standard = () => {
  const { id } = useParams();

  const subjects = stdWiseSub[Number(id)];

  return (
    <div className="mt-10">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {subjects?.map((sub) => {
            const Icon = sub.logo;

            return (
              <Link
                key={sub.name}
                href={`/admin/standard/${id}/${sub.name}`}
                className="aspect-video rounded-xl bg-muted/90 p-4 transition hover:bg-muted/60"
              >
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <Icon className="size-8" />

                  <h3 className="text-xl font-semibold">{sub.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Standard;
