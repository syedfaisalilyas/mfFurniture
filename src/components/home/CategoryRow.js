import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const CATEGORY_ICONS = {
  c1: 'home-outline',
  c2: 'bed-outline',
  c3: 'restaurant-outline',
  c4: 'laptop-outline',
  c5: 'leaf-outline',
};

export default function CategoryRow({ categories, selectedId, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      <TouchableOpacity
        style={[styles.chip, !selectedId && styles.chipActive]}
        onPress={() => onSelect(null)}
      >
        <Ionicons
          name="grid-outline"
          size={18}
          color={!selectedId ? colors.white : colors.textSecondary}
        />
        <Text style={[styles.label, !selectedId && styles.labelActive]}>All</Text>
      </TouchableOpacity>
      {categories.map((cat) => {
        const active = selectedId === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(cat.id)}
          >
            <Ionicons
              name={CATEGORY_ICONS[cat.id] || 'cube-outline'}
              size={18}
              color={active ? colors.white : colors.textSecondary}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{cat.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginLeft: 6,
    fontWeight: typography.weights.medium,
  },
  labelActive: { color: colors.white },
});
