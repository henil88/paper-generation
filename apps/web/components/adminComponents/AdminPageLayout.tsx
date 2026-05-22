import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AdminPageLayout = ({ children }: Props) => {
  return <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:space-y-8 sm:px-6">{children}</div>;
};
