
import { 
  Feedback, 
  FeedbackFilters, 
  PaginatedFeedbackResponse, 
  DashboardData, 
  Survey, 
  SurveyResponse,
  FeedbackForm,
  FeedbackCategory,
  FeedbackStatus
} from '../types/feedback.types';

export class FeedbackService {
  static async getFeedbacks(filters: FeedbackFilters): Promise<PaginatedFeedbackResponse> {
    try {
      console.log('Fetching feedbacks with filters:', filters);
      
      // Mock data - in real app, this would fetch from backend
      const mockFeedbacks: Feedback[] = [
        {
          id: '1',
          donorId: 'donor1',
          donationId: 'DN001',
          rating: 5,
          category: 'service_quality',
          title: 'Dịch vụ rất tốt',
          message: 'Nhân viên nhiệt tình, quy trình nhanh chóng và chuyên nghiệp',
          isAnonymous: false,
          status: 'pending',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
          recommend: true,
          contactInfo: 'nguyenvana@email.com'
        },
        {
          id: '2',
          donorId: 'donor2',
          donationId: 'DN002',
          rating: 4,
          category: 'staff_behavior',
          title: 'Nhân viên thân thiện',
          message: 'Thái độ tốt nhưng cần cải thiện thời gian chờ',
          isAnonymous: true,
          status: 'reviewed',
          createdAt: new Date('2024-01-14'),
          updatedAt: new Date('2024-01-14'),  
          recommend: true
        },
        {
          id: '3',
          donorId: 'donor3',
          rating: 3,
          category: 'waiting_time',
          title: 'Thời gian chờ hơi lâu',
          message: 'Cần cải thiện quy trình để giảm thời gian chờ đợi',
          isAnonymous: false,
          status: 'responded',
          response: 'Cảm ơn phản hồi, chúng tôi sẽ cải thiện quy trình',
          respondedBy: 'admin1',
          respondedAt: new Date('2024-01-13'),
          createdAt: new Date('2024-01-12'),
          updatedAt: new Date('2024-01-13'),
          recommend: false,
          contactInfo: 'user3@email.com'
        }
      ];

      // Apply filters
      let filteredFeedbacks = mockFeedbacks;
      
      if (filters.search) {
        filteredFeedbacks = filteredFeedbacks.filter(f => 
          f.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
          f.message.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      
      if (filters.category) {
        filteredFeedbacks = filteredFeedbacks.filter(f => f.category === filters.category);
      }
      
      if (filters.status) {
        filteredFeedbacks = filteredFeedbacks.filter(f => f.status === filters.status);
      }
      
      if (filters.rating) {
        filteredFeedbacks = filteredFeedbacks.filter(f => f.rating === filters.rating);
      }

      return {
        feedbacks: filteredFeedbacks,
        total: filteredFeedbacks.length,
        totalPages: Math.ceil(filteredFeedbacks.length / (filters.limit || 10)),
        currentPage: filters.page || 1
      };
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      throw error;
    }
  }

  static async getDashboardData(): Promise<DashboardData> {
    try {
      // Mock dashboard data
      const mockData: DashboardData = {
        totalFeedbacks: 156,
        averageRating: 4.2,
        ratingDistribution: {
          1: 5,
          2: 8,
          3: 23,
          4: 67,
          5: 53
        },
        categoryBreakdown: {
          service_quality: 45,
          staff_behavior: 32,
          facility_cleanliness: 28,
          waiting_time: 21,
          overall_experience: 18,
          suggestion: 8,
          complaint: 4
        },
        statusBreakdown: {
          pending: 34,
          reviewed: 45,
          responded: 52,
          resolved: 25
        },
        recentFeedbacks: [],
        trendsData: [
          { date: '2024-01-01', count: 12, averageRating: 4.1 },
          { date: '2024-01-02', count: 15, averageRating: 4.3 },
          { date: '2024-01-03', count: 18, averageRating: 4.2 }
        ],
        responseRate: 78.5
      };

      return mockData;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  static async getSurveyById(surveyId: string): Promise<Survey> {
    try {
      // Mock survey data
      const mockSurvey: Survey = {
        id: surveyId,
        title: 'Khảo Sát Trải Nghiệm Hiến Máu',
        description: 'Khảo sát toàn diện về trải nghiệm và ý kiến của bạn về việc hiến máu',
        isActive: true,
        targetAudience: 'all',
        createdAt: new Date('2024-01-01'),
        questions: [
          {
            id: 'q1',
            type: 'rating',
            question: 'Bạn đánh giá như thế nào về trải nghiệm hiến máu tổng thể?',
            required: true,
            order: 1
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'Bạn biết đến chương trình hiến máu qua kênh nào? (Có thể chọn nhiều)',
            options: [
              'Mạng xã hội',
              'Website',
              'Bạn bè giới thiệu',
              'Báo chí',
              'Sự kiện',
              'Khác'
            ],
            required: true,
            order: 2
          },
          {
            id: 'q3',
            type: 'yes_no',
            question: 'Bạn có khuyên người khác tham gia hiến máu không?',
            required: true,
            order: 3
          },
          {
            id: 'q4',
            type: 'text',
            question: 'Bạn có góp ý gì để cải thiện dịch vụ hiến máu?',
            required: false,
            order: 4
          }
        ]
      };

      return mockSurvey;
    } catch (error) {
      console.error('Error fetching survey:', error);
      throw error;
    }
  }

  static async submitFeedback(data: FeedbackForm): Promise<boolean> {
    try {
      console.log('Feedback submitted:', data);
      // Here you would typically send data to your backend
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  }

  static async submitSurvey(data: Omit<SurveyResponse, 'id'>): Promise<boolean> {
    try {
      console.log('Survey submitted:', data);
      // Here you would typically send data to your backend
      return true;
    } catch (error) {
      console.error('Error submitting survey:', error);
      return false;
    }
  }
}
