import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {AssignmentStatus} from '../types/models';

export function StatusBadge({status}: {status: AssignmentStatus}) {
  const completed = status === 'completed';
  return <View style={[styles.badge, {backgroundColor: completed ? '#DCFCE7' : '#FEF3C7'}]}>
    <Text style={{color: completed ? colors.success : colors.warning}}>
      {completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
    </Text>
  </View>;
}

const styles = StyleSheet.create({
  badge: {alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5},
});
