import { Link, router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { serverApi } from '../../src/api/config';
import { Logo } from '../../src/features/home/components/logo';
interface FormValues {
    email: string;
}
export default function Page() {
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
        }
    })

    const handleForgotPassword = async () => {
        try {
            // Handle forgot password logic here
            // call endpoint for recover password
            const resp = await serverApi.post('/auth/recover', {
                email: watch('email')
            });
            router.navigate('/auth/login');
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleBack = () => {
        router.navigate('/(tabs)/home');
    }

    return (
        <View className="w-full flex-1 justify-center items-center px-2 bg-white">
            <View className='w-full flex flex-col px-4 py-5 rounded-3xl'>
                <View className='w-full h-36 flex flex-row justify-center items-center rounded-full bg-white px-2 py-1.5 mb-3'>
                    <Logo />
                </View>



                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            className="w-full px-4 py-3 rounded-lg bg-white mb-4 border border-[#E0E0E0] text-base"
                        />
                    )}
                    name="email"
                />

                <View className='w-full flex flex-col pl-4'>
                    {errors.email && <Text className='text-red-500 text-sm'>*El Email es requerido</Text>}
                </View>

                <TouchableOpacity
                    className='bg-primary p-4 rounded-xl w-full mb-3'
                    onPress={handleSubmit(handleForgotPassword)}
                >
                    <Text className="text-white text-center font-bold">
                        Enviar
                    </Text>
                </TouchableOpacity>

                <View className='px-1 w-full flex flex-col items-start'>
                    <Link
                        href={'/auth/login'}
                        className='border-b border-[#686868]'
                    >
                        <Text className="text-[#686868] text-sm font-bold mt-5">
                            Recordé mi contraseña
                        </Text>
                    </Link>
                </View>

            </View>
        </View>
    );
}