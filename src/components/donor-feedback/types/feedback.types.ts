
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

export interface SurveyFormData {
  surveyId: string;
  respondentInfo: {
    age: string;
    gender: string;
    occupation: string;
    location: string;
  };
  donationHistory: {
    firstTime: string;
    frequency: string;
    lastDonation: string;
    motivations: string[];
  };
  experience: {
    awarenessSource: string;
    registrationEase: string;
    informationClarity: string;
    appointmentProcess: string;
    facilityRating: string;
    staffProfessionalism: string;
  };
  satisfaction: {
    overallSatisfaction: string;
    recommendationLikelihood: string;
    improvementSuggestions: string;
    additionalServices: string[];
  };
  demographics: {
    educationLevel: string;
    monthlyIncome: string;
    healthStatus: string;
  };
  openFeedback: {
    bestAspect: string;
    worstAspect: string;
    suggestions: string;
    futureParticipation: string;
  };
}
