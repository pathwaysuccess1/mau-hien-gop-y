
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Heart, Star } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const DonationFeedback = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const donationId = searchParams.get('donationId');
  
  const [formData, setFormData] = useState({
    donationId: donationId || '',
    fullName: '',
    email: '',
    phone: '',
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
    if (donationId) {
      setFormData(prev => ({ ...prev, donationId }));
    }
  }, [donationId]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation feedback submitted:', formData);
    
    toast({
      title: "Cảm ơn bạn đã chia sẻ!",
      description: "Phản hồi của bạn sẽ giúp chúng tôi cải thiện trải nghiệm hiến máu.",
    });

    // Reset form
    setFormData({
      donationId: donationId || '', fullName: '', email: '', phone: '',
      overallRating: '', staffRating: '', facilityRating: '', processRating: '',
      waitingTime: '', painLevel: '', afterCareRating: '', improvements: '',
      wouldDonateAgain: '', wouldRecommend: '', additionalComments: '', contactPermission: false
    });
  };

  const RatingStars = ({ rating, onRatingChange }: { rating: string, onRatingChange: (value: string) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star.toString())}
          className={`transition-colors ${parseInt(rating) >= star ? 'text-red-500' : 'text-gray-300'}`}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-red-500 fill-current" />
            <h1 className="text-4xl font-bold text-red-700">Feedback Sau Hiến Máu</h1>
          </div>
          <p className="text-lg text-gray-600">
            Chia sẻ trải nghiệm hiến máu của bạn để giúp chúng tôi cải thiện dịch vụ
          </p>
          {donationId && (
            <p className="text-sm text-gray-500 mt-2">Mã hiến máu: {donationId}</p>
          )}
        </div>

        <Card className="shadow-2xl border-red-100">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Phản Hồi Trải Nghiệm Hiến Máu</CardTitle>
            <CardDescription className="text-red-100">
              Đánh giá trải nghiệm hiến máu của bạn hôm nay
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
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

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700 font-medium">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Nhập họ và tên"
                    className="border-red-200 focus:border-red-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                    className="border-red-200 focus:border-red-400"
                    required
                  />
                </div>
              </div>

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
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <Heart className="w-5 h-5 mr-2 fill-current" />
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

export default DonationFeedback;
