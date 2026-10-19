import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {RootScreenProps} from '../navigation/navigationTypes';
import {schedules} from '../data/schedules';
import {subjects} from '../data/subjects';
import {ScreenContainer} from '../components/ScreenContainer';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

export function ScheduleDetailScreen({route}: RootScreenProps<'ScheduleDetail'>) {
  const item = schedules.find(value => value.id === route.params.scheduleId);
  const subject = item && subjects.find(value => value.id === item.subjectId);
  if (!item || !subject) return <ScreenContainer><Text style={styles.error}>Không tìm thấy buổi học.</Text></ScreenContainer>;
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content}><Text style={styles.heading}>{subject.name}</Text><Text style={styles.code}>{subject.code}</Text><Text style={styles.label}>Ngày học</Text><Text style={styles.value}>{item.dayOfWeek} ({item.date})</Text><Text style={styles.label}>Thời gian</Text><Text style={styles.value}>{item.startTime} - {item.endTime}</Text><Text style={styles.label}>Phòng học</Text><Text style={styles.value}>{item.room}</Text><Text style={styles.label}>Giảng viên</Text><Text style={styles.value}>{item.lecturer}</Text><Text style={styles.label}>Ghi chú</Text><Text style={styles.value}>{item.note}</Text></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({content: {padding: spacing.lg}, heading: {fontSize: 25, fontWeight: '800', color: colors.text}, code: {color: colors.primary, marginTop: 8, fontWeight: '700'}, label: {fontWeight: '800', color: colors.text, marginTop: spacing.xl}, value: {color: colors.mutedText, marginTop: 6}, error: {padding: spacing.lg, color: colors.danger}});
