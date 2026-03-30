"use client";

import { useState } from "react";
import FormWithPreview from "@/component/FormWithPreview";
import { Car } from "@/component/types";
import { getCars } from "@/lib/getCars";

export default async function FormSection() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const cars = await getCars();
  return (
    <FormWithPreview
      cars={cars}
      selectedCar={selectedCar}
      setSelectedCar={setSelectedCar}
    />
  );
}