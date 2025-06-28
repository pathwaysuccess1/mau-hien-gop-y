
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackForm, SurveyResponse } from '../types/feedback.types';

export const useFeedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitFeedback = async (data: FeedbackForm) => {
    setIsSubmitting(true);
    try {
      const success = await FeedbackService.submitFeedback(data);
      if (success) {
        toast({
          title: "Cảm ơn bạn đã chia sẻ!",
          description: "Phản hồi của bạn sẽ giúp chúng tôi cải thiện dịch vụ hiến máu.",
        });
        return true;
      }
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
    return false;
  };

  const submitSurvey = async (data: Omit<SurveyResponse, 'id'>) => {
    setIsSubmitting(true);
    try {
      const success = await FeedbackService.submitSurvey(data);
      if (success) {
        toast({
          title: "Cảm ơn bạn đã tham gia khảo sát!",
          description: "Thông tin của bạn sẽ giúp chúng tôi cải thiện dịch vụ hiến máu.",
        });
        return true;
      }
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
    return false;
  };

  return {
    isSubmitting,
    submitFeedback,
    submitSurvey
  };
};
