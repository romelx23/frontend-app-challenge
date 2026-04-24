import { Tabs } from 'expo-router';
import { User } from 'lucide-react-native';
import { useAuthStore } from '../../src/features/auth/store/auth';
import { StartIcon } from '../../src/features/common/icons/start-icon';
import { CreditCardIcon } from '../../src/features/common/icons/credit-card';
import { HistoryIcon } from '../../src/features/common/icons/history';
import { KkoinIcon } from '../../src/features/common/icons/kkoins';
import { useTheme } from '../../src/features/common/hooks/useTheme';
import { useEffect } from 'react';
import { useThemeStore } from '../../src/features/common/store/theme';

export default function TabLayout() {

    const { user } = useAuthStore();
    const { colors, isDarkMode } = useTheme();
    const { loadTheme } = useThemeStore();

    useEffect(() => {
        loadTheme();
    }, []);

    const activeColor = colors.primary;
    const inactiveColor = isDarkMode ? '#9ca3af' : '#6b7280';

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: colors.tabBar,
                    borderTopColor: colors.tabBarBorder,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: isDarkMode ? 0.4 : 0.08,
                    shadowRadius: 10,
                },
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
            }}

        >
            <Tabs.Screen name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <StartIcon isFocused={focused} color={focused ? activeColor : inactiveColor} />,
                    tabBarLabel: "Inicio"
                }}
            />
            <Tabs.Screen name="account"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <CreditCardIcon isFocused={focused} color={focused ? activeColor : inactiveColor} />,
                    tabBarLabel: "Cuentas"
                }}
            />
            <Tabs.Screen name="history"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <HistoryIcon isFocused={focused} color={focused ? activeColor : inactiveColor} />,
                    tabBarLabel: "Historial"
                }}
            />
            <Tabs.Screen name="koinks"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <KkoinIcon isFocused={focused} color={focused ? activeColor : inactiveColor} />,
                    tabBarLabel: "Koinks"
                }}
            />

            <Tabs.Screen name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <User size={24} color={focused ? activeColor : inactiveColor} />
                    ),
                    tabBarLabel: "Perfil"
                }}
            />
        </Tabs>
    );
}
