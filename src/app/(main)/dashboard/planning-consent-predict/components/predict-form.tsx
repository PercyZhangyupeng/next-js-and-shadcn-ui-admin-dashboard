"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PredictForm() {
  const [formData, setFormData] = useState({
    publicNotification: "No",
    treeRemoval: "No",
    subdivisionNumber: "1",
    affordableHousing: "No",
    housingType: "Group Dwelling",
    neighbourhoodZone: "Neighbourhood Zone",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    // You can call your backend API here to calculate prediction
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block">Public Notification</label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, publicNotification: value })}
            value={formData.publicNotification}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1 block">Tree Removal</label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, treeRemoval: value })}
            value={formData.treeRemoval}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1 block">Subdivision Number (1-25)</label>
          <Input
            type="number"
            min={1}
            max={25}
            value={formData.subdivisionNumber}
            onChange={(e) => setFormData({ ...formData, subdivisionNumber: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block">Affordable Housing</label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, affordableHousing: value })}
            value={formData.affordableHousing}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1 block">Housing Type</label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, housingType: value })}
            value={formData.housingType}
          >
            <SelectTrigger>
              <SelectValue />
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
          <label className="mb-1 block">People and Neighbourhood Zone</label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, neighbourhoodZone: value })}
            value={formData.neighbourhoodZone}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {/* 示例项，可根据你的表格补全 */}
              <SelectItem value="Neighbourhood Zone">Neighbourhood Zone</SelectItem>
              <SelectItem value="Housing Diversity Neighbourhood Zone">Housing Diversity Neighbourhood Zone</SelectItem>
              <SelectItem value="Urban Activity Centre Zone">Urban Activity Centre Zone</SelectItem>
              <SelectItem value="Waterfront Neighbourhood Zone">Waterfront Neighbourhood Zone</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="mt-4">
        Predict
      </Button>
    </form>
  );
}
