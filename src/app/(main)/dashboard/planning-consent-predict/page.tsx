"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const councils = [
  "South Australia Adelaide",
  "South Australia Burnside",
  "South Australia Campbelltown",
  "South Australia Charles Sturt",
  "South Australia Holdfast Bay",
  "South Australia Marion",
  "South Australia Mitcham",
  "South Australia Norwood Payneham And St Peters",
  "South Australia Onkaparinga",
  "South Australia Playford",
  "South Australia Port Adelaide Enfield",
  "South Australia Prospect",
  "South Australia Salisbury",
  "South Australia Tea Tree Gully",
  "South Australia Unley",
  "South Australia Walkervile",
  "South Australia West Torrens",
  "South Australia Gawler"
];

const housingTypes = [
  "Group Dwelling",
  "Residential Flat Building",
  "Row Dwelling",
  "Semi-detached Dwelling",
  "Detached Dwelling"
];

const zones = [
  "City Living Zone",
  "Established Neighbourhood Zone",
  "General Neighbourhood Zone",
  "Hills Neighbourhood Zone",
  "Housing Diversity Neighbourhood Zone",
  "Master Planned Neighbourhood Zone",
  "Master Planned Township Zone",
  "Neighbourhood Zone",
  "Rural Horticulture Zone",
  "Rural Living Zone",
  "Strategic Employment Zone",
  "Suburban Main Street Zone",
  "Suburban Neighbourhood Zone",
  "Urban Activity Centre Zone",
  "Urban Corridor (Boulevard) Zone",
  "Urban Corridor (Main Street) Zone",
  "Urban Neighbourhood Zone",
  "Urban Renewal Neighbourhood Zone",
  "Waterfront Neighbourhood Zone",
  "Employment Zone"
];

const coefficients = {
  intercept: 49.2792,
  publicNotificationRequired: 21.1806,
  treeRemovalTrue: 47.5115,
  subdivisionNumber: 8.0472,
  affordableHousingTrue: 24.8622,
  elementType: {
    "Group Dwelling": 21.7072,
    "Residential Flat Building": 48.895,
    "Row Dwelling": -30.3382,
    "Semi-detached Dwelling": -2.5013,
    "Detached Dwelling": 0
  },
  peopleZone: {
    "City Living Zone": -52.7669,
    "Employment Zone": 13.6344,
    "Established Neighbourhood Zone": -0.1976,
    "Hills Neighbourhood Zone": 46.4831,
    "Housing Diversity Neighbourhood Zone": -1.7464,
    "Master Planned Neighbourhood Zone": -4.5834,
    "Master Planned Township Zone": 7.0971,
    "Neighbourhood Zone": -21.2427,
    "Rural Horticulture Zone": -14.4029,
    "Rural Living Zone": -9.1099,
    "Strategic Employment Zone": -20.5073,
    "Suburban Main Street Zone": 63.4084,
    "Suburban Neighbourhood Zone": -6.9631,
    "Urban Activity Centre Zone": 124.4337,
    "Urban Corridor (Boulevard) Zone": 80.1788,
    "Urban Corridor (Main Street) Zone": -27.0883,
    "Urban Neighbourhood Zone": -22.253,
    "Urban Renewal Neighbourhood Zone": -3.689,
    "Waterfront Neighbourhood Zone": 108.0696
  },
  council: {
    "South Australia Gawler": 0,
    "South Australia Adelaide": 23.5277,
    "South Australia Burnside": 22.4741,
    "South Australia Campbelltown": -5.3592,
    "South Australia Charles Sturt": -7.9193,
    "South Australia Holdfast Bay": -19.2853,
    "South Australia Marion": -6.1206,
    "South Australia Mitcham": 29.9086,
    "South Australia Norwood Payneham And St Peters": -27.9713,
    "South Australia Onkaparinga": 18.7363,
    "South Australia Playford": 5.0294,
    "South Australia Port Adelaide Enfield": -20.0079,
    "South Australia Prospect": -6.836,
    "South Australia Salisbury": -18.135,
    "South Australia Tea Tree Gully": -10.1309,
    "South Australia Unley": -7.0332,
    "South Australia Walkervile": -0.9913,
    "South Australia West Torrens": 23.5277
  }
};

