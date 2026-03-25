"use client";

import { useState } from "react";
import FormWithPreview from "@/component/FormWithPreview";
import { cars } from "@/component/data";
import { Car } from "@/component/types";

export default function FormSection() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  return (
    <FormWithPreview
      cars={cars}
      selectedCar={selectedCar}
      setSelectedCar={setSelectedCar}
    />
  );
}