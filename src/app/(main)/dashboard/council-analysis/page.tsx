// src/app/(main)/dashboard/council-analysis/page.tsx
import CouncilFilters from "./components/council-filters";
import CouncilMap from "./components/council-map";
import CouncilTable from "./components/council-table";

export const metadata = {
  title: "Project Search | Dashboard",
};

export default function CouncilAnalysisPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Council Approval Time Analysis</h1>
      <CouncilFilters />
      <CouncilMap />
      <CouncilTable />
    </div>
  );
}
