
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: string;
  onRatingChange: (value: string) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star.toString())}
          className={`transition-colors ${
            parseInt(rating) >= star ? 'text-red-500' : 'text-gray-300'
          }`}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
