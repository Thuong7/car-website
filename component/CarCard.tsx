"use client";

import Link from "next/link";
import Image from "next/image";
import { Car } from "./types";
import FormPopup from "./FormModal";
import { useState } from "react";

type Props = {
  car: Car;
};

export default function CarCard({ car }: Props) {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(car);

  return (
    <>
      <div className="car-card">
        <Link href={`/car/${car.slug}`}>
          <Image
            src={car.image}
            alt={`Xe ${car.name} Mitsubishi chính hãng`}
            width={400}
            height={250}
            className="car-image"
          />
        </Link>

        <h3>
          <Link href={`/car/${car.slug}`}>
            {car.name}
          </Link>
        </h3>

        <p className="price">GIÁ TỪ: {car.price}</p>

        <div className="actions">
          <button
            className="btn red"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCar(car); // đảm bảo đúng xe
              setOpenPopup(true);
            }}
          >
            📩 BÁO GIÁ LĂN BÁNH
          </button>

          <Link href={`/car/${car.slug}`} className="btn gray">
            ☰ XEM XE
          </Link>
        </div>
      </div>

      <FormPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        cars={[car]} 
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
      />
    </>
  );
}