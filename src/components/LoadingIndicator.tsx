import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const LoadingIndicator: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.primaryColor} />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default LoadingIndicator;
