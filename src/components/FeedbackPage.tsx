
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, Search, Filter, Eye } from 'lucide-react';

const FeedbackPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  // Mock data - trong thực tế sẽ lấy từ API
  const feedbackData = [
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
    },
    {
      id: '3',
      type: 'donation',
      donationId: 'DN002',
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      overallRating: 3,
      date: '2024-01-13',
      status: 'responded',
      summary: 'Thời gian chờ hơi lâu nhưng nhân viên tốt'
    }
  ];

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Mới', variant: 'destructive' as const },
      reviewed: { label: 'Đã xem', variant: 'secondary' as const },
      responded: { label: 'Đã phản hồi', variant: 'default' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return type === 'donation' ? 
      <Badge variant="outline" className="text-red-600 border-red-200">Hiến máu</Badge> :
      <Badge variant="outline" className="text-blue-600 border-blue-200">Tổng quát</Badge>;
  };

  const filteredData = feedbackData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.donationId && item.donationId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesRating = filterRating === 'all' || item.overallRating.toString() === filterRating;
    
    return matchesSearch && matchesType && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản Lý Phản Hồi</h1>
          <p className="text-gray-600">Xem và quản lý tất cả phản hồi từ người dùng</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Bộ Lọc & Tìm Kiếm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Tìm kiếm</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Tên, email, mã hiến máu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Loại phản hồi</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="donation">Hiến máu</SelectItem>
                    <SelectItem value="general">Tổng quát</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Đánh giá</Label>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <p className="text-sm text-gray-600">Tổng phản hồi</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-sm text-gray-600">Đã xử lý</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">6</div>
              <p className="text-sm text-gray-600">Chưa xử lý</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">4.2</div>
              <p className="text-sm text-gray-600">Đánh giá TB</p>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Phản Hồi</CardTitle>
            <CardDescription>
              Hiển thị {filteredData.length} phản hồi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người gửi</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Mã hiến máu</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Tóm tắt</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(item.type)}</TableCell>
                    <TableCell>
                      {item.donationId ? (
                        <Badge variant="outline">{item.donationId}</Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <RatingDisplay rating={item.overallRating} />
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.summary}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
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
