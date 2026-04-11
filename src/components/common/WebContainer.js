import React from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { colors } from '../../constants/colors';

/**
 * On web, centres content in a max-width container with a sidebar background.
 * On native, renders children as-is.
 */
export default function WebContainer({ children, style }) {
  const { width } = useWindowDimensions();

  if (Platform.OS !== 'web') {
    return <View style={[{ flex: 1 }, style]}>{children}</View>;
  }

  const isWide = width >= 768;

  return (
    <View style={styles.webOuter}>
      <View style={[styles.webInner, isWide && styles.webInnerWide, style]}>
        {children}
      </View>
    </View>
  );
}

export function useIsWideScreen() {
  const { width } = useWindowDimensions();
  return Platform.OS === 'web' && width >= 768;
}

const styles = StyleSheet.create({
  webOuter: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  webInner: {
    flex: 1,
    width: '100%',
  },
  webInnerWide: {
    maxWidth: 480,  // keep mobile feel but centred on desktop
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
  },
});
