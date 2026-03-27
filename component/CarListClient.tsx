"use client";

import { useState } from "react";
import { Car } from "@/component/types";
import FormPopup from "@/component/FormModal";
import FormWithPreview from "@/component/FormWithPreview";

import CarCard from "@/component/CarCard";
import "@/component/CarList.css"

type Props = {
  cars: Car[];
};

export default function CarListClient({ cars }: Props) {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  return (
    <>
      <div className="car-grid">
        {cars.map((car) => (
          <article key={car.id}>
            <CarCard
              car={car}
              onOpen={(car) => {
                setSelectedCar(car);
                setOpenPopup(true);
              }}
            />
          </article>
        ))}
        <FormWithPreview
        cars={cars}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        />
      </div>

      <FormPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        cars={selectedCar ? [selectedCar] : []}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
      />            
    </>
  );
}