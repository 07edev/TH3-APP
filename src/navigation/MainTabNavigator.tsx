import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabParamList} from './navigationTypes';
import {OverviewScreen} from '../screens/OverviewScreen';
import {SubjectsScreen} from '../screens/SubjectsScreen';
import {ScheduleScreen} from '../screens/ScheduleScreen';
import {AssignmentsScreen} from '../screens/AssignmentsScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {colors} from '../theme/colors';
import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator<TabParamList>();

export function MainTabNavigator() {
  return <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.tabInactive, tabBarStyle: {height: 66, paddingTop: 7, paddingBottom: 8, borderTopColor: colors.border, backgroundColor: colors.surface}, tabBarLabelStyle: {fontSize: 11, fontWeight: '600'}}}>
    <Tab.Screen name="Overview" component={OverviewScreen} options={{title: 'Tổng quan', tabBarLabel: 'Tổng quan', tabBarIcon: ({color, size}) => <Ionicons name="grid-outline" color={color} size={size} />}} />
    <Tab.Screen name="Subjects" component={SubjectsScreen} options={{title: 'Môn học', tabBarLabel: 'Môn học', tabBarIcon: ({color, size}) => <Ionicons name="book-outline" color={color} size={size} />}} />
    <Tab.Screen name="Schedule" component={ScheduleScreen} options={{title: 'Lịch học', tabBarLabel: 'Lịch học', tabBarIcon: ({color, size}) => <Ionicons name="calendar-outline" color={color} size={size} />}} />
    <Tab.Screen name="Assignments" component={AssignmentsScreen} options={{title: 'Bài tập', tabBarLabel: 'Bài tập', tabBarIcon: ({color, size}) => <Ionicons name="checkbox-outline" color={color} size={size} />}} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{title: 'Cá nhân', tabBarLabel: 'Cá nhân', tabBarIcon: ({color, size}) => <Ionicons name="person-outline" color={color} size={size} />}} />
  </Tab.Navigator>;
}
