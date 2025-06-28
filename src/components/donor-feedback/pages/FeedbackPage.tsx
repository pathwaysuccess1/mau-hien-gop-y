import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, Search, Filter, Eye, MessageSquare } from 'lucide-react';
import { Feedback, FeedbackFilters, FeedbackCategory, FeedbackStatus, DashboardData } from '../types/feedback.types';
import { FeedbackService } from '../services/feedback.service';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FeedbackFilters>({
    search: '',
    rating: undefined,
    category: undefined,
    status: undefined,
    page: 1,
    limit: 10
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [feedbackData, statsData] = await Promise.all([
          FeedbackService.getFeedbacks(filters),
          FeedbackService.getDashboardData()
        ]);
        setFeedbacks(feedbackData.feedbacks);
        setDashboardData(statsData);
      } catch (error) {
        console.error('Error loading feedback data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [filters]);

  const handleFilterChange = (key: keyof FeedbackFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const RatingDisplay = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );

  const getStatusBadge = (status: FeedbackStatus) => {
    const statusConfig = {
      pending: { label: 'Chờ xử lý', variant: 'destructive' as const },
      reviewed: { label: 'Đã xem', variant: 'secondary' as const },
      responded: { label: 'Đã phản hồi', variant: 'default' as const },
      resolved: { label: 'Đã giải quyết', variant: 'outline' as const }
    };
    
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getCategoryBadge = (category: FeedbackCategory) => {
    const categoryConfig = {
      service_quality: { label: 'Chất lượng dịch vụ', color: 'text-blue-600 border-blue-200' },
      staff_behavior: { label: 'Thái độ nhân viên', color: 'text-green-600 border-green-200' },
      facility_cleanliness: { label: 'Vệ sinh cơ sở', color: 'text-purple-600 border-purple-200' },
      waiting_time: { label: 'Thời gian chờ', color: 'text-orange-600 border-orange-200' },
      overall_experience: { label: 'Trải nghiệm tổng thể', color: 'text-red-600 border-red-200' },
      suggestion: { label: 'Đề xuất', color: 'text-cyan-600 border-cyan-200' },
      complaint: { label: 'Khiếu nại', color: 'text-red-800 border-red-300' }
    };
    
    const config = categoryConfig[category];
    return <Badge variant="outline" className={config.color}>{config.label}</Badge>;
  };

  const categoryOptions: { value: FeedbackCategory; label: string }[] = [
    { value: 'service_quality', label: 'Chất lượng dịch vụ' },
    { value: 'staff_behavior', label: 'Thái độ nhân viên' },
    { value: 'facility_cleanliness', label: 'Vệ sinh cơ sở' },
    { value: 'waiting_time', label: 'Thời gian chờ' },
    { value: 'overall_experience', label: 'Trải nghiệm tổng thể' },
    { value: 'suggestion', label: 'Đề xuất' },
    { value: 'complaint', label: 'Khiếu nại' }
  ];

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-lg">Đang tải dữ liệu...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản Lý Phản Hồi</h1>
          <p className="text-gray-600">Xem và quản lý tất cả phản hồi từ người hiến máu</p>
        </div>

        {/* Stats Cards */}
        {dashboardData && (
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{dashboardData.totalFeedbacks}</div>
                <p className="text-sm text-gray-600">Tổng phản hồi</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{dashboardData.averageRating.toFixed(1)}</div>
                <p className="text-sm text-gray-600">Đánh giá trung bình</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600">{dashboardData.responseRate.toFixed(1)}%</div>
                <p className="text-sm text-gray-600">Tỷ lệ phản hồi</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">
                  {dashboardData ? Object.values(dashboardData.statusBreakdown).reduce((a: number, b: number) => a + b, 0) : 0}
                </div>
                <p className="text-sm text-gray-600">Tổng số phản hồi</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Bộ Lọc & Tìm Kiếm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Tìm kiếm</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Tìm theo tiêu đề, nội dung..."
                    value={filters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Danh mục</Label>
                <Select 
                  value={filters.category || 'all'} 
                  onValueChange={(value) => handleFilterChange('category', value === 'all' ? undefined : value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select 
                  value={filters.status || 'all'} 
                  onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="reviewed">Đã xem</SelectItem>
                    <SelectItem value="responded">Đã phản hồi</SelectItem>
                    <SelectItem value="resolved">Đã giải quyết</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Đánh giá</Label>
                <Select 
                  value={filters.rating?.toString() || 'all'} 
                  onValueChange={(value) => handleFilterChange('rating', value === 'all' ? undefined : parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả đánh giá</SelectItem>
                    <SelectItem value="5">5 sao</SelectItem>
                    <SelectItem value="4">4 sao</SelectItem>
                    <SelectItem value="3">3 sao</SelectItem>
                    <SelectItem value="2">2 sao</SelectItem>
                    <SelectItem value="1">1 sao</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Lọc nâng cao
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Phản Hồi</CardTitle>
            <CardDescription>
              Hiển thị {feedbacks.length} phản hồi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Mã hiến máu</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{feedback.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {feedback.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(feedback.category)}</TableCell>
                    <TableCell>
                      {feedback.donationId ? (
                        <Badge variant="outline">{feedback.donationId}</Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <RatingDisplay rating={feedback.rating} />
                    </TableCell>
                    <TableCell>
                      {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackPage;
