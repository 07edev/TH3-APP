import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';

export function EmptyState({message}: {message: string}) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>∅</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', padding: 32},
  icon: {fontSize: 30, color: colors.mutedText, marginBottom: 8},
  text: {color: colors.mutedText, textAlign: 'center'},
});
