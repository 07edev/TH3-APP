import React, {useCallback, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenContainer} from '../components/ScreenContainer';
import {initialStudent} from '../data/student';
import {results} from '../data/results';
import {subjects} from '../data/subjects';
import {Student} from '../types/models';
import {loadStudent} from '../services/storage';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigationTypes';
import Ionicons from '@react-native-vector-icons/ionicons';

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [student, setStudent] = useState<Student>(initialStudent);
  useFocusEffect(useCallback(() => {
    let active = true;
    loadStudent(initialStudent)
      .then(value => {
        if (active) setStudent(value);
      })
      .catch(() => {
        if (active) setStudent(initialStudent);
      });
    return () => {
      active = false;
    };
  }, []));
  return <ScreenContainer><FlatList data={results} keyExtractor={item => item.id} contentContainerStyle={styles.content} ListHeaderComponent={<><Text style={styles.heading}>Cá nhân</Text><View style={styles.profile}><View style={styles.avatar}><Text style={styles.avatarText}>{student.fullName.charAt(0)}</Text></View><Text style={styles.name}>{student.fullName}</Text><Text style={styles.code}>{student.studentCode}</Text><Text style={styles.muted}>{student.className} · {student.major}</Text><View style={styles.contact}><Text style={styles.info}><Ionicons name="mail-outline" size={15} color={colors.primary} />  {student.email}</Text><Text style={styles.info}><Ionicons name="call-outline" size={15} color={colors.primary} />  {student.phone}</Text></View><Pressable style={styles.button} onPress={() => navigation.navigate('EditProfile')}><Ionicons name="create-outline" size={17} color={colors.surface} /><Text style={styles.buttonText}>  Chỉnh sửa thông tin</Text></Pressable></View><Text style={styles.section}>Kết quả học tập</Text></>} renderItem={({item}) => <Pressable style={styles.result} onPress={() => navigation.navigate('AcademicResultDetail', {resultId: item.id})}><View style={styles.resultIcon}><Ionicons name="ribbon-outline" size={20} color={colors.primary} /></View><View style={{flex: 1}}><Text style={styles.resultName}>{subjects.find(subject => subject.id === item.subjectId)?.name}</Text><Text style={styles.muted}>{item.semester} · Điểm {item.finalScore} ({item.letterGrade})</Text></View><Ionicons name="chevron-forward" size={20} color={colors.tabInactive} /></Pressable>} ListEmptyComponent={<Text style={styles.muted}>Chưa có kết quả học tập.</Text>} /></ScreenContainer>;
}
const styles = StyleSheet.create({content: {padding: spacing.lg}, heading: {fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: spacing.lg}, profile: {backgroundColor: colors.surface, padding: spacing.xl, borderRadius: 18, borderWidth: 1, borderColor: colors.border, alignItems: 'center'}, avatar: {width: 72, height: 72, borderRadius: 36, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center'}, avatarText: {color: colors.primary, fontSize: 28, fontWeight: '800'}, name: {fontSize: 21, color: colors.text, fontWeight: '800', marginTop: spacing.md}, code: {color: colors.primary, fontWeight: '700', marginTop: 5}, muted: {color: colors.mutedText, marginTop: 6, textAlign: 'center'}, contact: {width: '100%', marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm}, info: {color: colors.text, marginTop: spacing.sm}, button: {backgroundColor: colors.primary, padding: spacing.md, borderRadius: 10, marginTop: spacing.lg, flexDirection: 'row', alignItems: 'center'}, buttonText: {color: colors.surface, fontWeight: '700'}, section: {fontSize: 18, fontWeight: '800', color: colors.text, marginTop: spacing.xl, marginBottom: spacing.md}, result: {backgroundColor: colors.surface, borderRadius: 14, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center'}, resultIcon: {width: 40, height: 40, borderRadius: 12, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md}, resultName: {fontWeight: '700', color: colors.text}});
