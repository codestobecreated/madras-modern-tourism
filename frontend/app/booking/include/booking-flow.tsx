"use client";

import { useSearchParams } from "next/navigation";
import { findTour } from "../../home/include/catalog";
import BookingForm from "./booking-form";
import TourPicker from "./tour-picker";

/** Reads `?tour=&date=&guests=` and shows the booking form, or a tour picker when the tour is missing. */
export default function BookingFlow() {
  const params = useSearchParams();
  const tour = findTour(params.get("tour") ?? "");
  if (!tour) return <TourPicker missing={params.has("tour")} />;

  const guests = Math.min(20, Math.max(1, Number.parseInt(params.get("guests") ?? "", 10) || 1));
  const date = params.get("date") ?? "";
  // re-mount the form when the query changes so its fields pick up the new values
  return <BookingForm key={params.toString()} tour={tour} initialDate={date} initialGuests={guests} />;
}
