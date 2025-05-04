
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Building, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Lock,
  Save
} from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }),
  role: z.string().optional(),
});

const organizationFormSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  organizationAddress: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  phoneNumber: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: "",
      role: user?.role || "",
    },
  });

  // Organization form
  const organizationForm = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      organizationName: "PDAM Tirta Pakuan",
      organizationAddress: "Jl. Siliwangi No. 121, Bogor",
      phoneNumber: "(0251) 8324111",
      website: "https://pdamkotabogor.go.id",
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    toast({
      title: "Profil pengguna diperbarui",
      description: "Informasi profil Anda telah berhasil diperbarui.",
    });
  };

  const onOrganizationSubmit = (data: OrganizationFormValues) => {
    toast({
      title: "Informasi organisasi diperbarui",
      description: "Data organisasi telah berhasil diperbarui.",
    });
  };

  return (
    <DashboardLayout title="Pengaturan">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Pengaturan</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden md:inline">Organisasi</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Keamanan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profil Pengguna</CardTitle>
                <CardDescription>
                  Informasi ini akan ditampilkan dalam aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          {...profileForm.register("name")}
                        />
                        {profileForm.formState.errors.name && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...profileForm.register("email")}
                        />
                        {profileForm.formState.errors.email && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        {...profileForm.register("bio")}
                        placeholder="Tentang Anda"
                        className="min-h-32"
                      />
                      {profileForm.formState.errors.bio && (
                        <p className="text-sm text-red-500">{profileForm.formState.errors.bio.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Jabatan</Label>
                      <Input
                        id="role"
                        {...profileForm.register("role")}
                        placeholder="Jabatan Anda"
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Organisasi</CardTitle>
                <CardDescription>
                  Informasi tentang PDAM atau instansi Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={organizationForm.handleSubmit(onOrganizationSubmit)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Nama PDAM / Instansi</Label>
                      <Input
                        id="organizationName"
                        {...organizationForm.register("organizationName")}
                      />
                      {organizationForm.formState.errors.organizationName && (
                        <p className="text-sm text-red-500">{organizationForm.formState.errors.organizationName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizationAddress">Alamat</Label>
                      <Textarea
                        id="organizationAddress"
                        {...organizationForm.register("organizationAddress")}
                        className="min-h-24"
                      />
                      {organizationForm.formState.errors.organizationAddress && (
                        <p className="text-sm text-red-500">{organizationForm.formState.errors.organizationAddress.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Nomor Telepon</Label>
                        <Input
                          id="phoneNumber"
                          {...organizationForm.register("phoneNumber")}
                        />
                        {organizationForm.formState.errors.phoneNumber && (
                          <p className="text-sm text-red-500">{organizationForm.formState.errors.phoneNumber.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          {...organizationForm.register("website")}
                          placeholder="https://contoh.com"
                        />
                        {organizationForm.formState.errors.website && (
                          <p className="text-sm text-red-500">{organizationForm.formState.errors.website.message}</p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="w-full md:w-auto flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>
                  Atur preferensi notifikasi Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Pengaturan notifikasi akan tersedia dalam versi selanjutnya.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Keamanan Akun</CardTitle>
                <CardDescription>
                  Pengaturan keamanan untuk akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="current-password">Password Saat Ini</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="new-password">Password Baru</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="w-full md:w-auto flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Ubah Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
