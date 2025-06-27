
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalInfoSectionProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    bloodType: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ formData, onInputChange }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-gray-700 font-medium">Họ và tên *</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => onInputChange('fullName', e.target.value)}
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
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="email@example.com"
          className="border-red-200 focus:border-red-400"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700 font-medium">Số điện thoại</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          placeholder="0123456789"
          className="border-red-200 focus:border-red-400"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-gray-700 font-medium">Nhóm máu</Label>
        <Select value={formData.bloodType} onValueChange={(value) => onInputChange('bloodType', value)}>
          <SelectTrigger className="border-red-200 focus:border-red-400">
            <SelectValue placeholder="Chọn nhóm máu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
