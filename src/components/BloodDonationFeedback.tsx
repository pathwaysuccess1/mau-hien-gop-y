
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Send } from 'lucide-react';

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

  const RatingStars = ({ rating, onRatingChange }: { rating: string; onRatingChange: (value: string) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star.toString())}
            className={`w-8 h-8 transition-colors ${
              parseInt(rating) >= star
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            ⭐
          </button>
        ))}
      </div>
    );
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
              {/* Personal Info Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Thông Tin Cá Nhân
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              
              {/* Donation Info Section */}
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

              {/* Rating Section */}
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

              {/* Feedback Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Phản Hồi Chi Tiết
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="improvements">Đề xuất cải thiện</Label>
                    <Textarea
                      id="improvements"
                      value={formData.improvements}
                      onChange={(e) => handleInputChange('improvements', e.target.value)}
                      placeholder="Bạn có đề xuất gì để cải thiện dịch vụ?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalComments">Nhận xét thêm</Label>
                    <Textarea
                      id="additionalComments"
                      value={formData.additionalComments}
                      onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                      placeholder="Có điều gì khác bạn muốn chia sẻ?"
                    />
                  </div>
                </div>
              </div>

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
