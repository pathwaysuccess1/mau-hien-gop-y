
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DonationInfoSectionProps {
  formData: {
    donationDate: string;
    donationLocation: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const DonationInfoSection: React.FC<DonationInfoSectionProps> = ({ formData, onInputChange }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="donationDate" className="text-gray-700 font-medium">Ngày hiến máu *</Label>
        <Input
          id="donationDate"
          type="date"
          value={formData.donationDate}
          onChange={(e) => onInputChange('donationDate', e.target.value)}
          className="border-red-200 focus:border-red-400"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="donationLocation" className="text-gray-700 font-medium">Địa điểm hiến máu *</Label>
        <Input
          id="donationLocation"
          value={formData.donationLocation}
          onChange={(e) => onInputChange('donationLocation', e.target.value)}
          placeholder="Tên bệnh viện/trung tâm y tế"
          className="border-red-200 focus:border-red-400"
          required
        />
      </div>
    </div>
  );
};

export default DonationInfoSection;
