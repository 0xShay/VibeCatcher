// File: client/encode-front-end/src/components/DataTable.tsx
// This file contains DataTable component
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

interface SentimentAnalysisData {
  timestamp: string;
  score: number;
  label: string;
}

interface DataTableProps {
  data: SentimentAnalysisData[];
}

export const DataTable = ({ data }: DataTableProps) => {
  const columns: ColumnDef<SentimentAnalysisData>[] = [
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
    },
    {
      accessorFn: (row) => row.score.toFixed(2),
      id: 'score',
      header: 'Sentiment Score',
    },
    {
      accessorKey: 'label',
      header: 'Sentiment Label',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700 text-gray-300">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
