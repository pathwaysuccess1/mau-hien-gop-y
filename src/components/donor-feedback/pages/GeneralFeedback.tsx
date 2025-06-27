
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Send } from 'lucide-react';
import { useFeedback } from '../hooks/useFeedback';
import { GeneralFeedbackFormData } from '../types/feedback.types';
import PersonalInfo from '../components/PersonalInfo';
import FeedbackCard from '../components/FeedbackCard';

const GeneralFeedback: React.FC = () => {
  const { submitGeneralFeedback, isSubmitting } = useFeedback();
  
  const [formData, setFormData] = useState<GeneralFeedbackFormData>({
    fullName: '',
    email: '',
    phone: '',
    feedbackType: '',
    subject: '',
    message: '',
    priority: '',
    category: '',
    attachments: [],
    followUpRequired: false
  });

  const handleInputChange = (field: keyof GeneralFeedbackFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitGeneralFeedback(formData);
    if (success) {
      setFormData({
        fullName: '', email: '', phone: '', feedbackType: '', subject: '',
        message: '', priority: '', category: '', attachments: [], followUpRequired: false
      });
    }
  };

  return (
    <FeedbackCard
      title="Phản Hồi Tổng Quát"
      description="Chia sẻ ý kiến và đóng góp của bạn để giúp chúng tôi cải thiện dịch vụ"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfo 
          formData={formData} 
          onInputChange={handleInputChange} 
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Loại phản hồi *</Label>
            <Select value={formData.feedbackType} onValueChange={(value) => handleInputChange('feedbackType', value)}>
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Chọn loại phản hồi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complaint">Khiếu nại</SelectItem>
                <SelectItem value="suggestion">Đề xuất</SelectItem>
                <SelectItem value="compliment">Khen ngợi</SelectItem>
                <SelectItem value="question">Câu hỏi</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Mức độ ưu tiên</Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Chọn mức độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Thấp</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="urgent">Khẩn cấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-gray-700 font-medium">Tiêu đề *</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Nhập tiêu đề phản hồi"
            className="border-red-200 focus:border-red-400"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-700 font-medium">Nội dung phản hồi *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Chia sẻ chi tiết phản hồi của bạn..."
            className="border-red-200 focus:border-red-400 min-h-[150px]"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="followUpRequired"
            checked={formData.followUpRequired}
            onCheckedChange={(checked) => handleInputChange('followUpRequired', !!checked)}
          />
          <Label htmlFor="followUpRequired" className="text-sm text-gray-600">
            Tôi muốn được phản hồi lại về vấn đề này
          </Label>
        </div>

        <div className="pt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Đang gửi...' : 'Gửi Phản Hồi'}
          </Button>
        </div>
      </form>
    </FeedbackCard>
  );
};

export default GeneralFeedback;
