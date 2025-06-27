
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoProps {
  formData: {
    fullName: string;
    email: string;
    phone?: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, onInputChange }) => {
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
      {formData.phone !== undefined && (
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-700 font-medium">Số điện thoại</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="Nhập số điện thoại"
            className="border-red-200 focus:border-red-400"
          />
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
