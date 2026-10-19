import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {Assignment, ScheduleItem, Subject} from '../types/models';
import {StatusBadge} from './StatusBadge';

export function SubjectCard({subject, onPress}: {subject: Subject; onPress: () => void}) {
  return <Pressable style={styles.card} onPress={onPress}>
    <View style={styles.iconBox}><Ionicons name="book-outline" size={22} color={colors.primary} /></View>
    <View style={styles.cardBody}><Text style={styles.code}>{subject.code} · {subject.credits} tín chỉ</Text>
    <Text style={styles.title}>{subject.name}</Text>
    <Text style={styles.muted}><Ionicons name="person-outline" size={13} color={colors.mutedText} />  {subject.lecturer}</Text></View>
    <Ionicons name="chevron-forward" size={20} color={colors.tabInactive} />
  </Pressable>;
}

export function AssignmentCard({assignment, subject, onPress, onToggle}: {assignment: Assignment; subject?: Subject; onPress: () => void; onToggle: () => void}) {
  return <Pressable style={styles.card} onPress={onPress}>
    <View style={styles.iconBox}><Ionicons name="document-text-outline" size={22} color={colors.primary} /></View>
    <View style={styles.cardBody}><View style={styles.row}><Text style={styles.title}>{assignment.title}</Text><Pressable onPress={onToggle}><Ionicons name={assignment.status === 'completed' ? 'checkmark-circle' : 'ellipse-outline'} size={26} color={assignment.status === 'completed' ? colors.success : colors.primary} /></Pressable></View>
    <Text style={styles.muted}>{subject?.name ?? 'Môn học'} · Hạn {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}</Text>
    <StatusBadge status={assignment.status} />
    </View>
  </Pressable>;
}

export function ScheduleCard({item, subject, onPress}: {item: ScheduleItem; subject?: Subject; onPress: () => void}) {
  return <Pressable style={styles.card} onPress={onPress}>
    <View style={styles.iconBox}><Ionicons name="calendar-outline" size={22} color={colors.primary} /></View>
    <View style={styles.cardBody}><Text style={styles.title}>{subject?.name ?? 'Môn học'}</Text>
    <Text style={styles.muted}>{item.startTime} - {item.endTime} · Phòng {item.room}</Text>
    <Text style={styles.muted}>{item.lecturer}</Text>
    </View><Ionicons name="chevron-forward" size={20} color={colors.tabInactive} />
  </Pressable>;
}

const styles = StyleSheet.create({
  card: {backgroundColor: colors.surface, borderRadius: 16, padding: spacing.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', shadowColor: '#0F172A', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: {width: 0, height: 3}, elevation: 2},
  iconBox: {width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFF6FF', marginRight: spacing.md},
  cardBody: {flex: 1},
  code: {color: colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 6},
  title: {color: colors.text, fontSize: 16, fontWeight: '700', flex: 1},
  muted: {color: colors.mutedText, marginTop: 6},
  row: {flexDirection: 'row', alignItems: 'center'},
});
