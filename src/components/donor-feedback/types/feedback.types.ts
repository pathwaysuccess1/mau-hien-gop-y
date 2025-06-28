
export interface Feedback {
    id: string;
    donorId: string;
    donationId?: string;
    rating: number;
    category: FeedbackCategory;
    title: string;
    message: string;
    isAnonymous: boolean;
    status: FeedbackStatus;
    response?: string;
    respondedBy?: string;
    respondedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    recommend: boolean;
    contactInfo?: string;
}

export interface DashboardData {
    totalFeedbacks: number;
    averageRating: number;
    responseRate: number;
    ratingDistribution: Record<number, number>;
    categoryBreakdown: Record<FeedbackCategory, number>;
    statusBreakdown: Record<FeedbackStatus, number>;
    recentFeedbacks: Feedback[];
    trendsData: Array<{
        date: string;
        count: number;
        averageRating: number;
    }>;
    staffRatingAverage: number;
    facilityRatingAverage: number;
    processRatingAverage: number;
    recommendationRate: number;
}

export type FeedbackCategory =
    | 'service_quality'
    | 'staff_behavior'
    | 'facility_cleanliness'
    | 'waiting_time'
    | 'overall_experience'
    | 'suggestion'
    | 'complaint';

export type FeedbackStatus = 'pending' | 'reviewed' | 'responded' | 'resolved';

export interface Survey {
    id: string;
    title: string;
    description: string;
    questions: SurveyQuestion[];
    isActive: boolean;
    targetAudience: 'all' | 'first_time' | 'regular' | 'vip';
    createdAt: Date;
    expiresAt?: Date;
}

export interface SurveyQuestion {
    id: string;
    type: 'rating' | 'multiple_choice' | 'text' | 'yes_no';
    question: string;
    options?: string[];
    required: boolean;
    order: number;
}

export interface SurveyResponse {
    id: string;
    surveyId: string;
    donorId: string;
    response: {
        questionId: string;
        answer: string | number;
    }[];
}

export interface FeedbackForm {
    donationId?: string;
    rating: number;
    category: FeedbackCategory;
    title: string;
    message: string;
    isAnonymous: boolean;
    improvements: string;
    recommend: boolean;
    contactInfo?: string;
}

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
}

export interface DonationInfo {
    donationDate: string;
    donationLocation: string;
}

export interface RatingData {
    overallRating: string;
    staffRating: string;
    facilityRating: string;
    processRating: string;
    waitingTime: string;
    painLevel: string;
    afterCareRating: string;
}

export interface DonationFeedbackFormData extends PersonalInfo, DonationInfo, RatingData {
    donationId: string;
    improvements: string;
    wouldDonateAgain: string;
    wouldRecommend: string;
    additionalComments: string;
    contactPermission: boolean;
}

export interface GeneralFeedbackFormData extends PersonalInfo {
    feedbackType: string;
    subject: string;
    message: string;
    priority: string;
    category: string;
    attachments: string[];
    followUpRequired: boolean;
}

export interface FeedbackFilters {
    search?: string;
    rating?: number;
    category?: FeedbackCategory;
    status?: FeedbackStatus;
    donorId?: string;
    donationId?: string;
    isAnonymous?: boolean;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedFeedbackResponse {
    feedbacks: Feedback[];
    total: number;
    totalPages: number;
    currentPage: number;
}

export interface FeedbackStats {
    totalFeedbacks: number;
    averageRating: number;
    responseRate: number;
    ratingDistribution: { [key: number]: number };
    staffRatingAverage: number;
    facilityRatingAverage: number;
    processRatingAverage: number;
    recommendationRate: number;
}

export interface ChatbotRequest {
    message: string;
    sessionId?: string;
    context?: any;
}

export interface ChatbotResponse {
    response: string;
    sessionId: string;
    timestamp: string;
}

export interface EventAverageData {
    eventId: string;
    eventName: string;
    averageRating: number;
    totalFeedbacks: number;
    ratingBreakdown: Array<{
        rating: number;
        count: number;
        percentage: number;
    }>;
}

export interface BulkUpdateRequest {
    updates: Array<{
        id: string;
        data: Partial<FeedbackForm>;
    }>;
}

export interface SearchFeedbackResponse {
    feedbacks: Feedback[];
    total: number;
    totalPages: number;
    searchStats: {
        totalMatches: number;
        searchTime: number;
    };
}

export interface SearchOptions {
    searchIn?: ('title' | 'message' | 'response')[];
    sortBy?: 'rating' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export interface UseFeedback {
    surveys: Survey[];
    feedback: Feedback[];
    respondToFeedback: (id: string, response: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}
