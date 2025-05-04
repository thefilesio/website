export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      solutions: {
        Row: {
          area: string
          benefits: string[] | null
          created_at: string
          description: string | null
          features: string[] | null
          highlight: boolean | null
          id: string
          name: string
          price: string | null
          price_number: number | null
          updated_at: string
        }
        Insert: {
          area: string
          benefits?: string[] | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          highlight?: boolean | null
          id?: string
          name: string
          price?: string | null
          price_number?: number | null
          updated_at?: string
        }
        Update: {
          area?: string
          benefits?: string[] | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          highlight?: boolean | null
          id?: string
          name?: string
          price?: string | null
          price_number?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      system_checks: {
        Row: {
          company_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          current_blockers: string | null
          customer_acquisition: string | null
          desired_outcome: string | null
          id: string
          industry: string | null
          location: string | null
          monthly_revenue: string | null
          optimization_areas: string[] | null
          other_optimization_area: string | null
          other_preferred_contact: string | null
          other_priority: string | null
          preferred_contact: string[] | null
          priority: string | null
          status: string | null
          team_size: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          company_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          current_blockers?: string | null
          customer_acquisition?: string | null
          desired_outcome?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          monthly_revenue?: string | null
          optimization_areas?: string[] | null
          other_optimization_area?: string | null
          other_preferred_contact?: string | null
          other_priority?: string | null
          preferred_contact?: string[] | null
          priority?: string | null
          status?: string | null
          team_size?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          company_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          current_blockers?: string | null
          customer_acquisition?: string | null
          desired_outcome?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          monthly_revenue?: string | null
          optimization_areas?: string[] | null
          other_optimization_area?: string | null
          other_preferred_contact?: string | null
          other_priority?: string | null
          preferred_contact?: string[] | null
          priority?: string | null
          status?: string | null
          team_size?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
          industry: string | null
          location: string | null
          monthly_revenue: string | null
          team_size: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          industry?: string | null
          location?: string | null
          monthly_revenue?: string | null
          team_size?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          monthly_revenue?: string | null
          team_size?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
