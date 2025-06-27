
import React from 'react';
import { Label } from '@/components/ui/label';
import RatingStars from './RatingStars';

interface RatingSectionProps {
  formData: {
    overallRating: string;
    staffRating: string;
    facilityRating: string;
    processRating: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const RatingSection: React.FC<RatingSectionProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6 bg-red-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-red-700 mb-4">Đánh Giá Dịch Vụ</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Đánh giá tổng thể *</Label>
          <RatingStars 
            rating={formData.overallRating} 
            onRatingChange={(value) => onInputChange('overallRating', value)} 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Thái độ nhân viên</Label>
          <RatingStars 
            rating={formData.staffRating} 
            onRatingChange={(value) => onInputChange('staffRating', value)} 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Cơ sở vật chất</Label>
          <RatingStars 
            rating={formData.facilityRating} 
            onRatingChange={(value) => onInputChange('facilityRating', value)} 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Quy trình hiến máu</Label>
          <RatingStars 
            rating={formData.processRating} 
            onRatingChange={(value) => onInputChange('processRating', value)} 
          />
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
