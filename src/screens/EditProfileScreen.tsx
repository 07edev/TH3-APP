import React, {useEffect, useState} from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, Text, TextInput} from 'react-native';
import {RootScreenProps} from '../navigation/navigationTypes';
import {initialStudent} from '../data/student';
import {loadStudent, saveStudent} from '../services/storage';
import {Student} from '../types/models';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {ScreenContainer} from '../components/ScreenContainer';

export function EditProfileScreen({navigation}: RootScreenProps<'EditProfile'>) {
  const [student, setStudent] = useState<Student>(initialStudent);
  useEffect(() => {loadStudent(initialStudent).then(setStudent).catch(() => setStudent(initialStudent));}, []);
  const update = (key: 'fullName' | 'email' | 'phone', value: string) => setStudent(current => ({...current, [key]: value}));
  const save = () => {if (!student.fullName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email) || !/^\d{9,11}$/.test(student.phone)) {Alert.alert('Dữ liệu chưa hợp lệ', 'Vui lòng kiểm tra họ tên, email và số điện thoại.'); return;} saveStudent(student).then(() => {Alert.alert('Thành công', 'Thông tin đã được cập nhật.'); navigation.goBack();}).catch(() => Alert.alert('Lỗi', 'Không thể lưu thông tin.'));};
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content}><Text style={styles.label}>Họ tên</Text><TextInput value={student.fullName} onChangeText={value => update('fullName', value)} style={styles.input} /><Text style={styles.label}>Email</Text><TextInput value={student.email} onChangeText={value => update('email', value)} keyboardType="email-address" autoCapitalize="none" style={styles.input} /><Text style={styles.label}>Số điện thoại</Text><TextInput value={student.phone} onChangeText={value => update('phone', value)} keyboardType="phone-pad" style={styles.input} /><Pressable style={styles.button} onPress={save}><Text style={styles.buttonText}>Lưu thay đổi</Text></Pressable></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({content: {padding: spacing.lg}, label: {fontWeight: '800', color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm}, input: {backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 10, padding: spacing.md, color: colors.text}, button: {backgroundColor: colors.primary, padding: spacing.lg, borderRadius: 10, alignItems: 'center', marginTop: spacing.xl}, buttonText: {color: colors.surface, fontWeight: '800'}});
