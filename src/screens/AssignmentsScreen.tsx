import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {ScreenContainer} from '../components/ScreenContainer';
import {AssignmentCard} from '../components/Cards';
import {EmptyState} from '../components/EmptyState';
import {initialAssignments} from '../data/assignments';
import {subjects} from '../data/subjects';
import {Assignment, AssignmentStatus} from '../types/models';
import {loadAssignments, saveAssignments} from '../services/storage';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigationTypes';

export function AssignmentsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [filter, setFilter] = useState<'all' | AssignmentStatus>('all');
  const [query, setQuery] = useState('');
  useEffect(() => { loadAssignments(initialAssignments).then(setAssignments).catch(() => setAssignments(initialAssignments)); }, []);
  const filtered = useMemo(() => assignments.filter(item => (filter === 'all' || item.status === filter) && item.title.toLowerCase().includes(query.toLowerCase())), [assignments, filter, query]);
  const toggle = (id: string) => setAssignments(current => { const next = current.map(item => { if (item.id !== id) return item; const status: AssignmentStatus = item.status === 'completed' ? 'pending' : 'completed'; return {...item, status}; }); saveAssignments(next).catch(() => undefined); return next; });
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Text style={styles.heading}>Bài tập</Text><Text style={styles.subtitle}>{filtered.length} bài tập được tìm thấy</Text><View style={styles.search}><Ionicons name="search-outline" size={20} color={colors.mutedText} /><TextInput value={query} onChangeText={setQuery} placeholder="Tìm bài tập..." style={styles.input} /></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}><Pressable onPress={() => setFilter('all')} style={[styles.filter, filter === 'all' && styles.active]}><Text style={filter === 'all' ? styles.activeText : styles.filterText}>Tất cả</Text></Pressable><Pressable onPress={() => setFilter('pending')} style={[styles.filter, filter === 'pending' && styles.active]}><Text style={filter === 'pending' ? styles.activeText : styles.filterText}>Chưa hoàn thành</Text></Pressable><Pressable onPress={() => setFilter('completed')} style={[styles.filter, filter === 'completed' && styles.active]}><Text style={filter === 'completed' ? styles.activeText : styles.filterText}>Đã hoàn thành</Text></Pressable></ScrollView><View style={styles.list}>{filtered.length > 0 ? filtered.map(item => <AssignmentCard key={item.id} assignment={item} subject={subjects.find(subject => subject.id === item.subjectId)} onPress={() => navigation.navigate('AssignmentDetail', {assignmentId: item.id})} onToggle={() => toggle(item.id)} />) : <EmptyState message="Không có bài tập phù hợp." />}</View></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({content: {paddingBottom: spacing.xl}, heading: {fontSize: 26, fontWeight: '800', color: colors.text, paddingHorizontal: spacing.lg, paddingTop: spacing.lg}, subtitle: {color: colors.mutedText, marginHorizontal: spacing.lg, marginTop: 5, marginBottom: spacing.lg}, search: {height: 64, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, marginHorizontal: spacing.lg, paddingHorizontal: spacing.md}, input: {flex: 1, paddingVertical: 12, paddingHorizontal: spacing.sm, color: colors.text, fontSize: 16}, filters: {paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.sm, alignItems: 'flex-start'}, filter: {height: 44, justifyContent: 'center', paddingHorizontal: 16, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border}, active: {backgroundColor: colors.primary, borderColor: colors.primary}, filterText: {color: colors.mutedText, fontSize: 15}, activeText: {color: colors.surface, fontWeight: '700', fontSize: 15}, list: {paddingHorizontal: spacing.lg}});
