
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface FeedbackCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  donationId?: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ 
  title, 
  description, 
  children, 
  donationId 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-red-500 fill-current" />
            <h1 className="text-4xl font-bold text-red-700">{title}</h1>
          </div>
          <p className="text-lg text-gray-600">{description}</p>
          {donationId && (
            <p className="text-sm text-gray-500 mt-2">Mã hiến máu: {donationId}</p>
          )}
        </div>

        <Card className="shadow-2xl border-red-100">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-red-100">{description}</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackCard;
