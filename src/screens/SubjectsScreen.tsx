import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {ScreenContainer} from '../components/ScreenContainer';
import {SubjectCard} from '../components/Cards';
import {EmptyState} from '../components/EmptyState';
import {subjects} from '../data/subjects';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../navigation/navigationTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigationTypes';

export function SubjectsScreen({}: BottomTabScreenProps<TabParamList, 'Subjects'>) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => subjects.filter(item => `${item.name} ${item.code}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <ScreenContainer><Text style={styles.heading}>Môn học</Text><Text style={styles.subtitle}>{filtered.length} môn học trong học kỳ hiện tại</Text><View style={styles.search}><Ionicons name="search-outline" size={20} color={colors.mutedText} /><TextInput value={query} onChangeText={setQuery} placeholder="Tìm theo tên hoặc mã môn..." style={styles.input} /></View>
    <FlatList data={filtered} contentContainerStyle={styles.list} keyExtractor={item => item.id} renderItem={({item}) => <SubjectCard subject={item} onPress={() => navigation.navigate('SubjectDetail', {subjectId: item.id})} />} ListEmptyComponent={<EmptyState message="Không tìm thấy môn học phù hợp." />} />
  </ScreenContainer>;
}
const styles = StyleSheet.create({heading: {fontSize: 26, fontWeight: '800', color: colors.text, paddingHorizontal: spacing.lg, paddingTop: spacing.lg}, subtitle: {color: colors.mutedText, marginHorizontal: spacing.lg, marginTop: 5, marginBottom: spacing.lg}, search: {flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 12, marginHorizontal: spacing.lg, paddingHorizontal: spacing.md}, input: {flex: 1, paddingVertical: 12, paddingHorizontal: spacing.sm, color: colors.text}, list: {padding: spacing.lg}});
