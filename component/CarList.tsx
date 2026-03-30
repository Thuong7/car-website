import { Car } from "@/component/types";
import CarListClient from "./CarListClient";
import "@/component/CarList.css"

type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  const uniqueCars: Car[] = Array.from(
    new Map(cars.map((c) => [c._id, c])).values()
  );

  return (
    <section className="car-section">
      <div className="section-title">
        <h2>CÁC DÒNG XE Ô TÔ MITSUBISHI</h2>
      </div>
      <CarListClient cars={uniqueCars} />
    </section>
  );
}