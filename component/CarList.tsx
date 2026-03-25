"use client";

import { useState } from "react";
import "./CarList.css";
import "./FormBox.css"
import CarCard from "@/component/CarCard";
import { Car } from "@/component/types";
import Image from "next/image";
import FormWithPreview from "@/component/FormWithPreview";
import FormBox from "@/component/FormBox"
type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const uniqueCars: Car[] = Array.from(
    new Map(cars.map((c) => [c.id, c])).values()
  );

  const remainder = uniqueCars.length % 3;

  return (
    <section className="car-section">
      <div className="section-title">
        <h2>CÁC DÒNG XE Ô TÔ MITSUBISHI</h2>
      </div>

      <div className="car-grid">
        {/* CAR */}
        {uniqueCars.map((car) => (
          <article key={car.id}>
            <CarCard car={car} />
          </article>
        ))}

        {remainder === 0 && (
          <FormWithPreview
            cars={cars}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
          />
        )}

        {remainder === 1 && (
          <div className="form-box span-2">
            <FormBox
              cars={cars}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
            />
          </div>
        )}

        {remainder === 2 && (
          <div className="form-box">
            <FormBox
              cars={cars}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
            />
          </div>
        )}
      </div>
    </section>
  );
}

