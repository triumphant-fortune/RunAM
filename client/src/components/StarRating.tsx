import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  showNumber = true,
  size = 'sm',
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < maxRating; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} fill-[#FFD700] text-[#FFD700]`}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className={`${sizeClasses[size]} text-gray-300`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${sizeClasses[size]} fill-[#FFD700] text-[#FFD700]`} />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} text-gray-300`}
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {renderStars()}
      {showNumber && (
        <span className={`${textSizeClasses[size]} font-semibold text-gray-700 ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
