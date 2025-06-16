"use client";

import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CouncilFilters() {
  const [housingType, setHousingType] = useState("");
  const [zone, setZone] = useState("");

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div>
        <label className="mb-1 block">Housing Type</label>
        <Select onValueChange={(value) => setHousingType(value)} value={housingType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Housing Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Group Dwelling">Group Dwelling</SelectItem>
            <SelectItem value="Residential Flat Building">Residential Flat Building</SelectItem>
            <SelectItem value="Row Dwelling">Row Dwelling</SelectItem>
            <SelectItem value="Semi-detached Dwelling">Semi-detached Dwelling</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1 block">Neighbourhood Zone</label>
        <Select onValueChange={(value) => setZone(value)} value={zone}>
          <SelectTrigger>
            <SelectValue placeholder="Select Zone" />
          </SelectTrigger>
          <SelectContent>
            {/* 示例项，可根据你的表格补全 */}
            <SelectItem value="Neighbourhood Zone">Neighbourhood Zone</SelectItem>
            <SelectItem value="Urban Activity Centre Zone">Urban Activity Centre Zone</SelectItem>
            <SelectItem value="Waterfront Neighbourhood Zone">Waterfront Neighbourhood Zone</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 可以继续加更多筛选项 */}
    </div>
  );
}
