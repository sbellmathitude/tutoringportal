

import { User, UserRole, Student, SessionNote, Transaction, ScheduleEvent, UploadedFile } from './types';

// --- NEW DATA STRUCTURE ---
// Parents and Children are now linked via arrays in their respective objects.

export const INITIAL_USERS: { [key: string]: User } = {
  // Tutor
  'user-0': {
    id: 'user-0',
    name: 'Jane Doe',
    role: UserRole.Tutor,
    email: 'jane.doe@mathitude.com',
  },
  // Parents
  'user-1': {
    id: 'user-1',
    name: 'John Smith',
    role: UserRole.Parent,
    email: 'john.smith@example.com',
    studentIds: ['student-1'],
  },
   'user-6': {
    id: 'user-6',
    name: 'Maria Smith',
    role: UserRole.Parent,
    email: 'maria.smith@example.com',
    studentIds: ['student-1'], // Also parent of Emily
  },
  'user-3': {
    id: 'user-3',
    name: 'Alice Johnson',
    role: UserRole.Parent,
    email: 'alice.j@example.com',
    studentIds: ['student-2', 'student-5'], // Parent of two children
  },
  'user-4': {
    id: 'user-4',
    name: 'Robert Williams',
    role: UserRole.Parent,
    email: 'rob.williams@example.com',
    studentIds: ['student-3'],
  },
  'user-5': {
    id: 'user-5',
    name: 'Jessica Brown',
    role: UserRole.Parent,
    email: 'jess.brown@example.com',
    studentIds: ['student-4'],
  },
  // Students (as users for login)
  'user-2': {
    id: 'user-2',
    name: 'Emily Smith',
    role: UserRole.Student,
    email: 'emily.smith@example.com',
    studentId: 'student-1',
  },
};

export const INITIAL_STUDENTS: Student[] = [
  { id: 'student-1', name: 'Emily Smith', parentIds: ['user-1', 'user-6'], lastSession: '2024-07-29', googleSheetUrl: '#' },
  { id: 'student-2', name: 'Michael Johnson', parentIds: ['user-3'], lastSession: '2024-07-28', googleSheetUrl: '#' },
  { id: 'student-3', name: 'Sarah Williams', parentIds: ['user-4'], lastSession: '2024-07-30', googleSheetUrl: '#' },
  { id: 'student-4', name: 'David Brown', parentIds: ['user-5'], lastSession: '2024-07-27', googleSheetUrl: '#' },
  { id: 'student-5', name: 'Olivia Johnson', parentIds: ['user-3'], lastSession: '2024-07-26', googleSheetUrl: '#' },
];

export const SESSION_NOTES: SessionNote[] = [
  { id: 'note-1', studentId: 'student-1', date: '2024-07-29', topicsCovered: ['Quadratic Equations', 'Complex Numbers'], notes: 'Emily is grasping quadratic equations well but needs more practice with factoring complex polynomials.' },
  { id: 'note-2', studentId: 'student-1', date: '2024-07-22', topicsCovered: ['Linear Inequalities'], notes: 'Reviewed graphing inequalities on a number line. Good progress.' },
  { id: 'note-3', studentId: 'student-2', date: '2024-07-28', topicsCovered: ['Stoichiometry', 'Balancing Equations'], notes: 'Michael struggles with multi-step stoichiometry problems. We will review this next session.' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 'txn-1', studentId: 'student-1', date: '2024-07-25', amount: 150.00, status: 'Paid', description: '2 sessions (July)', stripeUrl: '#' },
  { id: 'txn-2', studentId: 'student-2', date: '2024-07-24', amount: 75.00, status: 'Paid', description: '1 session (July)', stripeUrl: '#' },
  { id: 'txn-3', studentId: 'student-3', date: '2024-07-26', amount: 225.00, status: 'Paid', description: '3 sessions (July)', stripeUrl: '#' },
  { id: 'txn-4', studentId: 'student-1', date: '2024-08-01', amount: 75.00, status: 'Pending', description: '1 session (August)', stripeUrl: '#' },
  { id: 'txn-5', studentId: 'student-5', date: '2024-06-25', amount: 150.00, status: 'Paid', description: '2 sessions (June)', stripeUrl: '#' },
];

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
    { id: 'se-1', studentName: 'Emily Smith', time: '3:00 PM - 4:00 PM', day: 'Monday' },
    { id: 'se-2', studentName: 'Michael Johnson', time: '4:00 PM - 5:00 PM', day: 'Tuesday' },
    { id: 'se-3', studentName: 'Sarah Williams', time: '5:00 PM - 6:00 PM', day: 'Tuesday' },
    { id: 'se-4', studentName: 'David Brown', time: '3:00 PM - 4:00 PM', day: 'Wednesday' },
    { id: 'se-5', studentName: 'Emily Smith', time: '3:00 PM - 4:00 PM', day: 'Thursday' },
    { id: 'se-6', studentName: 'Olivia Johnson', time: '4:00 PM - 5:00 PM', day: 'Thursday' },
];

export const UPLOADED_FILES: UploadedFile[] = [
    { name: 'Homework_Chapter_5.pdf', size: 1204, type: 'application/pdf', uploadDate: '2024-07-28' },
    { name: 'Test_Review_Notes.docx', size: 235, type: 'application/msword', uploadDate: '2024-07-26' },
];