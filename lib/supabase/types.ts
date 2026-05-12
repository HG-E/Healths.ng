export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          organization: string | null
          service_interest: string | null
          message: string
          source_page: string | null
          status: 'new' | 'read' | 'responded' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['contact_submissions']['Row'],
          'id' | 'status' | 'created_at' | 'updated_at'
        > & {
          status?: 'new' | 'read' | 'responded' | 'archived'
        }
      }
      booking_requests: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          organization: string | null
          service_type: string
          preferred_date: string | null
          preferred_time: string | null
          message: string | null
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['booking_requests']['Row'],
          'id' | 'status' | 'created_at' | 'updated_at'
        > & {
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          full_name: string | null
          status: 'active' | 'unsubscribed'
          source: string | null
          brevo_contact_id: string | null
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['newsletter_subscribers']['Row'],
          'id' | 'status' | 'created_at'
        > & {
          status?: 'active' | 'unsubscribed'
        }
      }
      training_registrations: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          organization: string | null
          profession: string | null
          training_name: string
          training_date: string | null
          payment_status: string
          amount: number | null
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['training_registrations']['Row'],
          'id' | 'created_at'
        >
      }
    }
  }
}
