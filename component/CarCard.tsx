"use client";

import Link from "next/link";
import Image from "next/image";
import { Car } from "./types";
import "@/component/CarList.css";

type Props = {
  car: Car;
  onOpen: (car: Car) => void;
};

export default function CarCard({ car, onOpen }: Props) {
  return (
    <div className="car-card">
      <Link href={`/car/${car.slug}`}>
        <Image
          src={car.image || "/default.jpg"}
          alt={`${car.name} Mitsubishi Đà Nẵng`}
          width={400}
          height={250}
          className="car-image"
        />
      </Link>

      <h3>
        <Link href={`/car/${car.slug}`}>{car.name}</Link>
      </h3>

      <p className="price">GIÁ TỪ: {car.price}</p>

      <div className="actions">
        <button
          className="btn red"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(car);
          }}
        >
          📩 BÁO GIÁ LĂN BÁNH
        </button>

        <Link href={`/car/${car.slug}`} className="btn gray">
          ☰ XEM XE
        </Link>
      </div>
    </div>
  );
}