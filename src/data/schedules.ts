import {ScheduleItem} from '../types/models';

export const schedules: ScheduleItem[] = [
  {id: 'schedule-1', subjectId: 'mobile-programming', dayOfWeek: 'Thứ 2', date: '2026-10-19', startTime: '07:30', endTime: '09:50', room: 'A203', lecturer: 'Nguyễn Văn An', note: 'Mang theo máy tính cá nhân.'},
  {id: 'schedule-2', subjectId: 'database', dayOfWeek: 'Thứ 3', date: '2026-10-20', startTime: '09:50', endTime: '12:10', room: 'B105', lecturer: 'Trần Thị Bình', note: 'Ôn tập chương 1 và 2.'},
  {id: 'schedule-3', subjectId: 'software-engineering', dayOfWeek: 'Thứ 4', date: '2026-10-21', startTime: '13:00', endTime: '15:20', room: 'C302', lecturer: 'Lê Hoàng Nam', note: 'Làm việc theo nhóm.'},
  {id: 'schedule-4', subjectId: 'english', dayOfWeek: 'Thứ 5', date: '2026-10-22', startTime: '07:30', endTime: '09:00', room: 'D201', lecturer: 'Phạm Thu Hà', note: 'Chuẩn bị phần thuyết trình.'},
  {id: 'schedule-5', subjectId: 'mobile-programming', dayOfWeek: 'Thứ 6', date: '2026-10-23', startTime: '13:00', endTime: '15:20', room: 'Lab 2', lecturer: 'Nguyễn Văn An', note: 'Thực hành navigation.'},
];
