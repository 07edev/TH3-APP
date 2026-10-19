import React, {useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenContainer} from '../components/ScreenContainer';
import {EmptyState} from '../components/EmptyState';
import {schedules} from '../data/schedules';
import {subjects} from '../data/subjects';
import {initialAssignments} from '../data/assignments';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {RootStackParamList, TabParamList} from '../navigation/navigationTypes';

type Props = BottomTabScreenProps<TabParamList, 'Schedule'>;

type CalendarDay = {
  label: string;
  date: string;
  day: string;
  hasEvents: boolean;
};

function formatSelectedDate(date: string) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createCalendarDays(month: Date): CalendarDay[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const dayCount = new Date(year, monthIndex + 1, 0).getDate();
  const labels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return Array.from({length: dayCount}, (_, index) => {
    const date = new Date(year, monthIndex, index + 1);
    const dateKey = toDateKey(date);
    return {
      label: labels[date.getDay()],
      date: String(index + 1),
      day: dateKey,
      hasEvents:
        schedules.some(item => item.date === dateKey) ||
        initialAssignments.some(item => item.dueDate.slice(0, 10) === dateKey),
    };
  });
}

function formatMonth(month: Date) {
  return `Tháng ${month.getMonth() + 1}/${month.getFullYear()}`;
}

