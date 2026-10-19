import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';

export function ScreenContainer({children}: PropsWithChildren) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
});
