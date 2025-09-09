

export enum UserRole {
  Tutor = 'Tutor',
  Parent = 'Parent',
  Student = 'Student',
}

export interface User {
  id: string;
  name:string;
  role: UserRole;
  email?: string;
  studentId?: string; // For students logging in
  studentIds?: string[]; // For parents
}

export interface Student {
  id: string;
  name: string;
  parentIds: string[];
  lastSession: string;
  googleSheetUrl: string;
}

export interface SessionNote {
  id: string;
  studentId: string;
  date: string;
  topicsCovered: string[];
  notes: string;
}

export interface Transaction {
  id: string;
  studentId: string; // Changed from familyId
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  description: string;
  stripeUrl: string;
}

export interface ScheduleEvent {
  id: string;
  studentName: string;
  time: string; // e.g., "9:00 AM - 10:00 AM"
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
}

export interface UploadedFile {
    name: string;
    size: number;
    type: string;
    uploadDate: string;
}