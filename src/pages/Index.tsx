
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">HealthWise PDAM</h1>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Penilaian Tingkat Kesehatan PDAM</h2>
          <p className="text-lg text-gray-600 mb-6">
            Platform digital untuk melakukan penilaian tingkat kesehatan PDAM berdasarkan 
            standar BPPSPAM dengan perhitungan otomatis dan laporan komprehensif.
          </p>
          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button size="lg">Mulai Penilaian</Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">Tentang Aplikasi</Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <CardTitle className="text-xl text-blue-700">Indikator Penilaian</CardTitle>
              <CardDescription>Beberapa indikator utama dalam penilaian</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">ROE (Return on Equity)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">Rasio Operasi</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <span className="font-medium">Cash Ratio</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  <span className="font-medium">Efektivitas Penagihan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  <span className="font-medium">Dan indikator lainnya</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg">
              <p className="text-sm text-gray-600">Berdasarkan standar BPPSPAM</p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Features */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Input Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Input data berdasarkan indikator penilaian seperti ROE, Rasio Operasi, Cash Ratio, dan lainnya.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Perhitungan Otomatis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Perhitungan skor secara otomatis berdasarkan rumus dan bobot yang telah ditetapkan.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Laporan</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Pembuatan laporan dalam bentuk tabel dan grafik serta export ke PDF dan Excel.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} HealthWise PDAM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
