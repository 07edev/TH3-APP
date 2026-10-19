import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './navigationTypes';
import {MainTabNavigator} from './MainTabNavigator';
import {SubjectDetailScreen} from '../screens/SubjectDetailScreen';
import {ScheduleDetailScreen} from '../screens/ScheduleDetailScreen';
import {AssignmentDetailScreen} from '../screens/AssignmentDetailScreen';
import {AcademicResultDetailScreen} from '../screens/AcademicResultDetailScreen';
import {EditProfileScreen} from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{headerShown: false}} />
      <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} options={{title: 'Chi tiết môn học'}} />
      <Stack.Screen name="ScheduleDetail" component={ScheduleDetailScreen} options={{title: 'Chi tiết buổi học'}} />
      <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} options={{title: 'Chi tiết bài tập'}} />
      <Stack.Screen name="AcademicResultDetail" component={AcademicResultDetailScreen} options={{title: 'Chi tiết kết quả'}} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{title: 'Chỉnh sửa cá nhân'}} />
    </Stack.Navigator>
  </NavigationContainer>;
}
