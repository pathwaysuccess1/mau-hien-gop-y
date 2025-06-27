
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';
import PersonalInfoSection from './PersonalInfoSection';
import DonationInfoSection from './DonationInfoSection';
import RatingSection from './RatingSection';
import FeedbackSection from './FeedbackSection';

const BloodDonationFeedback = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodType: '',
    donationDate: '',
    donationLocation: '',
    overallRating: '',
    staffRating: '',
    facilityRating: '',
    processRating: '',
    improvements: '',
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
    console.log('Form submitted:', formData);
    
    toast({
      title: "Cảm ơn bạn đã gửi phản hồi!",
      description: "Ý kiến của bạn rất quan trọng giúp chúng tôi cải thiện dịch vụ hiến máu.",
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      bloodType: '',
      donationDate: '',
      donationLocation: '',
      overallRating: '',
      staffRating: '',
      facilityRating: '',
      processRating: '',
      improvements: '',
      wouldRecommend: '',
      additionalComments: '',
      contactPermission: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-red-500 fill-current" />
            <h1 className="text-4xl font-bold text-red-700">Form Phản Hồi Hiến Máu</h1>
          </div>
          <p className="text-lg text-gray-600">
            Chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện dịch vụ hiến máu
          </p>
        </div>

        <Card className="shadow-2xl border-red-100">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Thông Tin Phản Hồi</CardTitle>
            <CardDescription className="text-red-100">
              Vui lòng điền đầy đủ thông tin để chúng tôi có thể phục vụ bạn tốt hơn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <PersonalInfoSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <DonationInfoSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <RatingSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <FeedbackSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

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

        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Mọi thông tin phản hồi sẽ được bảo mật và chỉ sử dụng để cải thiện dịch vụ
          </p>
        </div>
      </div>
    </div>
  );
};

export default BloodDonationFeedback;
