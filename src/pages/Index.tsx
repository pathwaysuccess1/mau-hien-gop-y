
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, BarChart3, Survey } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Hệ Thống Feedback Hiến Máu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nền tảng toàn diện để thu thập và quản lý phản hồi từ người hiến máu, 
            giúp cải thiện chất lượng dịch vụ và trải nghiệm người dùng
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/general-feedback">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">Phản Hồi Tổng Quát</CardTitle>
                <CardDescription>
                  Form feedback chung cho hệ thống và dịch vụ
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Bắt Đầu Phản Hồi
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/donation-feedback">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
                  <Heart className="w-8 h-8 text-red-600 fill-current" />
                </div>
                <CardTitle className="text-red-700">Feedback Sau Hiến Máu</CardTitle>
                <CardDescription>
                  Đánh giá trải nghiệm hiến máu cụ thể
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  Đánh Giá Trải Nghiệm
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/survey">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                  <Survey className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">Khảo Sát Chi Tiết</CardTitle>
                <CardDescription>
                  Khảo sát toàn diện về hiến máu
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Tham Gia Khảo Sát
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/feedback-management">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">Quản Lý Phản Hồi</CardTitle>
                <CardDescription>
                  Dashboard cho admin xem tất cả feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Xem Dashboard
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Tính Năng Chính
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Cho Người Hiến Máu</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Feedback tổng quát về hệ thống</li>
                <li>• Đánh giá trải nghiệm hiến máu cụ thể</li>
                <li>• Khảo sát chi tiết và toàn diện</li>
                <li>• Giao diện thân thiện, dễ sử dụng</li>
                <li>• Hỗ trợ đánh giá bằng sao</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Cho Quản Trị Viên</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Dashboard quản lý tất cả phản hồi</li>
                <li>• Bộ lọc và tìm kiếm nâng cao</li>
                <li>• Thống kê và báo cáo chi tiết</li>
                <li>• Theo dõi trạng thái xử lý</li>
                <li>• Phân loại theo loại feedback</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Mọi thông tin phản hồi được bảo mật và chỉ sử dụng để cải thiện dịch vụ hiến máu
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
