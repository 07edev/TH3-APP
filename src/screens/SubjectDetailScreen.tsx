import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {RootScreenProps} from '../navigation/navigationTypes';
import {subjects} from '../data/subjects';
import {initialAssignments} from '../data/assignments';
import {schedules} from '../data/schedules';
import {ScreenContainer} from '../components/ScreenContainer';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {Subject} from '../types/models';

export function SubjectDetailScreen({route}: RootScreenProps<'SubjectDetail'>) {
  const subject: Subject | undefined = subjects.find(item => item.id === route.params.subjectId);
  if (!subject) return <ScreenContainer><Text style={styles.error}>Không tìm thấy môn học.</Text></ScreenContainer>;
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content}><Text style={styles.heading}>{subject.name}</Text><Text style={styles.code}>{subject.code} · {subject.credits} tín chỉ</Text><Text style={styles.label}>Giảng viên</Text><Text style={styles.value}>{subject.lecturer}</Text><Text style={styles.label}>Phòng học</Text><Text style={styles.value}>{subject.room}</Text><Text style={styles.label}>Học kỳ</Text><Text style={styles.value}>{subject.semester}</Text><Text style={styles.label}>Mô tả</Text><Text style={styles.value}>{subject.description}</Text><Text style={styles.label}>Bài tập ({initialAssignments.filter(item => item.subjectId === subject.id).length})</Text>{initialAssignments.filter(item => item.subjectId === subject.id).map(item => <Text key={item.id} style={styles.item}>• {item.title}</Text>)}<Text style={styles.label}>Lịch học ({schedules.filter(item => item.subjectId === subject.id).length})</Text>{schedules.filter(item => item.subjectId === subject.id).map(item => <Text key={item.id} style={styles.item}>• {item.dayOfWeek}, {item.startTime} - {item.endTime}, {item.room}</Text>)}</ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({content: {padding: spacing.lg}, heading: {fontSize: 25, fontWeight: '800', color: colors.text}, code: {color: colors.primary, fontWeight: '700', marginTop: 8}, label: {fontWeight: '800', color: colors.text, marginTop: spacing.xl}, value: {color: colors.mutedText, marginTop: 6, lineHeight: 22}, item: {color: colors.text, marginTop: spacing.sm}, error: {padding: spacing.lg, color: colors.danger}});
