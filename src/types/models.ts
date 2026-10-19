export type AssignmentStatus = 'pending' | 'completed';

export type Subject = {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  room: string;
  semester: string;
  description: string;
};

export type Assignment = {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: string;
  status: AssignmentStatus;
};

export type ScheduleItem = {
  id: string;
  subjectId: string;
  dayOfWeek: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  lecturer: string;
  note: string;
};

export type Student = {
  studentCode: string;
  fullName: string;
  className: string;
  major: string;
  email: string;
  phone: string;
};

export type AcademicResult = {
  id: string;
  subjectId: string;
  semester: string;
  processScore: number;
  examScore: number;
  finalScore: number;
  letterGrade: string;
  status: 'passed' | 'failed';
};
