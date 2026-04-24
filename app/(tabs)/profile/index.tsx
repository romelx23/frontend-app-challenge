import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Switch, SafeAreaView } from 'react-native';
import { Lock, Phone, MapPin, FileText, CheckCircle, Moon } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '../../../src/features/common/hooks/useTheme';
import { useAuthStore } from '../../../src/features/auth/store/auth';

const ProfileScreen = () => {
    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const user = useAuthStore((state) => state.user);

    const email = user?.email ?? 'usuario@ejemplo.com';
    const username = user?.username
        ? user.username
        : email.includes('@')
            ? email.split('@')[0]
            : 'Usuario';
    const initials = username.slice(0, 2).toUpperCase();

    const handleLogOut = () => {
        router.navigate("/auth/login")
    }

    const handleEditProfile = () => {
        // Navegar a editar perfil
    }

    const handleChangePassword = () => {
        // Navegar a cambiar contraseña
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.headerBg }}>
        <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[0]}>
            {/* Header con avatar */}
            <View style={{ backgroundColor: colors.headerBg, paddingTop: 24, paddingBottom: 64, paddingHorizontal: 24 }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{
                        width: 96, height: 96, borderRadius: 48,
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        alignItems: 'center', justifyContent: 'center',
                        marginBottom: 16,
                        borderWidth: 4, borderColor: 'rgba(255,255,255,0.4)',
                    }}>
                        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff' }}>{initials}</Text>
                    </View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>
                        {username}
                    </Text>
                    <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>
                        {email}
                    </Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4,
                    }}>
                        <CheckCircle size={14} color="#fff" />
                        <Text style={{ fontSize: 11, fontWeight: '600', color: '#fff', marginLeft: 6 }}>
                            Cuenta verificada
                        </Text>
                    </View>
                </View>
            </View>

            {/* Contenido principal */}
            <View style={{ backgroundColor: colors.background, flex: 1, marginTop: -24, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 }}>

                {/* INFORMACIÓN PERSONAL */}
                <Text style={{ color: colors.primary, fontSize: 11, fontWeight: 'bold', marginBottom: 12, letterSpacing: 0.5 }}>
                    INFORMACIÓN PERSONAL
                </Text>

                {[
                    { icon: <FileText size={18} color={colors.successText} />, label: 'DNI', value: '—', bg: colors.successBg },
                    { icon: <Phone size={18} color={colors.infoText} />, label: 'Teléfono', value: '—', bg: colors.infoBg },
                    { icon: <MapPin size={18} color={colors.warningText} />, label: 'Dirección', value: '—', bg: colors.warningBg },
                ].map((item, idx) => (
                    <View key={idx} style={{
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        padding: 14,
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        borderColor: colors.border,
                    }}>
                        <View style={{
                            width: 38, height: 38, borderRadius: 10,
                            backgroundColor: item.bg,
                            alignItems: 'center', justifyContent: 'center', marginRight: 12,
                        }}>
                            {item.icon}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 11, color: colors.textTertiary }}>{item.label}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{item.value}</Text>
                        </View>
                    </View>
                ))}

                {/* SEGURIDAD */}
                <Text style={{ color: colors.primary, fontSize: 11, fontWeight: 'bold', marginTop: 8, marginBottom: 12, letterSpacing: 0.5 }}>
                    SEGURIDAD
                </Text>
                <TouchableOpacity
                    onPress={handleChangePassword}
                    style={{
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        padding: 14,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        borderColor: colors.border,
                        marginBottom: 16,
                    }}
                >
                    <View style={{
                        width: 38, height: 38, borderRadius: 10,
                        backgroundColor: colors.successBg,
                        alignItems: 'center', justifyContent: 'center', marginRight: 12,
                    }}>
                        <Lock size={18} color={colors.successText} />
                    </View>
                    <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>
                        Cambiar contraseña
                    </Text>
                    <Text style={{ color: colors.textTertiary, fontSize: 18 }}>›</Text>
                </TouchableOpacity>

                {/* CONFIGURACIÓN */}
                <Text style={{ color: colors.primary, fontSize: 11, fontWeight: 'bold', marginBottom: 12, letterSpacing: 0.5 }}>
                    CONFIGURACIÓN
                </Text>
                <View style={{
                    backgroundColor: colors.card,
                    borderRadius: 12,
                    padding: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 0.5,
                    borderColor: colors.border,
                    marginBottom: 24,
                }}>
                    <View style={{
                        width: 38, height: 38, borderRadius: 10,
                        backgroundColor: isDarkMode ? colors.warningBg : colors.infoBg,
                        alignItems: 'center', justifyContent: 'center', marginRight: 12,
                    }}>
                        <Moon size={18} color={isDarkMode ? colors.warningText : colors.infoText} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>
                            Modo oscuro
                        </Text>
                        <Text style={{ fontSize: 11, color: colors.textTertiary }}>
                            {isDarkMode ? 'Activado' : 'Desactivado'}
                        </Text>
                    </View>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor="#fff"
                    />
                </View>

                {/* Botones de acción */}
                <TouchableOpacity
                    onPress={handleEditProfile}
                    style={{
                        backgroundColor: colors.primary,
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Editar perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogOut}
                    style={{
                        borderWidth: 1.5,
                        borderColor: colors.primary,
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginBottom: 24,
                    }}
                >
                    <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 15 }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;