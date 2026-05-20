"use client";

import { useParams } from "next/navigation";

const SubjectPage = () => {
  const { id, subject } = useParams();

  return (
    <div className="mt-10 p-4">
      <h1 className="text-3xl font-bold">STD {id}</h1>

      <h2 className="mt-2 text-xl">Subject: {subject}</h2>
    </div>
  );
};

export default SubjectPage;
