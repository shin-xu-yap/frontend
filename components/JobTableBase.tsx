"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Job } from "@/types/job";

type Props = {
  title: string;
  jobs: Job[];
  columns: ColumnDef<Job>[];
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
  headerActions?: React.ReactNode;
};

export default function JobTableBase({
  title,
  jobs,
  columns,
  isLoading = false,
  emptyMessage = "No jobs found",
  headerActions,
}: Props) {
  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="p-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {headerActions}
      </CardHeader>

      <CardContent className="p-4">
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-muted/50">
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : jobs.length > 0 ? (
                table.getRowModel().rows.map((row, idx) => (
                  <TableRow
                    key={row.id}
                    className={`${
                      idx % 2 === 0 ? "bg-background" : "bg-muted/30"
                    } hover:bg-muted/60 transition-colors`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
