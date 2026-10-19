import React, {useCallback, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ScreenContainer} from '../components/ScreenContainer';
import {SubjectCard, AssignmentCard} from '../components/Cards';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {initialStudent} from '../data/student';
import {subjects} from '../data/subjects';
import {initialAssignments} from '../data/assignments';
import {Assignment} from '../types/models';
import {loadAssignments, loadStudent} from '../services/storage';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList, TabParamList} from '../navigation/navigationTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = CompositeScreenProps<BottomTabScreenProps<TabParamList, 'Overview'>, NativeStackScreenProps<RootStackParamList>>;

export function OverviewScreen({navigation}: Props) {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [studentName, setStudentName] = useState(initialStudent.fullName);
  const [studentDetails, setStudentDetails] = useState(`${initialStudent.studentCode} · ${initialStudent.major}`);
  useFocusEffect(useCallback(() => {
    let active = true;
    Promise.all([loadAssignments(initialAssignments), loadStudent(initialStudent)])
      .then(([loadedAssignments, student]) => {
        if (!active) return;
        setAssignments(loadedAssignments);
        setStudentName(student.fullName);
        setStudentDetails(`${student.studentCode} · ${student.major}`);
      })
      .catch(() => {
        if (active) setAssignments(initialAssignments);
      });
    return () => {
      active = false;
    };
  }, []));
  const upcoming = assignments.filter(item => item.status === 'pending').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 3);
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.topRow}><View><Text style={styles.eyebrow}>TỔNG QUAN HỌC TẬP</Text><Text style={styles.greeting}>Xin chào,</Text><Text style={styles.name}>{studentName}</Text><Text style={styles.subtitle}>{studentDetails}</Text></View><View style={styles.bell}><Ionicons name="notifications-outline" size={23} color={colors.primary} /></View></View>
    <View style={styles.summary}><View style={styles.stat}><Ionicons name="book-outline" size={22} color={colors.surface} /><Text style={styles.summaryNumber}>{subjects.length}</Text><Text style={styles.summaryLabel}>Môn học</Text></View><View style={styles.divider} /><View style={styles.stat}><Ionicons name="time-outline" size={22} color={colors.surface} /><Text style={styles.summaryNumber}>{assignments.filter(item => item.status === 'pending').length}</Text><Text style={styles.summaryLabel}>Bài cần làm</Text></View><View style={styles.divider} /><View style={styles.stat}><Ionicons name="checkmark-done-outline" size={22} color={colors.surface} /><Text style={styles.summaryNumber}>{assignments.filter(item => item.status === 'completed').length}</Text><Text style={styles.summaryLabel}>Đã xong</Text></View></View>
    <Text style={styles.sectionTitle}>Môn học hiện tại</Text>
    {subjects.slice(0, 3).map(subject => <SubjectCard key={subject.id} subject={subject} onPress={() => navigation.navigate('SubjectDetail', {subjectId: subject.id})} />)}
    <Text style={styles.sectionTitle}>Bài tập sắp đến hạn</Text>
    <FlatList data={upcoming} scrollEnabled={false} keyExtractor={item => item.id} renderItem={({item}) => <AssignmentCard assignment={item} subject={subjects.find(subject => subject.id === item.subjectId)} onPress={() => navigation.navigate('AssignmentDetail', {assignmentId: item.id})} onToggle={() => {}} />} ListEmptyComponent={<Text style={styles.empty}>Bạn không có bài tập sắp đến hạn.</Text>} />
  </ScrollView></ScreenContainer>;
}

const styles = StyleSheet.create({
  content: {padding: spacing.lg}, topRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.xl}, eyebrow: {fontSize: 11, letterSpacing: 1, color: colors.primary, fontWeight: '800', marginBottom: 8}, greeting: {fontSize: 18, color: colors.mutedText}, name: {fontSize: 25, fontWeight: '800', color: colors.text, marginTop: 2}, subtitle: {color: colors.mutedText, marginTop: 7}, bell: {backgroundColor: colors.surface, borderRadius: 14, padding: 12, borderWidth: 1, borderColor: colors.border},
  summary: {backgroundColor: colors.primary, borderRadius: 18, padding: spacing.lg, flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl}, stat: {flex: 1, alignItems: 'center'}, divider: {width: 1, height: 54, backgroundColor: 'rgba(255,255,255,0.35)'}, summaryNumber: {fontSize: 22, fontWeight: '800', color: colors.surface, marginTop: 4}, summaryLabel: {color: '#DBEAFE', fontSize: 12, marginTop: 2}, sectionTitle: {fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: spacing.md, marginTop: spacing.sm}, empty: {color: colors.mutedText, padding: spacing.lg},
});
