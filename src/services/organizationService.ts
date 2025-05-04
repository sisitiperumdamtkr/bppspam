
import { supabase } from "@/integrations/supabase/client";

export interface OrganizationSettings {
  id?: string;
  user_id?: string;
  organization_name: string;
  organization_address: string;
  phone_number: string;
  website: string | null;
}

export const fetchOrganizationSettings = async (userId: string): Promise<OrganizationSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('organization_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching organization settings:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching organization settings:", error);
    return null;
  }
};

export const saveOrganizationSettings = async (
  settings: OrganizationSettings, 
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Cek apakah pengaturan sudah ada
    const { data: existingSettings } = await supabase
      .from('organization_settings')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    let result;
    
    if (existingSettings?.id) {
      // Update pengaturan yang sudah ada
      result = await supabase
        .from('organization_settings')
        .update({
          organization_name: settings.organization_name,
          organization_address: settings.organization_address,
          phone_number: settings.phone_number,
          website: settings.website,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSettings.id);
    } else {
      // Buat pengaturan baru
      result = await supabase
        .from('organization_settings')
        .insert({
          user_id: userId,
          organization_name: settings.organization_name,
          organization_address: settings.organization_address,
          phone_number: settings.phone_number,
          website: settings.website
        });
    }

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving organization settings:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan pengaturan" };
  }
};
