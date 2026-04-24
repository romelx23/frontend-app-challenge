import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '../src/features/auth/store/auth';
// import phoneKambito from "../assets/phone.png";
const phoneKambito = require("../assets/phone.png");

type IDocumentType = 'DNI' | 'Pasaporte';

interface FormValues {
    firstName: string,
    lastName: string,
    documentType: IDocumentType,
    documentNumber: string,
    phoneNumber: string,
    birthDate: Date,
    acceptTerms: boolean,
    previousExchangePlatform: string
}

const ProfileCompletedScreen = () => {
    const user = useAuthStore((state) => state.user);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            documentType: 'DNI',
            documentNumber: '',
            phoneNumber: '',
            acceptTerms: true,
            // birthDate: `${ new Date().getDate() }/${ new Date().getMonth() + 1 }/${ new Date().getFullYear() }`,
            birthDate: new Date(),
            previousExchangePlatform: ''
        }
    })

    const handleRegister = () => {
        router.navigate("/(tabs)/home")
    }

    return (
        <View className='w-full flex-1 flex flex-col  justify-center items-center bg-white p-3'>
            <View className='w-full flex flex-row justify-center items-center pb-3'>
                <Text className='text-black text-xl font-bold'>
                    Perfil creado con éxito
                </Text>
            </View>
            <View className='w-full flex flex-col justify-center items-center flex-1 pt-0'>
                <View className='w-full flex flex-col'>
                    <View className='w-full flex flex-row justify-center items-center py-6 pt-12'>
                        <Image
                            source={phoneKambito}
                            className='w-32 h-44'
                            resizeMode='contain'
                        />
                    </View>
                    <Text className='w-full mx-auto max-w-[300px] text-2xl text-center py-2 font-bold'>
                        ¡Felicitaciones {user?.username}, tu perfil ha sido creado!
                    </Text>
                    <Text className='w-full mx-auto max-w-[250px] text-base text-center py-2'>
                        Ya puedes empezar a kambiar con la mejor tasa del mercado
                    </Text>
                </View>

                <View className='w-full flex flex-col px-3 mt-16'>
                    <TouchableOpacity
                        className={`
                                    bg-primary w-full p-4 rounded-lg items-center
                                    transition-opacity duration-200
                                    `}
                        onPress={handleSubmit(handleRegister)}
                    >
                        <Text
                            className='text-black font-semibold text-sm'
                        >CONTNUAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ProfileCompletedScreen;