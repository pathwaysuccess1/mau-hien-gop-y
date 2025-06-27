
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface FeedbackSectionProps {
  formData: {
    improvements: string;
    wouldRecommend: string;
    additionalComments: string;
    contactPermission: boolean;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ formData, onInputChange }) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="improvements" className="text-gray-700 font-medium">Đề xuất cải thiện</Label>
        <Textarea
          id="improvements"
          value={formData.improvements}
          onChange={(e) => onInputChange('improvements', e.target.value)}
          placeholder="Bạn có đề xuất gì để cải thiện dịch vụ hiến máu?"
          className="border-red-200 focus:border-red-400 min-h-[100px]"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-gray-700 font-medium">Bạn có muốn giới thiệu dịch vụ này cho người khác không? *</Label>
        <RadioGroup 
          value={formData.wouldRecommend} 
          onValueChange={(value) => onInputChange('wouldRecommend', value)}
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
          onChange={(e) => onInputChange('additionalComments', e.target.value)}
          placeholder="Có điều gì khác bạn muốn chia sẻ với chúng tôi?"
          className="border-red-200 focus:border-red-400 min-h-[100px]"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="contactPermission"
          checked={formData.contactPermission}
          onCheckedChange={(checked) => onInputChange('contactPermission', !!checked)}
        />
        <Label htmlFor="contactPermission" className="text-sm text-gray-600">
          Tôi đồng ý để được liên hệ về các chương trình hiến máu trong tương lai
        </Label>
      </div>
    </>
  );
};

export default FeedbackSection;
