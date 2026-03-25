import Link from "next/link";
import Image from "next/image";
import { Car } from "./types";

type Props = {
  car: Car;
};

export default function CarCard({ car }: Props) {
  return (
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
        <Link href={`/car/${car.slug}`} className="btn red">
          📩 BÁO GIÁ LĂN BÁNH
        </Link>

        <Link href={`/car/${car.slug}`} className="btn gray">
          ☰ XEM XE
        </Link>
      </div>
    </div>
  );
}