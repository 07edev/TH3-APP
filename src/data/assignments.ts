import {Assignment} from '../types/models';

export const initialAssignments: Assignment[] = [
  {
    id: 'assignment-1',
    subjectId: 'mobile-programming',
    title: 'Xây dựng ứng dụng quản lý học tập',
    description: 'Hoàn thiện các màn hình chính và điều hướng cho ứng dụng React Native.',
    dueDate: '2026-10-25T23:59:00+07:00',
    status: 'pending',
  },
  {
    id: 'assignment-2',
    subjectId: 'database',
    title: 'Thiết kế cơ sở dữ liệu thư viện',
    description: 'Vẽ ERD và viết các câu lệnh tạo bảng cho hệ thống thư viện.',
    dueDate: '2026-10-28T23:59:00+07:00',
    status: 'pending',
  },
  {
    id: 'assignment-3',
    subjectId: 'software-engineering',
    title: 'Phân tích yêu cầu phần mềm',
    description: 'Viết tài liệu đặc tả yêu cầu cho một hệ thống bán hàng.',
    dueDate: '2026-10-18T23:59:00+07:00',
    status: 'completed',
  },
  {
    id: 'assignment-4',
    subjectId: 'english',
    title: 'Thuyết trình về trí tuệ nhân tạo',
    description: 'Chuẩn bị bài thuyết trình nhóm bằng tiếng Anh.',
    dueDate: '2026-11-02T23:59:00+07:00',
    status: 'pending',
  },
];
