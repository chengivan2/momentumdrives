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
      company_settings: {
        Row: {
          company_address: string | null
          company_email: string | null
          company_logo_url: string | null
          company_name: string
          company_phone: string | null
          company_tax_id: string | null
          created_at: string | null
          default_currency_symbol: string | null
          id: string
          invoice_footer_notes: string | null
          invoice_prefix: string | null
          invoice_terms_and_conditions: string | null
          updated_at: string | null
        }
        Insert: {
          company_address?: string | null
          company_email?: string | null
          company_logo_url?: string | null
          company_name: string
          company_phone?: string | null
          company_tax_id?: string | null
          created_at?: string | null
          default_currency_symbol?: string | null
          id?: string
          invoice_footer_notes?: string | null
          invoice_prefix?: string | null
          invoice_terms_and_conditions?: string | null
          updated_at?: string | null
        }
        Update: {
          company_address?: string | null
          company_email?: string | null
          company_logo_url?: string | null
          company_name?: string
          company_phone?: string | null
          company_tax_id?: string | null
          created_at?: string | null
          default_currency_symbol?: string | null
          id?: string
          invoice_footer_notes?: string | null
          invoice_prefix?: string | null
          invoice_terms_and_conditions?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      generated_invoices: {
        Row: {
          amount_due_at_generation: number | null
          created_at: string | null
          generated_by_user_id: string | null
          id: string
          invoice_number: string
          invoice_pdf_url: string | null
          purchase_id: string
          total_paid_at_generation: number | null
          updated_at: string | null
          version_or_snapshot_timestamp: string
        }
        Insert: {
          amount_due_at_generation?: number | null
          created_at?: string | null
          generated_by_user_id?: string | null
          id?: string
          invoice_number: string
          invoice_pdf_url?: string | null
          purchase_id: string
          total_paid_at_generation?: number | null
          updated_at?: string | null
          version_or_snapshot_timestamp?: string
        }
        Update: {
          amount_due_at_generation?: number | null
          created_at?: string | null
          generated_by_user_id?: string | null
          id?: string
          invoice_number?: string
          invoice_pdf_url?: string | null
          purchase_id?: string
          total_paid_at_generation?: number | null
          updated_at?: string | null
          version_or_snapshot_timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_invoices_generated_by_user_id_fkey"
            columns: ["generated_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_invoices_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          purchase_id: string
          recorded_by_user_id: string
          status: Database["public"]["Enums"]["payment_transaction_status"]
          transaction_reference: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          purchase_id: string
          recorded_by_user_id: string
          status?: Database["public"]["Enums"]["payment_transaction_status"]
          transaction_reference?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          purchase_id?: string
          recorded_by_user_id?: string
          status?: Database["public"]["Enums"]["payment_transaction_status"]
          transaction_reference?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_recorded_by_user_id_fkey"
            columns: ["recorded_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          created_at: string | null
          customer_id: string | null
          guest_customer_email: string | null
          guest_customer_name: string | null
          guest_customer_phone: string | null
          id: string
          invoice_number: string | null
          notes: string | null
          sale_date: string
          salesperson_id: string
          station_id: string
          total_amount_due: number
          updated_at: string | null
          vehicle_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          guest_customer_email?: string | null
          guest_customer_name?: string | null
          guest_customer_phone?: string | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          sale_date?: string
          salesperson_id: string
          station_id: string
          total_amount_due: number
          updated_at?: string | null
          vehicle_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          guest_customer_email?: string | null
          guest_customer_name?: string | null
          guest_customer_phone?: string | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          sale_date?: string
          salesperson_id?: string
          station_id?: string
          total_amount_due?: number
          updated_at?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_salesperson_id_fkey"
            columns: ["salesperson_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: true
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          purchase_id: string
          recorded_by_user_id: string
          referral_details: string | null
          referral_type: Database["public"]["Enums"]["referral_source_type"]
          referrer_name: string | null
          referrer_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          purchase_id: string
          recorded_by_user_id: string
          referral_details?: string | null
          referral_type: Database["public"]["Enums"]["referral_source_type"]
          referrer_name?: string | null
          referrer_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          purchase_id?: string
          recorded_by_user_id?: string
          referral_details?: string | null
          referral_type?: Database["public"]["Enums"]["referral_source_type"]
          referrer_name?: string | null
          referrer_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: true
            referencedRelation: "purchases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_recorded_by_user_id_fkey"
            columns: ["recorded_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_user_id_fkey"
            columns: ["referrer_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          id: string
          manager_id: string | null
          name: string
          phone_number: string | null
          region_or_county: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          manager_id?: string | null
          name: string
          phone_number?: string | null
          region_or_county?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          phone_number?: string | null
          region_or_county?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_station_manager"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string | null
          favorites: string[] | null
          full_name: string | null
          id: string
          phone_number: string | null
          profile_image_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          station_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          favorites?: string[] | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          station_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          favorites?: string[] | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          station_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          added_by_user_id: string | null
          battery_capacity_kwh: number | null
          body_style: string | null
          charging_time_hours: number | null
          color_exterior: string | null
          color_interior: string | null
          condition: Database["public"]["Enums"]["vehicle_condition"] | null
          created_at: string | null
          cylinders: number | null
          description: string | null
          drivetrain: Database["public"]["Enums"]["drivetrain_type"] | null
          engine_displacement_cc: number | null
          engine_type_combustion:
            | Database["public"]["Enums"]["engine_combustion_type"]
            | null
          engine_type_electric: boolean | null
          features: Json | null
          horsepower_hp: number | null
          id: string
          image_urls: string[] | null
          is_hybrid: boolean | null
          make: string
          mileage: number | null
          model: string
          price: number
          range_km: number | null
          station_id: string
          status: Database["public"]["Enums"]["vehicle_status"]
          stock_number: string
          torque_nm: number | null
          transmission: Database["public"]["Enums"]["transmission_type"] | null
          updated_at: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type_enum"]
          vin: string | null
          year: number
        }
        Insert: {
          added_by_user_id?: string | null
          battery_capacity_kwh?: number | null
          body_style?: string | null
          charging_time_hours?: number | null
          color_exterior?: string | null
          color_interior?: string | null
          condition?: Database["public"]["Enums"]["vehicle_condition"] | null
          created_at?: string | null
          cylinders?: number | null
          description?: string | null
          drivetrain?: Database["public"]["Enums"]["drivetrain_type"] | null
          engine_displacement_cc?: number | null
          engine_type_combustion?:
            | Database["public"]["Enums"]["engine_combustion_type"]
            | null
          engine_type_electric?: boolean | null
          features?: Json | null
          horsepower_hp?: number | null
          id?: string
          image_urls?: string[] | null
          is_hybrid?: boolean | null
          make: string
          mileage?: number | null
          model: string
          price: number
          range_km?: number | null
          station_id: string
          status?: Database["public"]["Enums"]["vehicle_status"]
          stock_number: string
          torque_nm?: number | null
          transmission?: Database["public"]["Enums"]["transmission_type"] | null
          updated_at?: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type_enum"]
          vin?: string | null
          year: number
        }
        Update: {
          added_by_user_id?: string | null
          battery_capacity_kwh?: number | null
          body_style?: string | null
          charging_time_hours?: number | null
          color_exterior?: string | null
          color_interior?: string | null
          condition?: Database["public"]["Enums"]["vehicle_condition"] | null
          created_at?: string | null
          cylinders?: number | null
          description?: string | null
          drivetrain?: Database["public"]["Enums"]["drivetrain_type"] | null
          engine_displacement_cc?: number | null
          engine_type_combustion?:
            | Database["public"]["Enums"]["engine_combustion_type"]
            | null
          engine_type_electric?: boolean | null
          features?: Json | null
          horsepower_hp?: number | null
          id?: string
          image_urls?: string[] | null
          is_hybrid?: boolean | null
          make?: string
          mileage?: number | null
          model?: string
          price?: number
          range_km?: number | null
          station_id?: string
          status?: Database["public"]["Enums"]["vehicle_status"]
          stock_number?: string
          torque_nm?: number | null
          transmission?: Database["public"]["Enums"]["transmission_type"] | null
          updated_at?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type_enum"]
          vin?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_added_by_user_id_fkey"
            columns: ["added_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      drivetrain_type: "fwd" | "rwd" | "awd" | "4wd"
      engine_combustion_type: "petrol" | "diesel" | "flex_fuel"
      payment_transaction_status:
        | "pending"
        | "partial_record"
        | "completed_transaction"
        | "refunded_transaction"
      referral_source_type:
        | "customer"
        | "employee"
        | "partner_company"
        | "online_advertisement"
        | "social_media_campaign"
        | "walk_in_no_specific_referral"
        | "other"
      transmission_type: "automatic" | "manual" | "cvt"
      user_role:
        | "customer"
        | "salesperson"
        | "social_media_manager"
        | "station_manager"
        | "owner"
        | "it_admin"
        | "exec"
        | "exec_secretary"
      vehicle_condition: "new" | "used" | "certified_pre_owned"
      vehicle_status: "available" | "reserved" | "sold"
      vehicle_type_enum: "car" | "motorbike"
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
    Enums: {
      drivetrain_type: ["fwd", "rwd", "awd", "4wd"],
      engine_combustion_type: ["petrol", "diesel", "flex_fuel"],
      payment_transaction_status: [
        "pending",
        "partial_record",
        "completed_transaction",
        "refunded_transaction",
      ],
      referral_source_type: [
        "customer",
        "employee",
        "partner_company",
        "online_advertisement",
        "social_media_campaign",
        "walk_in_no_specific_referral",
        "other",
      ],
      transmission_type: ["automatic", "manual", "cvt"],
      user_role: [
        "customer",
        "salesperson",
        "social_media_manager",
        "station_manager",
        "owner",
        "it_admin",
        "exec",
        "exec_secretary",
      ],
      vehicle_condition: ["new", "used", "certified_pre_owned"],
      vehicle_status: ["available", "reserved", "sold"],
      vehicle_type_enum: ["car", "motorbike"],
    },
  },
} as const
