
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Send } from 'lucide-react';
import PersonalInfoSection from './PersonalInfoSection';
import FeedbackSection from './FeedbackSection';
import RatingStars from './RatingStars';

const BloodDonationFeedback = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    donationId: '',
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-red-500 fill-current" />
            <h1 className="text-4xl font-bold text-red-700">Phản Hồi Sau Hiến Máu</h1>
          </div>
          <p className="text-lg text-gray-600">
            Chia sẻ trải nghiệm hiến máu của bạn để giúp chúng tôi cải thiện dịch vụ
          </p>
        </div>

        <Card className="shadow-2xl border-red-100">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Form Phản Hồi Hiến Máu</CardTitle>
            <CardDescription className="text-red-100">
              Vui lòng chia sẻ chi tiết về trải nghiệm hiến máu của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <PersonalInfoSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Thông Tin Hiến Máu
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donationId">Mã hiến máu</Label>
                    <Input
                      id="donationId"
                      value={formData.donationId}
                      onChange={(e) => handleInputChange('donationId', e.target.value)}
                      placeholder="Nhập mã hiến máu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donationDate">Ngày hiến máu</Label>
                    <Input
                      id="donationDate"
                      type="date"
                      value={formData.donationDate}
                      onChange={(e) => handleInputChange('donationDate', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donationLocation">Địa điểm hiến máu</Label>
                  <Input
                    id="donationLocation"
                    value={formData.donationLocation}
                    onChange={(e) => handleInputChange('donationLocation', e.target.value)}
                    placeholder="Nhập địa điểm hiến máu"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Đánh Giá Dịch Vụ
                </h3>
                {[
                  { key: 'overallRating', label: 'Đánh giá tổng thể' },
                  { key: 'staffRating', label: 'Thái độ nhân viên' },
                  { key: 'facilityRating', label: 'Cơ sở vật chất' },
                  { key: 'processRating', label: 'Quy trình hiến máu' }
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <Label>{label}</Label>
                    <RatingStars
                      rating={formData[key as keyof typeof formData] as string}
                      onRatingChange={(value) => handleInputChange(key, value)}
                    />
                  </div>
                ))}
              </div>

              <FeedbackSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <div className="text-center pt-6">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Gửi Phản Hồi
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BloodDonationFeedback;
