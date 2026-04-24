import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../../src/features/common/hooks/useTheme';

interface EarnRow {
  id: string;
  iconBg: string;
  iconText: string;
  iconColor: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
}

interface Movement {
  id: string;
  title: string;
  date: string;
  amount: string;
}

export default function Koinks() {
  const { colors } = useTheme();

  const earnRows = (c: typeof colors): EarnRow[] => [
    {
      id: '1',
      iconBg: c.successBg,
      iconText: '→',
      iconColor: c.successText,
      title: 'Realiza un cambio',
      subtitle: '+50 K por operación',
      badge: '+50 K',
      badgeBg: c.successBg,
      badgeText: c.successText,
    },
    {
      id: '2',
      iconBg: c.infoBg,
      iconText: '👤',
      iconColor: c.infoText,
      title: 'Invita un amigo',
      subtitle: '+200 K por referido',
      badge: '+200 K',
      badgeBg: c.infoBg,
      badgeText: c.infoText,
    },
    {
      id: '3',
      iconBg: c.warningBg,
      iconText: '★',
      iconColor: c.warningText,
      title: 'Completa tu perfil',
      subtitle: '+100 K una sola vez',
      badge: '+100 K',
      badgeBg: c.warningBg,
      badgeText: c.warningText,
    },
  ];

  const movements: Movement[] = [
    { id: '1', title: 'Cambio realizado', date: 'Hoy', amount: '+50 K' },
    { id: '2', title: 'Bono bienvenida', date: 'Hace 3 días', amount: '+500 K' },
  ];

  const rows = earnRows(colors);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.headerBg }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.headerBg,
          alignItems: 'center',
          paddingTop: 24,
          paddingBottom: 28,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 24 }}>⏱</Text>
        </View>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Mis Koinks</Text>
        <Text style={{ fontSize: 32, fontWeight: '500', color: '#fff' }}>1,250 K</Text>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
          ≈ S/ 12.50 en beneficios
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 14 }}
      >
        {/* Stats grid */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: 10,
              padding: 12,
              borderWidth: 0.5,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 11, color: colors.textTertiary, marginBottom: 4 }}>Este mes</Text>
            <Text style={{ fontSize: 18, fontWeight: '500', color: colors.textPrimary }}>+320 K</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: 10,
              padding: 12,
              borderWidth: 0.5,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 11, color: colors.textTertiary, marginBottom: 4 }}>Nivel</Text>
            <Text style={{ fontSize: 18, fontWeight: '500', color: colors.primary }}>Plata</Text>
          </View>
        </View>

        {/* Cómo ganar más */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: '500',
            color: colors.textTertiary,
            letterSpacing: 0.5,
            marginBottom: 8,
          }}
        >
          CÓMO GANAR MÁS
        </Text>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            borderWidth: 0.5,
            borderColor: colors.border,
            marginBottom: 16,
          }}
        >
          {rows.map((row, idx) => (
            <View
              key={row.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: 12,
                paddingHorizontal: 14,
                borderBottomWidth: idx < rows.length - 1 ? 0.5 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: row.iconBg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: row.iconColor, fontSize: 14 }}>{row.iconText}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textPrimary }}>
                  {row.title}
                </Text>
                <Text style={{ fontSize: 11, color: colors.textTertiary }}>{row.subtitle}</Text>
              </View>
              <View
                style={{
                  backgroundColor: row.badgeBg,
                  borderRadius: 20,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: '500', color: row.badgeText }}>{row.badge}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Últimos movimientos */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: '500',
            color: colors.textTertiary,
            letterSpacing: 0.5,
            marginBottom: 8,
          }}
        >
          ÚLTIMOS MOVIMIENTOS
        </Text>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            borderWidth: 0.5,
            borderColor: colors.border,
          }}
        >
          {movements.map((mov, idx) => (
            <View
              key={mov.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                paddingHorizontal: 14,
                borderBottomWidth: idx < movements.length - 1 ? 0.5 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, color: colors.textPrimary }}>{mov.title}</Text>
                <Text style={{ fontSize: 11, color: colors.textTertiary }}>{mov.date}</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: '500', color: colors.successText }}>{mov.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
