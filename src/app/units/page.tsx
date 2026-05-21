import type { Metadata } from "next";
import { getUnits } from "@/lib/api";
import UnitsPageContent from "./UnitsPageContent";

export const metadata: Metadata = {
  title: "Available Units | PNE Property Management",
  description:
    "Browse available rental units across Columbus, Hilliard, and Worthington, Ohio. Filter by location, price, and bedrooms.",
};

export default async function UnitsPage() {
  const units = await getUnits();
  return <UnitsPageContent units={units} />;
}
