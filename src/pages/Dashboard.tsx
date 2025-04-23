import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { PlusCircle, BarChart2, FileText, ListChecks, Clock } from "lucide-react";
import { getHealthCategory, getHealthCategorykemendagri } from "@/models/health-categories";
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
          .from("assessments")
          .select("*")
          .order("year", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Error fetching recent assessments:", error);
          return;
        }

        // Map database column names to our interface properties
        const mappedData =
          data?.map((item) => ({
            id: item.id,
            name: item.name,
            year: item.year,
            date: item.date,
            userId: item.user_id,
            totalScore: item.total_score || 0,
            status: item.status as "draft" | "completed",
            values: {}, // Initialize with empty values as we're not fetching them here
          })) || [];

        setRecentAssessments(mappedData);
      } catch (error) {
        console.error("Error:", error);
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
        <Card />
        <CardHeader className="pb-2">
          <CardTitle>Selamat Datang, {user?.name || "Pengguna"}</CardTitle>
          <CardDescription>
            Sistem Penilaian Tingkat Kesehatan PERUMDAM TIRTA KERTA RAHARJA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Gunakan sistem ini untuk melakukan penilaian tingkat kesehatan PERUMDAM TIRTA KERTA RAHARJA sesuai dengan Penilaian Tingkat Kesehatan Menurut PUPR tahun 2020 dan Perhitungan dan Penilaian Indikator Kinerja Menurut KEMENDAGRI No.47 Tahun 1999 dengan perhitungan otomatis dan pembuatan laporan yang komprehensif dari tahun ke tahun.
          </p>
        </CardContent>
        
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
                <p className="text-sm text-gray-600">Input data penilaian tahunan berdasarkan indikator BPPSPAM</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/assessmentpupr" className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-700 mb-2">
                  <Clock className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Riwayat Penilaian</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Lihat riwayat penilaian yang telah dilakukan dari tahun ke tahun</p>
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
                <p className="text-sm text-gray-600">Lihat tren kinerja PERUMDAM TIRTA KERTA RAHARJA dari tahun ke tahun</p>
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
                <p className="text-sm text-gray-600">Input data penilaian tahunan berdasarkan indikator KEMENDAGRI</p>
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
                <p className="text-sm text-gray-600">Lihat riwayat penilaian yang telah dilakukan dari tahun ke tahun</p>
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
                <p className="text-sm text-gray-600">Lihat tren kinerja PERUMDAM TIRTA KERTA RAHARJA dari tahun ke tahun</p>
              </CardContent>
            </Card>
          </Link>
        </div>
        

      {/* Summary Penilaian */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Ringkasan Penilaian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Penilaian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentAssessments.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Skor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recentAssessments.length > 0
                    ? (
                        recentAssessments.reduce((sum, a) => sum + a.totalScore, 0) /
                        recentAssessments.length
                      ).toFixed(2)
                    : "-"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skor Tertinggi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recentAssessments.length > 0
                    ? Math.max(...recentAssessments.map((a) => a.totalScore)).toFixed(2)
                    : "-"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skor Terendah</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recentAssessments.length > 0
                    ? Math.min(...recentAssessments.map((a) => a.totalScore)).toFixed(2)
                    : "-"}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Ringkasan Penilaian KEMENDAGRI */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Ringkasan Penilaian KEMENDAGRI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Penilaian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentAssessments.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Skor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recentAssessments.length > 0
                    ? (
                        recentAssessments.reduce((sum, a) => sum + a.totalScore, 0) /
                        recentAssessments.length
                      ).toFixed(2)
                    : "-"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skor Tertinggi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recentAssessments.length > 0
                    ? Math.max(...recentAssessments.map((a) => a.totalScore)).toFixed(2)
                    : "-"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skor Terendah</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recentAssessments.length > 0
                    ? Math.min(...recentAssessments.map((a) => a.totalScore)).toFixed(2)
                    : "-"}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
