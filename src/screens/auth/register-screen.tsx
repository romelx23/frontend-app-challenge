import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { User2, Eye, EyeClosed } from 'lucide-react-native';
import { useAuthStore } from '../../features/auth/store/auth';
import { Logo } from '../../features/home/components/logo';

interface FormValues {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export const RegisterScreen: React.FC = () => {

    const { isAuthenticated } = useAuthStore();
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirm, setIsShowConfirm] = useState(true);

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
            username: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'all'
    });

    const {
        register: registerUser,
    } = useAuthStore();

    const handleRegister = async () => {
        // Lógica para manejar el registro
        await registerUser(getValues('username'), getValues('email'), getValues('password'));
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.navigate('/onboarding');
            reset();
        }
    }, [isAuthenticated]);

    return (
        <View className=" w-full flex-1 justify-center items-center px-2 bg-white">
            <View className='w-full flex flex-col px-4 py-5'>
                <View className='w-full h-36 flex flex-row justify-center items-center rounded-full bg-white px-2 pt-1.5'>
                    <Logo />
                </View>

                <Text className='text-left text-[#686868]'>Correo electrónico</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingrese un correo válido",
                        },
                    }}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className={`w-full px-4 py-3 rounded-lg bg-white mb-4 border text-base
                                ${errors.email ? 'border-red-500' : 'border-[#E0E0E0]'}
                                `}
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && (
                    <Text className="text-red-500 mb-2 text-sm">{errors.email.message}</Text>
                )}

                <Text className='text-left text-[#686868]'>Nombre de Usuario</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "El nombre de usuario es obligatorio",
                        minLength: {
                            value: 3,
                            message: "El nombre de usuario debe tener al menos 3 caracteres",
                        },
                    }}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className={`w-full px-4 py-3 rounded-lg bg-white mb-4 border text-base
                                ${errors.username ? 'border-red-500' : 'border-[#E0E0E0]'}
                                `}
                            placeholder="Username"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.username && (
                    <Text className="text-red-500 mb-2 text-sm">{errors.username.message}</Text>
                )}

                <Text className='text-left text-[#686868]'>Contraseña</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "La contraseña es obligatoria",
                        minLength: {
                            value: 8,
                            message: 'La contraseña debe tener al menos 8 caracteres',
                        },
                    }}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className='relative mb-4'>
                            <TextInput
                                className={`w-full px-4 py-3 rounded-lg bg-white border text-base
                                    ${errors.password ? 'border-red-500' : 'border-[#E0E0E0]'}
                                    `}
                                placeholder="Password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={isShowPassword}
                            />
                            {
                                isShowPassword ?
                                    <TouchableOpacity className='absolute right-4 top-4' onPress={() => setIsShowPassword(false)}>
                                        <Eye className='w-5 h-5' color={"black"} size={24} strokeWidth={1} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity className='absolute right-4 top-4' onPress={() => setIsShowPassword(true)}>
                                        <EyeClosed className='w-5 h-5' color={"black"} size={24} strokeWidth={1} />
                                    </TouchableOpacity>
                            }
                        </View>
                    )}
                />
                {errors.password && (
                    <Text className="text-red-500 mb-2 text-sm">{errors.password.message}</Text>
                )}

                <Text className='text-left  text-[#686868]'>Confirme la contraseña</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "Debe confirmar la contraseña",
                        validate: (value) => {
                            if (value !== getValues('password')) {
                                return 'Las contraseñas no coinciden';
                            }
                            return true;
                        },
                    }}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className='relative mb-4'>
                            <TextInput
                                className={`w-full px-4 py-3 rounded-lg bg-white border text-base
                                    ${errors.confirmPassword ? 'border-red-500' : 'border-[#E0E0E0]'}
                                    `}
                                placeholder="Confirm Password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={isShowConfirm}
                            />
                            {
                                isShowConfirm ?
                                    <TouchableOpacity className='absolute right-4 top-4' onPress={() => setIsShowConfirm(false)}>
                                        <Eye className='w-5 h-5' color={"black"} size={24} strokeWidth={1} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity className='absolute right-4 top-4' onPress={() => setIsShowConfirm(true)}>
                                        <EyeClosed className='w-5 h-5' color={"black"} size={24} strokeWidth={1} />
                                    </TouchableOpacity>
                            }
                        </View>
                    )}
                />
                {errors.confirmPassword && (
                    <Text className="text-red-500 mb-2 text-sm">{errors.confirmPassword.message}</Text>
                )}

                <TouchableOpacity
                    onPress={handleSubmit(handleRegister)}
                    className="bg-primary w-full p-4 rounded-lg flex flex-row justify-center items-center"
                >
                    <User2 size={24} className="text-white mr-2" />
                    <Text className="text-white font-bold text-lg">Register</Text>
                </TouchableOpacity>

                <View className="mt-2 flex-row">
                    <Text className="text-gray-700 pr-1">¿tienes una cuenta? </Text>
                    <Link
                        href='/auth/login'
                        className="border-b border-[#686868]"
                    >
                        <Text className="text-[#686868] text-sm font-bold">Login</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};