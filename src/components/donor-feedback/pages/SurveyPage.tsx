
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Survey, SurveyQuestion, SurveyResponse } from '../types/feedback.types';
import { FeedbackService } from '../services/feedback.service';
import { useFeedback } from '../hooks/useFeedback';

const SurveyPage = () => {
  const [searchParams] = useSearchParams();
  const surveyId = searchParams.get('surveyId') || 'default-survey';
  const { submitSurvey, isSubmitting } = useFeedback();
  
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<{ [questionId: string]: string | number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        const surveyData = await FeedbackService.getSurveyById(surveyId);
        setSurvey(surveyData);
      } catch (error) {
        console.error('Error loading survey:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSurvey();
  }, [surveyId]);

  const handleResponseChange = (questionId: string, value: string | number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    setResponses(prev => {
      const currentValue = prev[questionId] as string || '';
      const currentOptions = currentValue.split(',').filter(Boolean);
      
      let newOptions;
      if (checked) {
        newOptions = [...currentOptions, option];
      } else {
        newOptions = currentOptions.filter(opt => opt !== option);
      }
      
      return {
        ...prev,
        [questionId]: newOptions.join(',')
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!survey) return;

    const surveyResponse: Omit<SurveyResponse, 'id'> = {
      surveyId: survey.id,
      donorId: 'current-user', // This should come from auth context
      response: Object.entries(responses).map(([questionId, answer]) => ({
        questionId,
        answer
      }))
    };

    await submitSurvey(surveyResponse);
  };

  const renderQuestion = (question: SurveyQuestion) => {
    const response = responses[question.id];

    switch (question.type) {
      case 'rating':
        return (
          <div className="space-y-3">
            <Label className="text-base font-medium">{question.question} {question.required && <span className="text-red-500">*</span>}</Label>
            <RadioGroup 
              value={response?.toString() || ''} 
              onValueChange={(value) => handleResponseChange(question.id, parseInt(value))}
              className="flex justify-between"
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value={rating.toString()} id={`${question.id}-${rating}`} />
                  <Label htmlFor={`${question.id}-${rating}`} className="text-xs">{rating}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rất kém</span>
              <span>Rất tốt</span>
            </div>
          </div>
        );

      case 'multiple_choice':
        if (!question.options) return null;
        return (
          <div className="space-y-3">
            <Label className="text-base font-medium">{question.question} {question.required && <span className="text-red-500">*</span>}</Label>
            <div className="space-y-2">
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${question.id}-${option}`}
                    checked={response?.toString().includes(option) || false}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(question.id, option, !!checked)
                    }
                  />
                  <Label htmlFor={`${question.id}-${option}`} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'yes_no':
        return (
          <div className="space-y-3">
            <Label className="text-base font-medium">{question.question} {question.required && <span className="text-red-500">*</span>}</Label>
            <RadioGroup 
              value={response?.toString() || ''} 
              onValueChange={(value) => handleResponseChange(question.id, value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                <Label htmlFor={`${question.id}-yes`}>Có</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${question.id}-no`} />
                <Label htmlFor={`${question.id}-no`}>Không</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor={question.id} className="text-base font-medium">
              {question.question} {question.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={question.id}
              value={response?.toString() || ''}
              onChange={(e) => handleResponseChange(question.id, e.target.value)}
              placeholder="Nhập câu trả lời của bạn..."
              className="min-h-[100px]"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-lg">Đang tải khảo sát...</div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Không tìm thấy khảo sát</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <FileText className="w-12 h-12 text-green-500" />
            <h1 className="text-4xl font-bold text-green-700">{survey.title}</h1>
          </div>
          <p className="text-lg text-gray-600">{survey.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {survey.questions
            .sort((a, b) => a.order - b.order)
            .map((question, index) => (
            <Card key={question.id}>
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-800">
                  {index + 1}. {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {renderQuestion(question)}
              </CardContent>
            </Card>
          ))}

          <div className="text-center pt-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Đang gửi...' : 'Gửi Khảo Sát'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;
