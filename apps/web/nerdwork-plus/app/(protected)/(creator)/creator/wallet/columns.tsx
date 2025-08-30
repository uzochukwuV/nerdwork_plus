"use client";

import { Transaction } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: () => <div className="text-left text-nerd-muted">Type</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left capitalize text-white font-normal">
          {row.original.type}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left text-nerd-muted">Description</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left capitalize text-white font-normal">
          {row.original.type}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-left text-nerd-muted">Amount</div>,
    cell: ({ row }) => {
      return (
        <div
          className={`text-left font-normal ${
            row.original.type == "withdrawal"
              ? "text-[#C52B2B]"
              : "text-[#25D448]"
          }`}
        >
          {row.original.type == "withdrawal" ? "-" : "+"} {row.original.amount}{" "}
          NWT
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left text-nerd-muted">Status</div>,
    cell: ({ row }) => {
      return (
        <div
          className={`text-left capitalize ${
            row.original.status == "completed"
              ? "text-[#25D448]"
              : "text-[#EC8F68]"
          } font-normal`}
        >
          {row.original.status}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left text-nerd-muted">Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left text-white font-normal">
          {row.original.date}
        </div>
      );
    },
  },
];
