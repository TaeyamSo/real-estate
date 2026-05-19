import type { Unit, Review } from "@/types";
import {
  staticUnits,
  staticReviews,
} from "@/data/static";

// These functions are stubs — swap the implementation when the backend is ready.
// The signatures and return types must remain stable.

export async function getUnits(): Promise<Unit[]> {
  return staticUnits;
}

export async function getReviews(): Promise<Review[]> {
  return staticReviews;
}
