"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const summaryData = [
  { title: "Sample Size", value: "400", change: "+10%" },
  { title: "Average Approval Time", value: "55 days", change: "-3.5%" },
  { title: "Median Approval Time", value: "48 days", change: "+1.2%" },
  { title: "50% Data Concentration Range", value: "40-60 days", change: "±5%" },
];

const rawChartData = {
  Day: Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i + 1}`, value: Math.floor(30 + Math.random() * 40) })),
  Month: [
    { date: "Jan", value: 50 },
    { date: "Feb", value: 52 },
    { date: "Mar", value: 49 },
    { date: "Apr", value: 53 },
    { date: "May", value: 55 },
    { date: "Jun", value: 51 },
  ],
  Year: [
    { date: "2020", value: 60 },
    { date: "2021", value: 58 },
    { date: "2022", value: 54 },
    { date: "2023", value: 50 },
    { date: "2024", value: 48 },
  ],
};

export default function DataOverviewPage() {
  const [range, setRange] = useState("Month");
  const chartData = rawChartData[range];

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">Change: {item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Line Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Planning Consent of Average Days</CardTitle>
          <div className="flex space-x-2">
            {["Day", "Month", "Year"].map((r) => (
              <Button
                key={r}
                size="sm"
                variant={range === r ? "default" : "outline"}
                onClick={() => setRange(r)}
              >
                {r}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
