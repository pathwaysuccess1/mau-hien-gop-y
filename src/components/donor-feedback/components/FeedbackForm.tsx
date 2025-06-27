
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useFeedback } from '../hooks/useFeedback';
import { DonationFeedbackFormData } from '../types/feedback.types';
import PersonalInfo from './PersonalInfo';
import RatingStars from './RatingStars';
import FeedbackCard from './FeedbackCard';

interface FeedbackFormProps {
  donationId?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ donationId: propDonationId }) => {
  const [searchParams] = useSearchParams();
  const urlDonationId = searchParams.get('donationId');
  const finalDonationId = propDonationId || urlDonationId || '';
  
  const { submitDonationFeedback, isSubmitting } = useFeedback();
  
  const [formData, setFormData] = useState<DonationFeedbackFormData>({
    donationId: finalDonationId,
    fullName: '',
    email: '',
    phone: '',
    donationDate: '',
    donationLocation: '',
    overallRating: '',
    staffRating: '',
    facilityRating: '',
    processRating: '',
    waitingTime: '',
    painLevel: '',
    afterCareRating: '',
    improvements: '',
    wouldDonateAgain: '',
    wouldRecommend: '',
    additionalComments: '',
    contactPermission: false
  });

  useEffect(() => {
    if (finalDonationId) {
      setFormData(prev => ({ ...prev, donationId: finalDonationId }));
    }
  }, [finalDonationId]);

  const handleInputChange = (field: keyof DonationFeedbackFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitDonationFeedback(formData);
    if (success) {
      setFormData({
        donationId: finalDonationId,
        fullName: '', email: '', phone: '', donationDate: '', donationLocation: '',
        overallRating: '', staffRating: '', facilityRating: '', processRating: '',
        waitingTime: '', painLevel: '', afterCareRating: '', improvements: '',
        wouldDonateAgain: '', wouldRecommend: '', additionalComments: '', contactPermission: false
      });
    }
  };

  return (
    <FeedbackCard
      title="Feedback Sau Hiến Máu"
      description="Chia sẻ trải nghiệm hiến máu của bạn để giúp chúng tôi cải thiện dịch vụ"
      donationId={finalDonationId}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="donationId" className="text-gray-700 font-medium">Mã hiến máu *</Label>
          <Input
            id="donationId"
            value={formData.donationId}
            onChange={(e) => handleInputChange('donationId', e.target.value)}
            placeholder="Nhập mã hiến máu"
            className="border-red-200 focus:border-red-400"
            required
          />
        </div>

        <PersonalInfo 
          formData={formData} 
          onInputChange={handleInputChange} 
        />

        {/* Donation Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="donationDate" className="text-gray-700 font-medium">Ngày hiến máu *</Label>
            <Input
              id="donationDate"
              type="date"
              value={formData.donationDate}
              onChange={(e) => handleInputChange('donationDate', e.target.value)}
              className="border-red-200 focus:border-red-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="donationLocation" className="text-gray-700 font-medium">Địa điểm hiến máu *</Label>
            <Input
              id="donationLocation"
              value={formData.donationLocation}
              onChange={(e) => handleInputChange('donationLocation', e.target.value)}
              placeholder="Tên bệnh viện/trung tâm y tế"
              className="border-red-200 focus:border-red-400"
              required
            />
          </div>
        </div>

        {/* Rating Section */}
        <div className="space-y-6 bg-red-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-red-700 mb-4">Đánh Giá Trải Nghiệm</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Đánh giá tổng thể *</Label>
              <RatingStars 
                rating={formData.overallRating} 
                onRatingChange={(value) => handleInputChange('overallRating', value)} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Thái độ nhân viên</Label>
              <RatingStars 
                rating={formData.staffRating} 
                onRatingChange={(value) => handleInputChange('staffRating', value)} 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Cơ sở vật chất</Label>
              <RatingStars 
                rating={formData.facilityRating} 
                onRatingChange={(value) => handleInputChange('facilityRating', value)} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Quy trình hiến máu</Label>
              <RatingStars 
                rating={formData.processRating} 
                onRatingChange={(value) => handleInputChange('processRating', value)} 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Thời gian chờ đợi</Label>
              <RatingStars 
                rating={formData.waitingTime} 
                onRatingChange={(value) => handleInputChange('waitingTime', value)} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Mức độ đau (1: không đau, 5: rất đau)</Label>
              <RatingStars 
                rating={formData.painLevel} 
                onRatingChange={(value) => handleInputChange('painLevel', value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Chăm sóc sau hiến máu</Label>
            <RatingStars 
              rating={formData.afterCareRating} 
              onRatingChange={(value) => handleInputChange('afterCareRating', value)} 
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-3">
          <Label className="text-gray-700 font-medium">Bạn có muốn hiến máu lại trong tương lai không? *</Label>
          <RadioGroup 
            value={formData.wouldDonateAgain} 
            onValueChange={(value) => handleInputChange('wouldDonateAgain', value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="donate-again-yes" />
              <Label htmlFor="donate-again-yes">Có</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="donate-again-no" />
              <Label htmlFor="donate-again-no">Không</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maybe" id="donate-again-maybe" />
              <Label htmlFor="donate-again-maybe">Có thể</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-gray-700 font-medium">Bạn có muốn giới thiệu việc hiến máu cho người khác không? *</Label>
          <RadioGroup 
            value={formData.wouldRecommend} 
            onValueChange={(value) => handleInputChange('wouldRecommend', value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="recommend-yes" />
              <Label htmlFor="recommend-yes">Có</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="recommend-no" />
              <Label htmlFor="recommend-no">Không</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maybe" id="recommend-maybe" />
              <Label htmlFor="recommend-maybe">Có thể</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="improvements" className="text-gray-700 font-medium">Đề xuất cải thiện</Label>
          <Textarea
            id="improvements"
            value={formData.improvements}
            onChange={(e) => handleInputChange('improvements', e.target.value)}
            placeholder="Bạn có đề xuất gì để cải thiện trải nghiệm hiến máu?"
            className="border-red-200 focus:border-red-400 min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalComments" className="text-gray-700 font-medium">Nhận xét thêm</Label>
          <Textarea
            id="additionalComments"
            value={formData.additionalComments}
            onChange={(e) => handleInputChange('additionalComments', e.target.value)}
            placeholder="Có điều gì khác bạn muốn chia sẻ?"
            className="border-red-200 focus:border-red-400 min-h-[100px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="contactPermission"
            checked={formData.contactPermission}
            onCheckedChange={(checked) => handleInputChange('contactPermission', !!checked)}
          />
          <Label htmlFor="contactPermission" className="text-sm text-gray-600">
            Tôi đồng ý để được liên hệ về các chương trình hiến máu trong tương lai
          </Label>
        </div>

        <div className="pt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            {isSubmitting ? 'Đang gửi...' : 'Gửi Phản Hồi'}
          </Button>
        </div>
      </form>
    </FeedbackCard>
  );
};

export default FeedbackForm;
