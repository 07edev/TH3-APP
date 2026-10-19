import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {RootScreenProps} from '../navigation/navigationTypes';
import {initialAssignments} from '../data/assignments';
import {subjects} from '../data/subjects';
import {Assignment} from '../types/models';
import {loadAssignments, saveAssignments} from '../services/storage';
import {ScreenContainer} from '../components/ScreenContainer';
import {StatusBadge} from '../components/StatusBadge';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

export function AssignmentDetailScreen({route}: RootScreenProps<'AssignmentDetail'>) {
  const [assignment, setAssignment] = useState<Assignment | undefined>();
  useEffect(() => {loadAssignments(initialAssignments).then(items => setAssignment(items.find(item => item.id === route.params.assignmentId))).catch(() => setAssignment(initialAssignments.find(item => item.id === route.params.assignmentId)));}, [route.params.assignmentId]);
  if (!assignment) return <ScreenContainer><Text style={styles.error}>Không tìm thấy bài tập.</Text></ScreenContainer>;
  const subject = subjects.find(item => item.id === assignment.subjectId);
  const toggle = () => {const status: Assignment['status'] = assignment.status === 'completed' ? 'pending' : 'completed'; const next = {...assignment, status}; setAssignment(next); loadAssignments(initialAssignments).then(items => saveAssignments(items.map(item => item.id === next.id ? next : item))).catch(() => undefined);};
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content}><Text style={styles.heading}>{assignment.title}</Text><Text style={styles.code}>{subject?.name}</Text><Text style={styles.label}>Hạn nộp</Text><Text style={styles.value}>{new Date(assignment.dueDate).toLocaleString('vi-VN')}</Text><Text style={styles.label}>Mô tả</Text><Text style={styles.value}>{assignment.description}</Text><Text style={styles.label}>Trạng thái</Text><StatusBadge status={assignment.status} /><Pressable style={styles.button} onPress={toggle}><Text style={styles.buttonText}>{assignment.status === 'completed' ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}</Text></Pressable></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({content: {padding: spacing.lg}, heading: {fontSize: 25, fontWeight: '800', color: colors.text}, code: {color: colors.primary, marginTop: 8}, label: {fontWeight: '800', color: colors.text, marginTop: spacing.xl, marginBottom: 6}, value: {color: colors.mutedText, lineHeight: 22}, button: {backgroundColor: colors.primary, padding: spacing.lg, borderRadius: 10, marginTop: spacing.xl, alignItems: 'center'}, buttonText: {color: colors.surface, fontWeight: '700'}, error: {padding: spacing.lg, color: colors.danger}});
