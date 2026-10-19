import AsyncStorage from '@react-native-async-storage/async-storage';
import {Assignment, Student} from '../types/models';

const STUDENT_KEY = '@qlht/student';
const ASSIGNMENTS_KEY = '@qlht/assignments';

export async function loadStudent(fallback: Student): Promise<Student> {
  const value = await AsyncStorage.getItem(STUDENT_KEY);
  return value ? (JSON.parse(value) as Student) : fallback;
}

export async function saveStudent(student: Student): Promise<void> {
  await AsyncStorage.setItem(STUDENT_KEY, JSON.stringify(student));
}

export async function loadAssignments(fallback: Assignment[]): Promise<Assignment[]> {
  const value = await AsyncStorage.getItem(ASSIGNMENTS_KEY);
  return value ? (JSON.parse(value) as Assignment[]) : fallback;
}

export async function saveAssignments(assignments: Assignment[]): Promise<void> {
  await AsyncStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
}
