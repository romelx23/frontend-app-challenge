import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/features/common/hooks/useTheme';

type FilterType = 'Todas' | 'Compra' | 'Venta';

interface Transaction {
  id: string;
  type: 'compra' | 'venta' | 'proceso';
  title: string;
  subtitle: string;
  amount: string;
  status: 'Completado' | 'En proceso';
}

interface TransactionGroup {
  label: string;
  items: Transaction[];
}

const mockData: TransactionGroup[] = [
  {
    label: 'HOY',
    items: [
      {
        id: '1',
        type: 'venta',
        title: 'Venta USD',
        subtitle: '10:32 AM · TC 3.70',
        amount: '+S/ 370',
        status: 'Completado',
      },
      {
        id: '2',
        type: 'compra',
        title: 'Compra USD',
        subtitle: '08:15 AM · TC 3.68',
        amount: '-S/ 184',
        status: 'Completado',
      },
    ],
  },
  {
    label: 'AYER',
    items: [
      {
        id: '3',
        type: 'venta',
        title: 'Venta USD',
        subtitle: '03:45 PM · TC 3.71',
        amount: '+S/ 742',
        status: 'Completado',
      },
      {
        id: '4',
        type: 'proceso',
        title: 'Compra USD',
        subtitle: '11:20 AM · TC 3.69',
        amount: '-S/ 92',
        status: 'En proceso',
      },
    ],
  },
];

export default function History() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<FilterType>('Todas');

  const filterBtns: FilterType[] = ['Todas', 'Compra', 'Venta'];

  const filteredData = mockData
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (filter === 'Todas') return true;
        if (filter === 'Compra') return item.type === 'compra';
        if (filter === 'Venta') return item.type === 'venta';
        return true;
      }),
    }))
    .filter((group) => group.items.length > 0);

  const getIconColors = (type: Transaction['type']) => {
    if (type === 'venta') return { bg: colors.successBg, text: colors.successText };
    if (type === 'compra') return { bg: colors.infoBg, text: colors.infoText };
    return { bg: colors.warningBg, text: colors.warningText };
  };

  const getAmountColor = (type: Transaction['type']) => {
    if (type === 'venta') return colors.successText;
    if (type === 'compra') return colors.dangerText;
    return colors.textSecondary;
  };

  const getBadgeColors = (status: Transaction['status'], type: Transaction['type']) => {
    if (status === 'Completado') return { bg: colors.successBg, text: colors.successText };
    return { bg: colors.warningBg, text: colors.warningText };
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.headerBg }}>
      {/* Header */}
      <View style={{ backgroundColor: colors.headerBg, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 14 }}>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#fff', marginBottom: 12 }}>
          Historial de operaciones
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {filterBtns.map((btn) => (
            <TouchableOpacity
              key={btn}
              onPress={() => setFilter(btn)}
              style={{
                backgroundColor: filter === btn ? '#fff' : 'rgba(255,255,255,0.2)',
                paddingHorizontal: 14,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '500',
                  color: filter === btn ? colors.successText : '#fff',
                }}
              >
                {btn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 14 }}
      >
        {filteredData.length === 0 && (
          <Text style={{ textAlign: 'center', color: colors.textTertiary, marginTop: 40, fontSize: 14 }}>
            No hay operaciones
          </Text>
        )}
        {filteredData.map((group) => (
          <View key={group.label} style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: colors.textTertiary,
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              {group.label}
            </Text>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: colors.border,
              }}
            >
              {group.items.map((item, idx) => {
                const iconC = getIconColors(item.type);
                const badgeC = getBadgeColors(item.status, item.type);
                const isLast = idx === group.items.length - 1;
                const arrow = item.type === 'venta' ? '→' : '←';
                return (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      padding: 12,
                      paddingHorizontal: 14,
                      borderBottomWidth: isLast ? 0 : 0.5,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: iconC.bg,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: iconC.text, fontWeight: '700', fontSize: 14 }}>{arrow}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textPrimary }}>
                        {item.title}
                      </Text>
                      <Text style={{ fontSize: 11, color: colors.textTertiary }}>{item.subtitle}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text
                        style={{ fontSize: 13, fontWeight: '500', color: getAmountColor(item.type) }}
                      >
                        {item.amount}
                      </Text>
                      <View
                        style={{
                          backgroundColor: badgeC.bg,
                          borderRadius: 20,
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          marginTop: 2,
                        }}
                      >
                        <Text style={{ fontSize: 10, fontWeight: '500', color: badgeC.text }}>
                          {item.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
