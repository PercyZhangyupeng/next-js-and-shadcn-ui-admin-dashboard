"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from "@tanstack/react-table";

export default function DataManagementPage() {
  const [data, setData] = useState<any[]>([]);
  const [newEntry, setNewEntry] = useState<any>({});
  const [headers, setHeaders] = useState<string[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  useEffect(() => {
    fetch("/data/ConsentPlanning400Samples0312.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json.length > 0) {
          setHeaders(Object.keys(json[0]));
          const emptyEntry: any = {};
          Object.keys(json[0]).forEach((key) => {
            emptyEntry[key] = "";
          });
          setNewEntry(emptyEntry);
        }
      });
  }, []);

  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(
    () =>
      headers.map((header) =>
        columnHelper.accessor(header, {
          header: () => <span className="font-semibold">{header}</span>,
          cell: (info) => (
            <Input
              type="text"
              value={info.getValue() as string}
              onChange={(e) => {
                const newValue = e.target.value;
                setData((prevData) =>
                  prevData.map((row, rowIndex) =>
                    rowIndex === info.row.index
                      ? { ...row, [header]: newValue }
                      : row
                  )
                );
              }}
            />
          )
        })
      ),
    [headers, data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter
  });

  const handleDelete = (rowIndex: number) => {
    const updatedData = data.filter((_, i) => i !== rowIndex);
    setData(updatedData);
  };

  const handleAddEntry = () => {
    setData([...data, newEntry]);
    const emptyEntry: any = {};
    headers.forEach((key) => {
      emptyEntry[key] = "";
    });
    setNewEntry(emptyEntry);
  };

  const handleNewEntryChange = (field: string, value: string) => {
    setNewEntry((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const parsedData = results.data as any[];
          setData(parsedData);
          if (parsedData.length > 0) {
            setHeaders(Object.keys(parsedData[0]));
          }
        }
      });
    }
  };

  const handleDownloadCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ConsentPlanningData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search all fields..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <div className="overflow-auto">
            <table className="w-full text-sm border">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="border px-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                    <th className="border px-2">Actions</th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border px-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    <td className="border px-2">
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(row.index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous
            </Button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Entry</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {headers.map((header) => (
            <div key={header} className="space-y-1">
              <Label className="font-semibold">{header}</Label>
              <Input
                type="text"
                value={newEntry[header]}
                onChange={(e) => handleNewEntryChange(header, e.target.value)}
              />
            </div>
          ))}
          <div className="col-span-full pt-4">
            <Button onClick={handleAddEntry}>Add Entry</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload / Download CSV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="font-semibold">Upload CSV</Label>
            <Input type="file" accept=".csv" onChange={handleUploadCSV} />
          </div>
          <div>
            <Button onClick={handleDownloadCSV}>Download CSV</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
