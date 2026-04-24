import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeClosed } from 'lucide-react-native';
import Checkbox from 'expo-checkbox';
import { useAuthStore } from '../../features/auth/store/auth';
import { Logo } from '../../features/home/components/logo';
import { useTheme } from '../../features/common/hooks/useTheme';

interface FormValues {
    email: string;
    password: string;
}

export const LoginScreen: React.FC = () => {

    const { login, isAuthenticated, setUser } = useAuthStore();
    const [isChecked, setChecked] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const { colors } = useTheme();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
        watch
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    })

    const handleLogin = () => {
        const email = getValues('email');
        setUser({
            email,
            username: email.includes('@') ? email.split('@')[0] : email,
            uid: '',
            role: 'USER_ROLE',
            status: true,
            google: false,
        });
        router.navigate('/onboarding');
        reset()
    };

    const handleBack = () => {
        router.navigate('/(tabs)/home');
    }

    useEffect(() => {
        if (isAuthenticated) {
            router.navigate('/(tabs)/home');
            reset();
        }
    }, [isAuthenticated]);

    // const isDisabled = !watch('email') || !watch('password') || watch('password').length < 6 || !isChecked || Object.keys(errors).length > 0;

    const errorMessages = Object.entries(errors).map(([fieldName, errorObj]) => {
        if (errorObj?.message) {
            return errorObj.message;
        }
        return null;
    }).filter(Boolean);

    return (
        <View className=" w-full flex-1 justify-center items-center px-2" style={{ backgroundColor: colors.background }}>

            <View className='flex flex-col justify-center items-center w-full rounded-3xl py-5 px-3'>
                <View className='w-full h-auto flex flex-col justify-center items-center px-2 mb-16' style={{ backgroundColor: colors.background }}>
                    <Logo />
                    <Text style={{ color: colors.textPrimary }} className='w-36 py-1.5 rounded-full text-2xl font-bold text-center'>Inicia sesión</Text>
                </View>

                <View className='w-full flex flex-col px-3 mb-4'>
                    <Text style={{ color: colors.textTertiary }} className='text-left pb-1'>Correo electrónico</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: "El correo es obligatorio",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Ingrese un correo válido",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={colors.textTertiary}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={{ backgroundColor: colors.card, color: colors.textPrimary, borderColor: errors.email ? '#ef4444' : colors.border }}
                                className={`px-4 py-3 rounded-lg border text-base`}
                            />
                        )}
                        name="email"
                    />
                    {
                        errors.email &&
                        <Text className="text-red-500">{errors.email.message}</Text>
                    }
                </View>

                <View className='w-full flex flex-col px-3 mb-4'>
                    <Text style={{ color: colors.textTertiary }} className='text-left pb-1'>Contraseña</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className='relative'>
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor={colors.textTertiary}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={isShow}
                                    style={{ backgroundColor: colors.card, color: colors.textPrimary, borderColor: errors.password ? '#ef4444' : colors.border }}
                                    className={`w-full px-4 py-3 rounded-lg border text-base`}
                                />
                                {
                                    isShow ?
                                        <TouchableOpacity className='absolute right-4 top-4' onPress={() => setIsShow(false)}>
                                            <Eye className='w-5 h-5' color={colors.textTertiary} size={24} strokeWidth={1} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity className='absolute right-4 top-4' onPress={() => setIsShow(true)}>
                                            <EyeClosed className='w-5 h-5' color={colors.textTertiary} size={24} strokeWidth={1} />
                                        </TouchableOpacity>
                                }
                            </View>
                        )}
                        name="password"
                    />
                    {
                        errors.password &&
                        <Text className="text-red-500">{errors.password.message}</Text>
                    }
                </View>

                <View className='w-full px-4 flex flex-row items-center justify-between '>
                    <View className='flex flex-row items-center'>
                        <Checkbox
                            className='p-2 rounded-md'
                            style={{ borderColor: colors.textTertiary }}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? colors.primary : undefined}
                        />
                        <Text style={{ color: colors.textTertiary }} className="text-sm font-semibold pl-1"
                            onPress={() => setChecked(!isChecked)}
                        >
                            Recordarme
                        </Text>
                    </View>
                    <Link
                        href={'/auth/forgot-password'}
                        style={{ borderBottomColor: colors.textTertiary, borderBottomWidth: 1 }}
                    >
                        <Text style={{ color: colors.textTertiary }} className="text-sm font-semibold mt-5">
                            Olvidaste tu contraseña
                        </Text>
                    </Link>
                </View>

                <View className='w-full flex flex-col px-3 mt-16'>
                    <TouchableOpacity
                        className={`
                            bg-primary w-full p-4 rounded-lg items-center
                            transition-opacity duration-200
                          `}
                        onPress={handleSubmit(handleLogin)}
                    >
                        <Text
                            className='text-black font-semibold text-sm'
                        >INICIA SESIÓN</Text>
                    </TouchableOpacity>
                </View>

                <View className='flex flex-col items-center px-3 pt-3'>
                    <View className='flex flex-row justify-center items-center '>
                        <Text style={{ color: colors.textTertiary }} className="text-sm font-bold ">
                            ¿No tienes una cuenta?{" "}
                        </Text>
                        <Link
                            href={'/auth/register'}
                            style={{ borderBottomColor: colors.textTertiary, borderBottomWidth: 1 }}
                        >
                            <Text style={{ color: colors.textTertiary }} className="text-sm font-bold ">
                                Registrate aquí
                            </Text>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
};