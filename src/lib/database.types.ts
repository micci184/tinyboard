export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
};

export type Feedback = {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: Task;
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string;
          status?: TaskStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          status?: TaskStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      feedback: {
        Row: Feedback;
        Insert: {
          id?: string;
          user_id: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      task_status: TaskStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
