import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

export const AdminBreadcrumb = ({ items }: { items: BreadcrumbItem[] }) => (
  <div className="flex flex-wrap items-center gap-2 text-sm">
    {items.map((item, index) => (
      <Fragment key={item.href}>
        <Link
          href={item.href}
          className="text-muted-foreground hover:text-primary"
        >
          {item.label}
        </Link>

        {index !== items.length - 1 && <ChevronRight className="h-4 w-4" />}
      </Fragment>
    ))}
  </div>
);
