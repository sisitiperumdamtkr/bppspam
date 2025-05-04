
import React, { useState, useEffect } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, 
  Building, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Lock,
  Save,
  Loader2
} from "lucide-react";
import { fetchOrganizationSettings, saveOrganizationSettings, OrganizationSettings } from "@/services/organizationService";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus memiliki minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Mohon masukkan alamat email yang valid.",
  }),
  bio: z.string().max(500, {
    message: "Bio tidak boleh lebih dari 500 karakter.",
  }).optional().or(z.literal('')),
  role: z.string().optional(),
});

const organizationFormSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Nama organisasi harus memiliki minimal 2 karakter.",
  }),
  organizationAddress: z.string().min(5, {
    message: "Alamat harus memiliki minimal 5 karakter.",
  }),
  phoneNumber: z.string().min(5, {
    message: "Nomor telepon harus memiliki minimal 5 karakter.",
  }),
  website: z.string().url({
    message: "Mohon masukkan URL yang valid.",
  }).optional().or(z.literal('')),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Password harus memiliki minimal 6 karakter.",
  }),
  newPassword: z.string().min(6, {
    message: "Password harus memiliki minimal 6 karakter.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password harus memiliki minimal 6 karakter.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Password baru dan konfirmasi password tidak sama",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type OrganizationFormValues = z.infer<typeof organizationFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingOrg, setIsSubmittingOrg] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [orgSettings, setOrgSettings] = useState<OrganizationSettings | null>(null);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      role: user?.role || "",
    },
  });

  // Organization form
  const organizationForm = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      organizationName: "",
      organizationAddress: "",
      phoneNumber: "",
      website: "",
    },
  });

  // Security form
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Memperbarui form ketika user berubah
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        role: user.role || "",
      });
      
      // Mengambil pengaturan organisasi
      const loadOrgSettings = async () => {
        const settings = await fetchOrganizationSettings(user.id);
        if (settings) {
          setOrgSettings(settings);
          organizationForm.reset({
            organizationName: settings.organization_name || "",
            organizationAddress: settings.organization_address || "",
            phoneNumber: settings.phone_number || "",
            website: settings.website || "",
          });
        }
      };
      
      loadOrgSettings();
    }
  }, [user]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsSubmittingProfile(true);
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
        bio: data.bio || "",
        role: data.role || user.role,
      });
      
      toast({
        title: "Profil diperbarui",
        description: "Informasi profil Anda telah berhasil diperbarui.",
      });
    } catch (error: any) {
      toast({
        title: "Gagal memperbarui profil",
        description: error.message || "Terjadi kesalahan saat memperbarui profil.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const onOrganizationSubmit = async (data: OrganizationFormValues) => {
    if (!user) return;
    
    setIsSubmittingOrg(true);
    try {
      const result = await saveOrganizationSettings({
        organization_name: data.organizationName,
        organization_address: data.organizationAddress,
        phone_number: data.phoneNumber,
        website: data.website || null,
      }, user.id);
      
      if (result.success) {
        toast({
          title: "Informasi organisasi diperbarui",
          description: "Data organisasi telah berhasil diperbarui.",
        });
      } else {
        throw new Error(result.error || "Gagal menyimpan data organisasi");
      }
    } catch (error: any) {
      toast({
        title: "Gagal memperbarui informasi organisasi",
        description: error.message || "Terjadi kesalahan saat memperbarui informasi organisasi.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingOrg(false);
    }
  };

  const onSecuritySubmit = async (data: SecurityFormValues) => {
    setIsSubmittingPassword(true);
    try {
      // API untuk mengubah password
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Password berhasil diubah",
        description: "Password Anda telah berhasil diperbarui.",
      });
      
      securityForm.reset();
    } catch (error: any) {
      toast({
        title: "Gagal mengubah password",
        description: error.message || "Terjadi kesalahan saat mengubah password.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  if (!user) {
    return (
      <DashboardLayout title="Pengaturan">
        <div className="flex flex-col items-center justify-center h-full">
          <p>Silahkan login untuk mengakses halaman pengaturan</p>
        </div>
      </DashboardLayout>
    );
  }

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

                    <Button 
                      type="submit" 
                      className="w-full md:w-auto flex items-center gap-2"
                      disabled={isSubmittingProfile}
                    >
                      {isSubmittingProfile ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
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

                    <Button 
                      type="submit" 
                      className="w-full md:w-auto flex items-center gap-2"
                      disabled={isSubmittingOrg}
                    >
                      {isSubmittingOrg ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
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
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Password Saat Ini</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        {...securityForm.register("currentPassword")}
                      />
                      {securityForm.formState.errors.currentPassword && (
                        <p className="text-sm text-red-500">{securityForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Password Baru</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        {...securityForm.register("newPassword")}
                      />
                      {securityForm.formState.errors.newPassword && (
                        <p className="text-sm text-red-500">{securityForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        {...securityForm.register("confirmPassword")}
                      />
                      {securityForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">{securityForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto flex items-center gap-2"
                      disabled={isSubmittingPassword}
                    >
                      {isSubmittingPassword ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                      Ubah Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
