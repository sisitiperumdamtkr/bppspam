
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { PlusCircle, BarChart2, FileText, ListChecks, Clock } from "lucide-react";
import { getHealthCategory } from "@/models/health-categories";
import { supabase } from "@/integrations/supabase/client";
import { Assessment } from "@/models/types";

const Dashboard = () => {
  const { user } = useAuth();
  const [recentAssessments, setRecentAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent assessments from Supabase
    const fetchRecentAssessments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .order('year', { ascending: false })
          .limit(3);
        
        if (error) {
          console.error('Error fetching recent assessments:', error);
          return;
        }
        
        // Map database column names to our interface properties
        const mappedData = data?.map(item => ({
          id: item.id,
          name: item.name,
          year: item.year,
          date: item.date,
          userId: item.user_id,
          totalScore: item.total_score || 0,
          status: item.status as "draft" | "completed",
          values: {} // Initialize with empty values as we're not fetching them here
        })) || [];
        
        setRecentAssessments(mappedData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentAssessments();
  }, [user]);

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6">
        {/* Welcome Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Selamat Datang, {user?.name || 'Pengguna'}</CardTitle>
            <CardDescription>
              Sistem Penilaian Tingkat Kesehatan PERUMDAM TIRTA KERTA RAHARJA berdasarkan BPPSPAM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Gunakan sistem ini untuk melakukan penilaian tingkat kesehatan PERUMDAM TIRTA KERTA RAHARJA sesuai dengan standar 
              BPPSPAM dan Menurut KEMENDAGRI No.47 Tahun 1999 dengan perhitungan otomatis dan pembuatan laporan yang komprehensif dari tahun ke tahun.
            </p>
          </CardContent>
          <Card>
            <Link to="/assessment/pupr">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Buat Penilaian PUPR Baru
              </Button>
            </Link>
            <Link to="/assessment/pupr">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Buat Penilaian PUPR Baru
              </Button>
            </Link>
          </Card>
          <CardFooter>
            <Link to="/assessment/kemendagri">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Buat Penilaian KEMENDAGRI Baru
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Quick Actions BPPSPAM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/assessment/pupr" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-700 mb-2">
                  <ListChecks className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Input Penilaian</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Input data penilaian tahunan berdasarkan indikator BPPSPAM
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/assessmentspupr" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-700 mb-2">
                  <Clock className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Riwayat Penilaian</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Lihat riwayat penilaian yang telah dilakukan dari tahun ke tahun
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/reportspupr" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center text-purple-700 mb-2">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Laporan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Lihat tren kinerja PERUMDAM TIRTA KERTA RAHARJA dari tahun ke tahun
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
{/* Quick Actions KEMENDAGRI */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/assessment/kemendagri" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-700 mb-2">
                  <ListChecks className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Input Penilaian KEMENDAGRI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Input data penilaian tahunan berdasarkan indikator KEMENDAGRI
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/assessmentkemendagri" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-700 mb-2">
                  <Clock className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Riwayat Penilaian KEMMENDAGRI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Lihat riwayat penilaian yang telah dilakukan dari tahun ke tahun
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/reportskemendagri" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center text-purple-700 mb-2">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Laporan PENILAIAN KEMENDAGRI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Lihat tren kinerja PERUMDAM TIRTA KERTA RAHARJA dari tahun ke tahun
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
            {loading ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Memuat data...</p>
              </div>
            ) : recentAssessments.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Belum ada penilaian yang dibuat</p>
                <Link to="/assessment/new" className="inline-block mt-2">
                  <Button variant="outline" size="sm">
                    Buat Penilaian Pertama
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Tahun</th>
                      <th className="text-left py-3 px-2 font-medium">Tanggal</th>
                      <th className="text-left py-3 px-2 font-medium">Skor</th>
                      <th className="text-left py-3 px-2 font-medium">Kategori</th>
                      <th className="text-left py-3 px-2 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAssessments.map((assessment) => {
                      const healthCategory = getHealthCategory(assessment.totalScore);
                      return (
                        <tr key={assessment.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2">{assessment.year}</td>
                          <td className="py-3 px-2">{new Date(assessment.date).toLocaleDateString('id-ID')}</td>
                          <td className="py-3 px-2">{assessment.totalScore.toFixed(2)}</td>
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
            )}
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
