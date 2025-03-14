
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { PlusCircle, BarChart2, FileText, ListChecks, Clock } from "lucide-react";
import { getHealthCategory } from "@/models/assessment";

// Mock data for dashboard
const recentAssessments = [
  {
    id: "1",
    name: "PDAM Kota Surabaya",
    date: "2023-05-15",
    score: 3.75,
    status: "completed"
  },
  {
    id: "2",
    name: "PDAM Kabupaten Sidoarjo",
    date: "2023-04-20",
    score: 3.2,
    status: "completed"
  },
  {
    id: "3",
    name: "PDAM Kota Malang",
    date: "2023-03-10",
    score: 2.6,
    status: "completed"
  }
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6">
        {/* Welcome Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Selamat Datang, {user?.name}</CardTitle>
            <CardDescription>
              Sistem Penilaian Tingkat Kesehatan PDAM berdasarkan BPPSPAM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Gunakan sistem ini untuk melakukan penilaian tingkat kesehatan PDAM sesuai dengan standar 
              BPPSPAM dengan perhitungan otomatis dan pembuatan laporan yang komprehensif.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/assessment/new">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Buat Penilaian Baru
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/assessment/new" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-700 mb-2">
                  <ListChecks className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Input Penilaian</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Input data penilaian PDAM berdasarkan indikator BPPSPAM
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/assessments" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-700 mb-2">
                  <Clock className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Riwayat Penilaian</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Lihat riwayat penilaian yang telah dilakukan sebelumnya
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/reports" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center text-purple-700 mb-2">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Laporan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Lihat laporan penilaian dalam bentuk grafik dan tabel
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Penilaian Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Nama PDAM</th>
                    <th className="text-left py-3 px-2 font-medium">Tanggal</th>
                    <th className="text-left py-3 px-2 font-medium">Skor</th>
                    <th className="text-left py-3 px-2 font-medium">Kategori</th>
                    <th className="text-left py-3 px-2 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAssessments.map((assessment) => {
                    const healthCategory = getHealthCategory(assessment.score);
                    return (
                      <tr key={assessment.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{assessment.name}</td>
                        <td className="py-3 px-2">{new Date(assessment.date).toLocaleDateString('id-ID')}</td>
                        <td className="py-3 px-2">{assessment.score.toFixed(2)}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${healthCategory.color.replace('bg-', 'bg-opacity-20 text-').replace('-500', '-700')}`}>
                            {healthCategory.category}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <Link to={`/assessment/${assessment.id}`}>
                            <Button variant="outline" size="sm">
                              <FileText className="h-3 w-3 mr-1" />
                              Detail
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/assessments">
              <Button variant="outline">Lihat Semua Penilaian</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
