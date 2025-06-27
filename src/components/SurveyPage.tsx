import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileText, Star, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const SurveyPage = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const surveyId = searchParams.get('surveyId') || 'general';
  
  const [formData, setFormData] = useState({
    surveyId,
    respondentInfo: {
      age: '',
      gender: '',
      occupation: '',
      location: ''
    },
    donationHistory: {
      firstTime: '',
      frequency: '',
      lastDonation: '',
      motivations: [] as string[]
    },
    experience: {
      awarenessSource: '',
      registrationEase: '',
      informationClarity: '',
      appointmentProcess: '',
      facilityRating: '',
      staffProfessionalism: ''
    },
    satisfaction: {
      overallSatisfaction: '',
      recommendationLikelihood: '',
      improvementSuggestions: '',
      additionalServices: [] as string[]
    },
    demographics: {
      educationLevel: '',
      monthlyIncome: '',
      healthStatus: ''
    },
    openFeedback: {
      bestAspect: '',
      worstAspect: '',
      suggestions: '',
      futureParticipation: ''
    }
  });

  const handleInputChange = (section: keyof typeof formData, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (section: keyof typeof formData, field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentSection = prev[section] as any;
      const currentArray = currentSection[field] as string[] || [];
      const newArray = checked 
        ? [...currentArray, value]
        : currentArray.filter(item => item !== value);
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Survey submitted:', formData);
    
    toast({
      title: "Cảm ơn bạn đã tham gia khảo sát!",
      description: "Thông tin của bạn sẽ giúp chúng tôi cải thiện dịch vụ hiến máu.",
    });
  };

  const RatingScale = ({ 
    section, 
    field, 
    value, 
    labels 
  }: { 
    section: string, 
    field: string, 
    value: string, 
    labels: string[] 
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
      <RadioGroup 
        value={value} 
        onValueChange={(val) => handleInputChange(section, field, val)}
        className="flex justify-between"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="flex flex-col items-center space-y-1">
            <RadioGroupItem value={num.toString()} id={`${section}-${field}-${num}`} />
            <Label htmlFor={`${section}-${field}-${num}`} className="text-xs">{num}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <FileText className="w-12 h-12 text-green-500" />
            <h1 className="text-4xl font-bold text-green-700">Khảo Sát Hiến Máu</h1>
          </div>
          <p className="text-lg text-gray-600">
            Khảo sát toàn diện về trải nghiệm và ý kiến của bạn về việc hiến máu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Thông tin cá nhân */}
          <Card>
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800">1. Thông Tin Cá Nhân</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Độ tuổi</Label>
                  <Select 
                    value={formData.respondentInfo.age} 
                    onValueChange={(value) => handleInputChange('respondentInfo', 'age', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn độ tuổi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25 tuổi</SelectItem>
                      <SelectItem value="26-35">26-35 tuổi</SelectItem>
                      <SelectItem value="36-45">36-45 tuổi</SelectItem>
                      <SelectItem value="46-55">46-55 tuổi</SelectItem>
                      <SelectItem value="56+">Trên 56 tuổi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <Select 
                    value={formData.respondentInfo.gender} 
                    onValueChange={(value) => handleInputChange('respondentInfo', 'gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Nghề nghiệp</Label>
                  <Input
                    id="occupation"
                    value={formData.respondentInfo.occupation}
                    onChange={(e) => handleInputChange('respondentInfo', 'occupation', e.target.value)}
                    placeholder="Nhập nghề nghiệp"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Khu vực sinh sống</Label>
                  <Input
                    id="location"
                    value={formData.respondentInfo.location}
                    onChange={(e) => handleInputChange('respondentInfo', 'location', e.target.value)}
                    placeholder="Thành phố/Tỉnh"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lịch sử hiến máu */}
          <Card>
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800">2. Lịch Sử Hiến Máu</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <Label>Đây có phải lần đầu tiên bạn hiến máu không?</Label>
                <RadioGroup 
                  value={formData.donationHistory.firstTime} 
                  onValueChange={(value) => handleInputChange('donationHistory', 'firstTime', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="first-yes" />
                    <Label htmlFor="first-yes">Có</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="first-no" />
                    <Label htmlFor="first-no">Không</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Tần suất hiến máu (nếu đã từng hiến)</Label>
                <Select 
                  value={formData.donationHistory.frequency} 
                  onValueChange={(value) => handleInputChange('donationHistory', 'frequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tần suất" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time">Lần đầu</SelectItem>
                    <SelectItem value="once-year">1 lần/năm</SelectItem>
                    <SelectItem value="twice-year">2 lần/năm</SelectItem>
                    <SelectItem value="quarterly">Theo quý</SelectItem>
                    <SelectItem value="regular">Thường xuyên</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Động lực hiến máu (có thể chọn nhiều)</Label>
                <div className="grid md:grid-cols-2 gap-2">
                  {[
                    'Giúp đỡ người khác',
                    'Nghĩa vụ xã hội',
                    'Khuyến khích từ bạn bè/gia đình',
                    'Kiểm tra sức khỏe miễn phí',
                    'Trải nghiệm mới',
                    'Khác'
                  ].map((motivation) => (
                    <div key={motivation} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`motivation-${motivation}`}
                        checked={formData.donationHistory.motivations.includes(motivation)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('donationHistory', 'motivations', motivation, !!checked)
                        }
                      />
                      <Label htmlFor={`motivation-${motivation}`} className="text-sm">{motivation}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trải nghiệm dịch vụ */}
          <Card>
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800">3. Đánh Giá Trải Nghiệm</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <Label>Độ dễ dàng của quy trình đăng ký</Label>
                <RatingScale 
                  section="experience"
                  field="registrationEase"
                  value={formData.experience.registrationEase}
                  labels={['Rất khó', 'Rất dễ']}
                />
              </div>

              <div className="space-y-3">
                <Label>Tính rõ ràng của thông tin hướng dẫn</Label>
                <RatingScale 
                  section="experience"
                  field="informationClarity"
                  value={formData.experience.informationClarity}
                  labels={['Rất mơ hồ', 'Rất rõ ràng']}
                />
              </div>

              <div className="space-y-3">
                <Label>Chất lượng cơ sở vật chất</Label>
                <RatingScale 
                  section="experience"
                  field="facilityRating"
                  value={formData.experience.facilityRating}
                  labels={['Rất kém', 'Rất tốt']}
                />
              </div>

              <div className="space-y-3">
                <Label>Tính chuyên nghiệp của nhân viên</Label>
                <RatingScale 
                  section="experience"
                  field="staffProfessionalism"
                  value={formData.experience.staffProfessionalism}
                  labels={['Rất kém', 'Rất chuyên nghiệp']}
                />
              </div>
            </CardContent>
          </Card>

          {/* Mức độ hài lòng */}
          <Card>
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800">4. Mức Độ Hài Lòng</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <Label>Mức độ hài lòng tổng thể</Label>
                <RatingScale 
                  section="satisfaction"
                  field="overallSatisfaction"
                  value={formData.satisfaction.overallSatisfaction}
                  labels={['Rất không hài lòng', 'Rất hài lòng']}
                />
              </div>

              <div className="space-y-3">
                <Label>Khả năng giới thiệu cho người khác</Label>
                <RatingScale 
                  section="satisfaction"
                  field="recommendationLikelihood"
                  value={formData.satisfaction.recommendationLikelihood}
                  labels={['Chắc chắn không', 'Chắc chắn có']}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="improvementSuggestions">Đề xuất cải thiện</Label>
                <Textarea
                  id="improvementSuggestions"
                  value={formData.satisfaction.improvementSuggestions}
                  onChange={(e) => handleInputChange('satisfaction', 'improvementSuggestions', e.target.value)}
                  placeholder="Bạn muốn chúng tôi cải thiện điều gì?"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Ý kiến mở */}
          <Card>
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800">5. Ý Kiến Mở</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bestAspect">Điều bạn thích nhất về dịch vụ</Label>
                <Textarea
                  id="bestAspect"
                  value={formData.openFeedback.bestAspect}
                  onChange={(e) => handleInputChange('openFeedback', 'bestAspect', e.target.value)}
                  placeholder="Chia sẻ điều tích cực nhất..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="worstAspect">Điều cần cải thiện nhất</Label>
                <Textarea
                  id="worstAspect"
                  value={formData.openFeedback.worstAspect}
                  onChange={(e) => handleInputChange('openFeedback', 'worstAspect', e.target.value)}
                  placeholder="Chia sẻ điều cần cải thiện..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suggestions">Gợi ý khác</Label>
                <Textarea
                  id="suggestions"
                  value={formData.openFeedback.suggestions}
                  onChange={(e) => handleInputChange('openFeedback', 'suggestions', e.target.value)}
                  placeholder="Những ý kiến, đề xuất khác..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-6">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Gửi Khảo Sát
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;