export function ScheduleScreen({}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [displayMonth, setDisplayMonth] = useState(new Date(2026, 9, 1));
  const [selectedDate, setSelectedDate] = useState('2026-10-19');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const calendarDays = useMemo(() => createCalendarDays(displayMonth), [displayMonth]);
  const selectedDay = calendarDays.find(item => item.day === selectedDate);

  const daySchedules = useMemo(
    () => schedules.filter(item => item.date === selectedDate),
    [selectedDate],
  );
  const dayAssignments = useMemo(
    () =>
      initialAssignments.filter(
        item => item.dueDate.slice(0, 10) === selectedDate,
      ),
    [selectedDate],
  );
  const filteredSchedules = daySchedules.filter(item => {
    const subject = subjects.find(value => value.id === item.subjectId);
    return `${subject?.name ?? ''} ${subject?.code ?? ''} ${item.room}`
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });
  const filteredAssignments = dayAssignments.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const changeMonth = (offset: number) => {
    const nextMonth = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth() + offset,
      1,
    );
    setDisplayMonth(nextMonth);
    setSelectedDate(toDateKey(nextMonth));
    setSearchText('');
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable
          style={styles.headerIcon}
          onPress={() => {
            if (navigation.canGoBack()) navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={25} color={colors.surface} />
        </Pressable>
        <Text style={styles.headerTitle}>Thời khóa biểu</Text>
        <Pressable style={styles.headerIcon} onPress={() => setSearchVisible(value => !value)}>
          <Ionicons name="search-outline" size={25} color={colors.surface} />
        </Pressable>
      </View>

      <View style={styles.calendarPanel}>
        <View style={styles.monthRow}>
          <Pressable style={styles.monthButton} onPress={() => setSearchVisible(value => !value)}>
            <Ionicons name="funnel-outline" size={24} color={colors.text} />
          </Pressable>
          <View style={styles.monthTitleRow}>
            <Pressable onPress={() => changeMonth(-1)}>
              <Ionicons name="chevron-back" size={21} color={colors.mutedText} />
            </Pressable>
            <Pressable onPress={() => setDisplayMonth(new Date(2026, 9, 1))}>
              <Text style={styles.monthTitle}>{formatMonth(displayMonth)}</Text>
            </Pressable>
            <Pressable onPress={() => changeMonth(1)}>
              <Ionicons name="chevron-forward" size={21} color={colors.mutedText} />
            </Pressable>
          </View>
          <Pressable
            style={styles.monthButton}
            onPress={() => {
              const today = new Date(2026, 9, 19);
              setDisplayMonth(new Date(today.getFullYear(), today.getMonth(), 1));
              setSelectedDate(toDateKey(today));
            }}>
            <Ionicons name="search-outline" size={27} color={colors.text} />
          </Pressable>
        </View>

        {searchVisible && (
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={19} color={colors.mutedText} />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Tìm môn học, phòng hoặc bài tập..."
              placeholderTextColor={colors.mutedText}
              style={styles.searchInput}
              autoFocus
            />
          </View>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}>
          {calendarDays.map(item => {
            const isSelected = item.day === selectedDate;
            return (
              <Pressable
                key={item.day}
                onPress={() => setSelectedDate(item.day)}
                style={styles.dayCell}>
                <Text style={styles.weekday}>{item.label}</Text>
                <View style={[styles.dateCircle, isSelected && styles.selectedDate]}>
                  <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                    {item.date}
                  </Text>
                  {item.hasEvents && (
                    <View style={styles.dots}>
                      <View style={[styles.dot, {backgroundColor: colors.secondary}]} />
                      <View style={[styles.dot, {backgroundColor: colors.primary}]} />
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
        <View style={styles.dragHandle} />
      </View>

      <View style={styles.contentHeader}>
        <View>
          <Text style={styles.todayTitle}>
            {selectedDate === '2026-10-19' ? 'Hôm nay, ' : ''}
            {formatSelectedDate(selectedDate)}
          </Text>
          <Text style={styles.eventCount}>
            {filteredSchedules.length + filteredAssignments.length} hoạt động trong ngày
          </Text>
        </View>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={27} color={colors.surface} />
        </Pressable>
      </View>

      <FlatList
        data={[
          ...filteredSchedules.map(item => ({type: 'schedule' as const, item})),
          ...filteredAssignments.map(item => ({type: 'assignment' as const, item})),
        ]}
        keyExtractor={item => `${item.type}-${item.item.id}`}
        contentContainerStyle={styles.list}
        renderItem={({item}) => {
          if (item.type === 'schedule') {
            const subject = subjects.find(value => value.id === item.item.subjectId);
            return (
              <Pressable
                style={[styles.eventCard, styles.classCard]}
                onPress={() =>
                  navigation.navigate('ScheduleDetail', {scheduleId: item.item.id})
                }>
                <View style={[styles.eventLine, {backgroundColor: colors.secondary}]} />
                <View style={styles.eventBody}>
                  <Text style={[styles.eventTitle, {color: colors.primaryDark}]}>
                    {subject?.name ?? 'Buổi học'}
                  </Text>
                  <Text style={styles.eventTime}>
                    {item.item.startTime} - {item.item.endTime}
                  </Text>
                  <Text style={styles.eventMeta}>
                    <Ionicons name="flag-outline" size={16} color={colors.primary} />{' '}
                    {item.item.room}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.mutedText} />
              </Pressable>
            );
          }

          return (
            <Pressable
              style={[styles.eventCard, styles.assignmentCard]}
              onPress={() =>
                navigation.navigate('AssignmentDetail', {assignmentId: item.item.id})
              }>
              <View style={[styles.eventLine, {backgroundColor: colors.primary}]} />
              <View style={styles.eventBody}>
                <Text style={[styles.eventTitle, {color: colors.primaryDark}]}>
                  {item.item.title}
                </Text>
                <Text style={styles.eventTime}>
                  Hạn nộp: {new Date(item.item.dueDate).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })} {formatSelectedDate(selectedDate)}
                </Text>
                <Text style={styles.eventMeta}>
                  <Ionicons name="flag-outline" size={16} color={colors.primary} />{' '}
                  Bài tập môn học
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.mutedText} />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <EmptyState message={`Không có lịch học vào ${selectedDay?.label ?? 'ngày này'}.`} />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 112,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {padding: 8},
  headerTitle: {color: colors.surface, fontSize: 25, fontWeight: '800'},
  calendarPanel: {
    backgroundColor: colors.surface,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  monthButton: {width: 40, alignItems: 'center'},
  monthTitleRow: {flexDirection: 'row', alignItems: 'center', gap: spacing.lg},
  monthTitle: {color: colors.primaryDark, fontSize: 23, fontWeight: '800'},
  searchBox: {flexDirection: 'row', alignItems: 'center', marginHorizontal: spacing.lg, marginTop: spacing.md, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.background},
  searchInput: {flex: 1, color: colors.text, paddingVertical: 10, paddingHorizontal: spacing.sm},
  daysRow: {paddingHorizontal: spacing.md, paddingTop: spacing.lg, gap: spacing.sm},
  dayCell: {width: 52, alignItems: 'center'},
  weekday: {fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8},
  dateCircle: {width: 48, height: 62, alignItems: 'center', justifyContent: 'center', borderRadius: 25},
  selectedDate: {backgroundColor: colors.primary},
  dateText: {fontSize: 20, color: '#737373', fontWeight: '500'},
  selectedDateText: {color: colors.surface, fontWeight: '800'},
  dots: {flexDirection: 'row', gap: 3, position: 'absolute', bottom: 6},
  dot: {width: 6, height: 6, borderRadius: 3},
  dragHandle: {width: 78, height: 5, backgroundColor: '#B5B5B5', borderRadius: 4, alignSelf: 'center', marginTop: spacing.md},
  contentHeader: {paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  todayTitle: {fontSize: 25, fontWeight: '800', color: colors.text},
  eventCount: {fontSize: 13, color: colors.mutedText, marginTop: 5},
  addButton: {width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center'},
  list: {paddingHorizontal: spacing.lg, paddingBottom: spacing.xl},
  eventCard: {borderRadius: 14, marginBottom: spacing.md, padding: spacing.lg, paddingLeft: spacing.md, flexDirection: 'row', alignItems: 'center', minHeight: 115},
  classCard: {backgroundColor: '#E0F2FE'},
  assignmentCard: {backgroundColor: '#EFF6FF'},
  eventLine: {width: 6, alignSelf: 'stretch', borderRadius: 4, marginRight: spacing.lg},
  eventBody: {flex: 1},
  eventTitle: {fontSize: 18, fontWeight: '800', lineHeight: 25},
  eventTime: {fontSize: 16, color: colors.text, marginTop: 10},
  eventMeta: {fontSize: 16, color: colors.text, marginTop: 9},
});
