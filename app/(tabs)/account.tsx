import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../../src/features/common/hooks/useTheme';

const AccountRow = ({
  iconBg,
  icon,
  title,
  subtitle,
  value,
  isLast = false,
  colors,
}: {
  iconBg: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: string;
  isLast?: boolean;
  colors: ReturnType<typeof useTheme>['colors'];
}) => (
  <View
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
        backgroundColor: iconBg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textPrimary }}>{title}</Text>
      <Text style={{ fontSize: 11, color: colors.textTertiary }}>{subtitle}</Text>
    </View>
    <Text style={{ fontSize: 14, fontWeight: '500', color: colors.textPrimary }}>{value}</Text>
  </View>
);

export default function Account() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.headerBg }}>
      {/* Header */}
      <View style={{ backgroundColor: colors.headerBg, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 }}>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>Saldo total</Text>
        <Text style={{ fontSize: 28, fontWeight: '500', color: '#fff', marginBottom: 2 }}>S/ 3,240.50</Text>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>≈ $ 876.42 USD</Text>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 14 }}
      >
        {/* Mis cuentas */}
        <Text style={{ fontSize: 11, fontWeight: '500', color: colors.textTertiary, letterSpacing: 0.5, marginBottom: 8 }}>
          MIS CUENTAS
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
          <AccountRow
            iconBg={colors.successBg}
            icon={
              <Text style={{ fontSize: 16, color: colors.successText }}>S/</Text>
            }
            title="Cuenta soles"
            subtitle="**** 4821"
            value="S/ 2,140.50"
            colors={colors}
          />
          <AccountRow
            iconBg={colors.infoBg}
            icon={
              <Text style={{ fontSize: 13, fontWeight: '700', color: colors.infoText }}>$</Text>
            }
            title="Cuenta dólares"
            subtitle="**** 7703"
            value="$ 300.00"
            isLast
            colors={colors}
          />
        </View>

        {/* Última operación */}
        <Text style={{ fontSize: 11, fontWeight: '500', color: colors.textTertiary, letterSpacing: 0.5, marginBottom: 8 }}>
          ÚLTIMA OPERACIÓN
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: colors.successBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.successText, fontWeight: '700', fontSize: 12 }}>→</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textPrimary }}>Venta de dólares</Text>
              <Text style={{ fontSize: 11, color: colors.textTertiary }}>Hoy, 10:32 AM</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 13, fontWeight: '500', color: colors.successText }}>+S/ 370</Text>
              <View
                style={{
                  backgroundColor: colors.successBg,
                  borderRadius: 20,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  marginTop: 2,
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: '500', color: colors.successText }}>Completado</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Resumen */}
        <Text style={{ fontSize: 11, fontWeight: '500', color: colors.textTertiary, letterSpacing: 0.5, marginBottom: 8 }}>
          RESUMEN
        </Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 14,
              borderWidth: 0.5,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 11, color: colors.textTertiary, marginBottom: 4 }}>Operaciones</Text>
            <Text style={{ fontSize: 20, fontWeight: '500', color: colors.textPrimary }}>24</Text>
            <Text style={{ fontSize: 10, color: colors.textTertiary, marginTop: 2 }}>este mes</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 14,
              borderWidth: 0.5,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 11, color: colors.textTertiary, marginBottom: 4 }}>Nivel</Text>
            <Text style={{ fontSize: 20, fontWeight: '500', color: colors.primary }}>Plata</Text>
            <Text style={{ fontSize: 10, color: colors.textTertiary, marginTop: 2 }}>Kambista</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