export default function PlanningConsentPredictPage() {
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [form, setForm] = useState({
    council: "",
    publicNotification: "",
    subdivisionNumber: 1,
    housingType: "",
    treeRemoval: "",
    affordableHousing: "",
    peopleZone: ""
  });

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [predictedDays, setPredictedDays] = useState<number | null>(null);
  const [similarCases, setSimilarCases] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch("/data/ConsentPlanning400Samples0312.json")
      .then((res) => res.json())
      .then((json) => setSampleData(json));
  }, []);

  const handleConfirm = () => {
    let result = coefficients.intercept;
    result += form.publicNotification === "Required" ? coefficients.publicNotificationRequired : 0;
    result += form.treeRemoval === "TRUE" ? coefficients.treeRemovalTrue : 0;
    result += Number(form.subdivisionNumber) * coefficients.subdivisionNumber;
    result += form.affordableHousing === "TRUE" ? coefficients.affordableHousingTrue : 0;
    result += coefficients.elementType[form.housingType as keyof typeof coefficients.elementType] || 0;
    result += coefficients.peopleZone[form.peopleZone as keyof typeof coefficients.peopleZone] || 0;
    result += coefficients.council[form.council as keyof typeof coefficients.council] || 0;
    setPredictedDays(Math.round(result));

    const filtered = sampleData.filter((item: any) => {
      return (
        item["Subdivision Number"] === Number(form.subdivisionNumber) &&
        item["Public Notification"] === form.publicNotification &&
        item["Element Type"] === form.housingType &&
        (item["Tree Removal"] ? "TRUE" : "FALSE") === form.treeRemoval &&
        (item["Affordable Housing"] ? "TRUE" : "FALSE") === form.affordableHousing &&
        item["People and Neighbourhood"] === form.peopleZone
      );
    });

    const priorityCouncil = filtered.filter(item => item["Council"] === form.council);
    const otherCouncils = filtered.filter(item => item["Council"] !== form.council);
    const sortedCases = [...priorityCouncil, ...otherCouncils];

    setSimilarCases(sortedCases);
    setCurrentPage(1);
    setIsConfirmed(true);
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader><CardTitle>Prediction Conditions</CardTitle></CardHeader>
<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Council */}
  <div className="space-y-1">
    <Label className="font-semibold">Council</Label>
    <Select value={form.council} onValueChange={(v) => setForm((f) => ({ ...f, council: v }))}>
      <SelectTrigger>
        <SelectValue placeholder="Select Council" />
      </SelectTrigger>
      <SelectContent>
        {councils.map((c) => (
          <SelectItem key={c} value={c}>{c}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  {/* Public Notification */}
  <div className="space-y-1">
    <Label className="font-semibold">Public Notification</Label>
    <Select value={form.publicNotification} onValueChange={(v) => setForm((f) => ({ ...f, publicNotification: v }))}>
      <SelectTrigger>
        <SelectValue placeholder="Select Public Notification" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Required">Required</SelectItem>
        <SelectItem value="Not Required">Not Required</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* Subdivision Number */}
  <div className="space-y-1">
    <Label className="font-semibold">Subdivision Number</Label>
    <Input
      type="number"
      min={1}
      max={25}
      value={form.subdivisionNumber}
      onChange={(e) => setForm((f) => ({ ...f, subdivisionNumber: Number(e.target.value) }))}
    />
  </div>

  {/* Housing Type */}
  <div className="space-y-1">
    <Label className="font-semibold">Housing Type</Label>
    <Select value={form.housingType} onValueChange={(v) => setForm((f) => ({ ...f, housingType: v }))}>
      <SelectTrigger>
        <SelectValue placeholder="Select Housing Type" />
      </SelectTrigger>
      <SelectContent>
        {housingTypes.map((h) => (
          <SelectItem key={h} value={h}>{h}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  {/* Tree Removal */}
  <div className="space-y-1">
    <Label className="font-semibold">Tree Removal</Label>
    <Select value={form.treeRemoval} onValueChange={(v) => setForm((f) => ({ ...f, treeRemoval: v }))}>
      <SelectTrigger>
        <SelectValue placeholder="Select Tree Removal" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="TRUE">TRUE</SelectItem>
        <SelectItem value="FALSE">FALSE</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* Affordable Housing */}
  <div className="space-y-1">
    <Label className="font-semibold">Affordable Housing</Label>
    <Select value={form.affordableHousing} onValueChange={(v) => setForm((f) => ({ ...f, affordableHousing: v }))}>
      <SelectTrigger>
        <SelectValue placeholder="Select Affordable Housing" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="TRUE">TRUE</SelectItem>
        <SelectItem value="FALSE">FALSE</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* People and Neighbourhood Zone */}
  <div className="space-y-1">
    <Label className="font-semibold">People and Neighbourhood Zone</Label>
    <Select value={form.peopleZone} onValueChange={(v) => setForm((f) => ({ ...f, peopleZone: v }))}>
      <SelectTrigger>
        <SelectValue placeholder="Select Zone" />
      </SelectTrigger>
      <SelectContent>
        {zones.map((z) => (
          <SelectItem key={z} value={z}>{z}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  <div className="col-span-full pt-4">
    <Button onClick={handleConfirm}>Confirm</Button>
  </div>
</CardContent>

      </Card>

      {isConfirmed && (
        <>
          <Card>
            <CardHeader><CardTitle>Prediction Result</CardTitle></CardHeader>
            <CardContent>
              <p className="text-lg">Predicted Consent Days: <strong>{predictedDays ?? "-"}</strong></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Similar Cases</CardTitle></CardHeader>
            <CardContent className="overflow-auto space-y-4">
              <table className="w-full text-sm border">
                <thead>
                  <tr>
                    <th className="border px-2">Address</th>
                    <th className="border px-2">Council</th>
                    <th className="border px-2">Housing Type</th>
                    <th className="border px-2">Zone</th>
                    <th className="border px-2">Subdivision #</th>
                    <th className="border px-2">Public Notification</th>
                    <th className="border px-2">Tree Removal</th>
                    <th className="border px-2">Affordable Housing</th>
                    <th className="border px-2">Consent Days</th>
                  </tr>
                </thead>
                <tbody>
                  {similarCases.length > 0 ? (
                    similarCases
                      .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                      .map((item, index) => (
                        <tr key={index} className={item["Council"] === form.council ? "bg-yellow-100" : ""}>
                          <td className="border px-2">{item["Address"]}</td>
                          <td className="border px-2">{item["Council"]}</td>
                          <td className="border px-2">{item["Element Type"]}</td>
                          <td className="border px-2">{item["People and Neighbourhood"]}</td>
                          <td className="border px-2">{item["Subdivision Number"]}</td>
                          <td className="border px-2">{item["Public Notification"]}</td>
                          <td className="border px-2">{item["Tree Removal"] ? "TRUE" : "FALSE"}</td>
                          <td className="border px-2">{item["Affordable Housing"] ? "TRUE" : "FALSE"}</td>
                          <td className="border px-2">{item["Consent Days"]}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td className="border px-2 text-center" colSpan={9}>No similar cases found.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {similarCases.length > 0 && (
                <div className="flex justify-between items-center pt-2">
                  <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </Button>
                  <span>
                    Page {currentPage} of {Math.ceil(similarCases.length / pageSize)}
                  </span>
                  <Button
                    disabled={currentPage === Math.ceil(similarCases.length / pageSize)}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(similarCases.length / pageSize)))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
