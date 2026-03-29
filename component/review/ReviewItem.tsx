import { Review } from "./ReviewPage";

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="review-item">
    <div className="review-avatar" />

    <div className="review-content">
        <div className="review-rating">
        {"★".repeat(review.rating)} {review.rating}.0
        </div>

        <div className="review-name">
        {review.name} – {review.location}
        </div>

        <div className="review-meta">
        Đã mua {review.car}
        </div>

        <p className="review-text">"{review.content}"</p>

        {review.image && (
        <img src={review.image} className="review-image" />
        )}

        <div className="review-date">
        {new Date(review.createdAt).toLocaleDateString()}
        </div>
    </div>
    </div>
  );
}