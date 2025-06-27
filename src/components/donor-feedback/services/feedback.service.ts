
import { DonationFeedbackFormData, GeneralFeedbackFormData, SurveyFormData } from '../types/feedback.types';

export class FeedbackService {
  static async submitDonationFeedback(data: DonationFeedbackFormData): Promise<boolean> {
    try {
      console.log('Donation feedback submitted:', data);
      // Here you would typically send data to your backend
      return true;
    } catch (error) {
      console.error('Error submitting donation feedback:', error);
      return false;
    }
  }

  static async submitGeneralFeedback(data: GeneralFeedbackFormData): Promise<boolean> {
    try {
      console.log('General feedback submitted:', data);
      // Here you would typically send data to your backend
      return true;
    } catch (error) {
      console.error('Error submitting general feedback:', error);
      return false;
    }
  }

  static async submitSurvey(data: SurveyFormData): Promise<boolean> {
    try {
      console.log('Survey submitted:', data);
      // Here you would typically send data to your backend
      return true;
    } catch (error) {
      console.error('Error submitting survey:', error);
      return false;
    }
  }

  static async getFeedbackList(): Promise<any[]> {
    // Mock data - in real app, this would fetch from backend
    return [
      {
        id: '1',
        type: 'donation',
        donationId: 'DN001',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        overallRating: 5,
        date: '2024-01-15',
        status: 'new',
        summary: 'Trải nghiệm rất tốt, nhân viên nhiệt tình'
      },
      {
        id: '2', 
        type: 'general',
        donationId: null,
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        overallRating: 4,
        date: '2024-01-14',
        status: 'reviewed',
        summary: 'Website dễ sử dụng, cần cải thiện tốc độ'
      }
    ];
  }
}
