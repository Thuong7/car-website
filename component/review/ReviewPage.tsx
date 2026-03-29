"use client";

import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./review.css";

export type Review = {
  _id?: string;
  name: string;
  location: string;
  car: string;
  rating: number;
  content: string;
  image?: string;
  createdAt: string;
};

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/api/review")
      .then((res) => res.json())
      .then(setReviews);
  }, []);

  const handleAdd = (r: Review) => {
    setReviews((prev) => [r, ...prev]);
  };

  return (
    <div className="review-container">
      <h2>Đánh giá khách hàng</h2>

      <ReviewForm onAdd={handleAdd} />

      {reviews.map((r, i) => (
        <ReviewItem key={i} review={r} />
      ))}
    </div>
  );
}