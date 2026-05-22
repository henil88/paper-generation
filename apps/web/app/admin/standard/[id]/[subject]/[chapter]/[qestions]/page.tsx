"use client";

import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Check,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Question = {
  id: number;
  question: string;
  marks: number;
  type: string;
};

const ITEMS = 8;

const initialQuestions: Question[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i + 1,
    question: `Question ${i + 1}`,
    marks: 2,
    type: "MCQ",
  })
);

export default function QuestionManager() {
  const [questions, setQuestions] =
    useState(initialQuestions);

  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editValue, setEditValue] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [newQuestion, setNewQuestion] =
    useState("");

  const filtered = useMemo(
    () =>
      questions.filter((q) =>
        q.question
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      ),
    [questions, search]
  );

  const start =
    (page - 1) * ITEMS;

  const current =
    filtered.slice(
      start,
      start + ITEMS
    );

  const handleAdd = () => {
    if (!newQuestion.trim())
      return;

    setQuestions((prev) => [
      {
        id: Date.now(),
        question:
          newQuestion,
        marks: 2,
        type: "MCQ",
      },
      ...prev,
    ]);

    setNewQuestion("");
    setOpen(false);
  };

  const handleDelete = (
    id: number
  ) => {
    setQuestions((prev) =>
      prev.filter(
        (q) => q.id !== id
      )
    );
  };

  const handleEdit = (
    id: number,
    value: string
  ) => {
    setEditingId(id);
    setEditValue(value);
  };

  const saveEdit = () => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === editingId
          ? {
              ...q,
              question:
                editValue,
            }
          : q
      )
    );

    setEditingId(null);
  };

  return (
    <div className="space-y-6 p-4">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Question
            Management
          </h1>

          <p className="text-muted-foreground">
            Manage chapter
            questions
          </p>

        </div>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
        >
          <Plus className="size-4" />

          Add Question

        </button>

      </div>

      {/* Search */}

      <div className="relative">

        <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search question..."
          className="w-full rounded-xl border py-2 pl-10 pr-4"
        />

      </div>

      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl bg-muted/50 p-4">
          Total:
          {" "}
          {
            questions.length
          }
        </div>

        <div className="rounded-xl bg-muted/50 p-4">
          MCQ:
          {" "}
          {
            questions.filter(
              (q) =>
                q.type ===
                "MCQ"
            ).length
          }
        </div>

        <div className="rounded-xl bg-muted/50 p-4">
          Showing:
          {" "}
          {
            filtered.length
          }
        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border">

        <table className="w-full">

          <thead className="bg-muted/50">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Question
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Marks
              </th>

              <th className="p-4 text-right">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {current.map((q) => (
              <tr
                key={q.id}
                className="border-t"
              >

                <td className="p-4">
                  {q.id}
                </td>

                <td className="p-4">

                  {editingId ===
                  q.id ? (

                    <input
                      value={
                        editValue
                      }
                      onChange={(
                        e
                      ) =>
                        setEditValue(
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full rounded border p-2"
                    />

                  ) : (
                    q.question
                  )}

                </td>

                <td className="p-4">
                  {q.type}
                </td>

                <td className="p-4">
                  {q.marks}
                </td>

                <td className="p-4">

                  <div className="flex justify-end gap-2">

                    {editingId ===
                    q.id ? (

                      <button
                        onClick={
                          saveEdit
                        }
                        className="rounded border p-2"
                      >
                        <Check className="size-4" />
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          handleEdit(
                            q.id,
                            q.question
                          )
                        }
                        className="rounded border p-2"
                      >
                        <Pencil className="size-4" />
                      </button>

                    )}

                    <button
                      onClick={() =>
                        handleDelete(
                          q.id
                        )
                      }
                      className="rounded border p-2"
                    >
                      <Trash2 className="size-4" />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="flex justify-between">

        <p>
          Showing
          {" "}
          {start + 1}
          {" "}-
          {" "}
          {Math.min(
            start + ITEMS,
            filtered.length
          )}
        </p>

        <div className="flex gap-2">

          <button
            onClick={() =>
              setPage((p) =>
                Math.max(
                  1,
                  p - 1
                )
              )
            }
            className="rounded border px-3 py-1"
          >
            Prev
          </button>

          <button className="rounded bg-primary px-3 py-1 text-white">
            {page}
          </button>

          <button
            onClick={() =>
              setPage((p) =>
                p + 1
              )
            }
            className="rounded border px-3 py-1"
          >
            Next
          </button>

        </div>

      </div>

      {/* Add Modal */}

      {open && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="w-full max-w-md rounded-xl bg-background p-6">

            <div className="mb-4 flex justify-between">

              <h2 className="text-xl font-semibold">
                Add Question
              </h2>

              <button
                onClick={() =>
                  setOpen(
                    false
                  )
                }
              >
                <X />
              </button>

            </div>

            <textarea
              value={
                newQuestion
              }
              onChange={(e) =>
                setNewQuestion(
                  e.target
                    .value
                )
              }
              placeholder="Write question..."
              className="min-h-32 w-full rounded-lg border p-3"
            />

            <button
              onClick={
                handleAdd
              }
              className="mt-4 w-full rounded-lg bg-primary py-2 text-white"
            >
              Add
            </button>

          </div>

        </div>

      )}

    </div>
  );
}