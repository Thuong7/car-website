"use client";

import { useEffect, useState } from "react";
import FormPopup from "./FormModal";
import { Car } from "@/component/types";

type Props = {
  cars: Car[];        
};

export default function PopupManager({ cars }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null); 

  useEffect(() => {
    const lastClosed = localStorage.getItem("popup_closed_time");

    if (!lastClosed) {
      setOpen(true);
      return;
    }

    const now = Date.now();
    const diff = now - Number(lastClosed);

    if (diff > 300000) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("popup_closed_time", Date.now().toString());
  };

  return (
    <FormPopup
      open={open}
      onClose={handleClose}
      cars={cars}
      selectedCar={selectedCar}        
      setSelectedCar={setSelectedCar}  
    />
  );
}