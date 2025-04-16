
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Home, CheckCircle, BarChart2, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <Home className="h-6 w-6 mr-2 text-blue-700" />
              <h1 className="text-2xl font-bold text-blue-700">PENILAIAN KINERJA PERUMDAM TKR</h1>
            </Link>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Daftar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Penilaian Kinerja PDAM Tirta Kerta Raharja</h2>
          <p className="text-lg text-gray-600 mb-6">
            Platform digital untuk melakukan penilaian kinerja PDAM berdasarkan standar BPPSPAM 
            dan Peraturan Menteri Dalam Negeri No. 47 Tahun 1999 dengan perhitungan otomatis 
            dan laporan komprehensif.
          </p>
          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <CheckCircle className="mr-2" /> Mulai Penilaian
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="hover:bg-blue-50 transition-colors">
                <BarChart2 className="mr-2" /> Tentang Aplikasi
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <Card className="border-0 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <CardTitle className="text-xl text-blue-700">Indikator Penilaian</CardTitle>
              <CardDescription>Beberapa indikator utama dalam penilaian</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {[
                  { name: "ROE (Return on Equity)", color: "blue" },
                  { name: "Rasio Operasi", color: "green" },
                  { name: "Cash Ratio", color: "yellow" },
                  { name: "Efektivitas Penagihan", color: "purple" },
                  { name: "Indikator Lainnya", color: "red" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full bg-${item.color}-500`}></span>
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg flex items-center justify-between">
              <p className="text-sm text-gray-600">Berdasarkan standar BPPSPAM</p>
              <Link to="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" /> Pengaturan
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Features */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Input Data", description: "Input data berdasarkan indikator penilaian seperti ROE, Rasio Operasi, Cash Ratio, dan lainnya." },
              { title: "Perhitungan Otomatis", description: "Perhitungan skor secara otomatis berdasarkan rumus dan bobot yang telah ditetapkan." },
              { title: "Laporan", description: "Pembuatan laporan dalam bentuk tabel dan grafik serta export ke PDF dan Excel." }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} PERUMDAM TKR. Sub Bag Pengembangan Sistem.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
