

import { User, UserRole, Student, SessionNote, Transaction, ScheduleEvent, UploadedFile } from './types';

export const INITIAL_USERS: { [key in UserRole | string]: User } = {
  [UserRole.Tutor]: {
    id: 'user-0',
    name: 'Jane Doe',
    role: UserRole.Tutor,
    avatarUrl: 'https://picsum.photos/id/1027/100/100',
    email: 'jane.doe@mathitude.com',
  },
  [UserRole.Parent]: {
    id: 'user-1',
    name: 'John Smith',
    role: UserRole.Parent,
    avatarUrl: 'https://picsum.photos/id/1005/100/100',
    email: 'john.smith@example.com',
    childId: 'student-1',
  },
  [UserRole.Student]: {
    id: 'user-2',
    name: 'Emily Smith',
    role: UserRole.Student,
    avatarUrl: 'https://picsum.photos/id/1011/100/100',
    email: 'emily.smith@example.com',
    studentId: 'student-1',
  },
};

export const INITIAL_STUDENTS: Student[] = [
  { id: 'student-1', name: 'Emily Smith', parentId: 'user-1', lastSession: '2024-07-29', googleSheetUrl: '#' },
  { id: 'student-2', name: 'Michael Johnson', parentId: 'user-3', lastSession: '2024-07-28', googleSheetUrl: '#' },
  { id: 'student-3', name: 'Sarah Williams', parentId: 'user-4', lastSession: '2024-07-30', googleSheetUrl: '#' },
  { id: 'student-4', name: 'David Brown', parentId: 'user-5', lastSession: '2024-07-27', googleSheetUrl: '#' },
];

export const SESSION_NOTES: SessionNote[] = [
  { id: 'note-1', studentId: 'student-1', date: '2024-07-29', topicsCovered: ['Quadratic Equations', 'Complex Numbers'], notes: 'Emily is grasping quadratic equations well but needs more practice with factoring complex polynomials.' },
  { id: 'note-2', studentId: 'student-1', date: '2024-07-22', topicsCovered: ['Linear Inequalities'], notes: 'Reviewed graphing inequalities on a number line. Good progress.' },
  { id: 'note-3', studentId: 'student-2', date: '2024-07-28', topicsCovered: ['Stoichiometry', 'Balancing Equations'], notes: 'Michael struggles with multi-step stoichiometry problems. We will review this next session.' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 'txn-1', parentId: 'user-1', date: '2024-07-25', amount: 150.00, status: 'Paid', description: '2 sessions (July)', stripeUrl: '#' },
  { id: 'txn-2', parentId: 'user-3', date: '2024-07-24', amount: 75.00, status: 'Paid', description: '1 session (July)', stripeUrl: '#' },
  { id: 'txn-3', parentId: 'user-4', date: '2024-07-26', amount: 225.00, status: 'Paid', description: '3 sessions (July)', stripeUrl: '#' },
  { id: 'txn-4', parentId: 'user-5', date: '2024-08-01', amount: 75.00, status: 'Pending', description: '1 session (August)', stripeUrl: '#' },
  { id: 'txn-5', parentId: 'user-1', date: '2024-06-25', amount: 150.00, status: 'Paid', description: '2 sessions (June)', stripeUrl: '#' },
];

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
    { id: 'se-1', studentName: 'Emily Smith', time: '3:00 PM - 4:00 PM', day: 'Monday' },
    { id: 'se-2', studentName: 'Michael Johnson', time: '4:00 PM - 5:00 PM', day: 'Tuesday' },
    { id: 'se-3', studentName: 'Sarah Williams', time: '5:00 PM - 6:00 PM', day: 'Tuesday' },
    { id: 'se-4', studentName: 'David Brown', time: '3:00 PM - 4:00 PM', day: 'Wednesday' },
    { id: 'se-5', studentName: 'Emily Smith', time: '3:00 PM - 4:00 PM', day: 'Thursday' },
];

export const UPLOADED_FILES: UploadedFile[] = [
    { name: 'Homework_Chapter_5.pdf', size: 1204, type: 'application/pdf', uploadDate: '2024-07-28' },
    { name: 'Test_Review_Notes.docx', size: 235, type: 'application/msword', uploadDate: '2024-07-26' },
];