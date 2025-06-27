
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Star } from 'lucide-react';

const GeneralFeedback = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    feedbackType: '',
    overallRating: '',
    serviceRating: '',
    websiteRating: '',
    supportRating: '',
    suggestions: '',
    wouldRecommend: '',
    additionalComments: '',
    contactPermission: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('General feedback submitted:', formData);
    
    toast({
      title: "Cảm ơn phản hồi của bạn!",
      description: "Ý kiến của bạn sẽ giúp chúng tôi cải thiện hệ thống tốt hơn.",
    });

    // Reset form
    setFormData({
      fullName: '', email: '', phone: '', feedbackType: '', overallRating: '',
      serviceRating: '', websiteRating: '', supportRating: '', suggestions: '',
      wouldRecommend: '', additionalComments: '', contactPermission: false
    });
  };

  const RatingStars = ({ rating, onRatingChange }: { rating: string, onRatingChange: (value: string) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star.toString())}
          className={`transition-colors ${parseInt(rating) >= star ? 'text-blue-500' : 'text-gray-300'}`}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <MessageSquare className="w-12 h-12 text-blue-500" />
            <h1 className="text-4xl font-bold text-blue-700">Phản Hồi Hệ Thống</h1>
          </div>
          <p className="text-lg text-gray-600">
            Chia sẻ ý kiến của bạn để giúp chúng tôi cải thiện dịch vụ
          </p>
        </div>

        <Card className="shadow-2xl border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Phản Hồi Tổng Quát</CardTitle>
            <CardDescription className="text-blue-100">
              Vui lòng chia sẻ trải nghiệm của bạn với hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700 font-medium">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Nhập họ và tên"
                    className="border-blue-200 focus:border-blue-400"
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
                    className="border-blue-200 focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0123456789"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Loại phản hồi *</Label>
                  <Select value={formData.feedbackType} onValueChange={(value) => handleInputChange('feedbackType', value)}>
                    <SelectTrigger className="border-blue-200 focus:border-blue-400">
                      <SelectValue placeholder="Chọn loại phản hồi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="service">Dịch vụ</SelectItem>
                      <SelectItem value="support">Hỗ trợ khách hàng</SelectItem>
                      <SelectItem value="suggestion">Góp ý</SelectItem>
                      <SelectItem value="complaint">Khiếu nại</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Đánh Giá Hệ Thống</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Đánh giá tổng thể *</Label>
                    <RatingStars 
                      rating={formData.overallRating} 
                      onRatingChange={(value) => handleInputChange('overallRating', value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Chất lượng dịch vụ</Label>
                    <RatingStars 
                      rating={formData.serviceRating} 
                      onRatingChange={(value) => handleInputChange('serviceRating', value)} 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Giao diện website</Label>
                    <RatingStars 
                      rating={formData.websiteRating} 
                      onRatingChange={(value) => handleInputChange('websiteRating', value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Hỗ trợ khách hàng</Label>
                    <RatingStars 
                      rating={formData.supportRating} 
                      onRatingChange={(value) => handleInputChange('supportRating', value)} 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="suggestions" className="text-gray-700 font-medium">Đề xuất cải thiện</Label>
                <Textarea
                  id="suggestions"
                  value={formData.suggestions}
                  onChange={(e) => handleInputChange('suggestions', e.target.value)}
                  placeholder="Bạn có đề xuất gì để cải thiện hệ thống?"
                  className="border-blue-200 focus:border-blue-400 min-h-[100px]"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">Bạn có muốn giới thiệu hệ thống cho người khác không? *</Label>
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
                <Label htmlFor="additionalComments" className="text-gray-700 font-medium">Nhận xét thêm</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                  placeholder="Có điều gì khác bạn muốn chia sẻ?"
                  className="border-blue-200 focus:border-blue-400 min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contactPermission"
                  checked={formData.contactPermission}
                  onCheckedChange={(checked) => handleInputChange('contactPermission', !!checked)}
                />
                <Label htmlFor="contactPermission" className="text-sm text-gray-600">
                  Tôi đồng ý để được liên hệ về việc cải thiện hệ thống
                </Label>
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
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

export default GeneralFeedback;
