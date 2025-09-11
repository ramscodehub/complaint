export interface Complaint {
    id: number;
    name: string;
    email: string;
    complaint: string;
    status: 'Pending' | 'Resolved';
    created_at: string;
  }