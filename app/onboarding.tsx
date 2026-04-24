import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ChevronLeft, Info, LogOut } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { GlobalErrorBottomSheet } from '../src/features/common/components/global-error-bottom-sheet';

type IDocumentType = 'DNI' | 'Pasaporte';

interface FormValues {
    firstName: string,
    lastName: string,
    documentType: IDocumentType,
    documentNumber: string,
    phoneNumber: string,
    birthDate: Date,
    acceptTerms: boolean,
    acceptPolicy: boolean,
    previousExchangePlatform: string
}

const OnBoardingScreen = () => {

    // const [open, setOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [documentNumberError, setDocumentNumberError] = useState(false)

    const documents = [
        {
            label: 'DNI',
            value: 'DNI',
            min: 8,
            max: 8
        },
        {
            label: 'Pasaporte',
            value: 'Pasaporte',
            min: 9,
            max: 9
        },
        {
            label: 'CE',
            value: 'CE',
            min: 8,
            max: 15
        }
    ]

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
        watch,
        setError
    } = useForm<FormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            documentType: 'DNI',
            documentNumber: '',
            phoneNumber: '',
            acceptTerms: false,
            acceptPolicy: false,
            // birthDate: `${ new Date().getDate() }/${ new Date().getMonth() + 1 }/${ new Date().getFullYear() }`,
            birthDate: new Date(),
            previousExchangePlatform: ''
        },
        mode: 'onBlur'
    })

    const handleRegister = () => {

        if (watch('documentNumber') === "11122233") {
            // duplicate documentNumber
            setDocumentNumberError(true)
            return;
        }

        router.push("profile-completed")
        reset();
    }

    const handleLogOut = () => {
        router.navigate("/auth/login")
    }

    const documentType = watch('documentType');

    const isDisabled = !watch('firstName') || !watch('documentType') || !watch('documentNumber') || !watch('phoneNumber') || !watch('birthDate') || !watch('acceptTerms') || !watch('acceptPolicy') || Object.keys(errors).length > 0;

    const errorMessages = Object.entries(errors).map(([fieldName, errorObj]) => {
        if (errorObj?.message) {
            return errorObj.message;
        }
        return null;
    }).filter(Boolean); // Quitamos nulos

    return (
        <View className='w-full flex-1 flex flex-col  justify-center items-center bg-white'>
            <View className='w-full flex flex-row justify-between items-center pt-4 pb-3 px-6'>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft color={"black"} size={24} strokeWidth={1} />
                </TouchableOpacity>
                <Text className='text-black text-xl font-bold'>
                    Completa tus datos
                </Text>
                <TouchableOpacity
                    onPress={handleLogOut}
                >
                    <LogOut color={"black"} size={24} strokeWidth={1} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View className='w-full flex-1 pt-5 pb-5 px-6'>
                    <Text className='w-full mx-auto max-w-[250px] text-base text-center py-2'>
                        Complete tus datos{" "}
                        <Text className='font-bold'>
                            como figuran en tu documento de identidad
                        </Text>
                    </Text>

                    <View className='w-full flex flex-col mb-4'>
                        <Text className='text-[#686868] text-sm font-semibold mt-5 '>
                            Nombres completos
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: "Este campo es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Debe tener al menos 3 caracteres",
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Escribe tus nombres y apellidos"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    className={`px-4 py-3 rounded-lg bg-white border text-base ${ errors.firstName ? 'border-red-500' : 'border-[#E0E0E0] ' }`}
                                />
                            )}
                            name="firstName"
                        />
                        {
                            errors.firstName &&
                            <Text className="text-red-500">{errors.firstName.message}</Text>
                        }
                    </View>

                    <View className='w-full flex flex-col'>
                        <Text className='text-[#686868] text-sm font-semibold'>
                            Documento ({watch("documentNumber").length})
                        </Text>
                        <View className='w-full flex flex-row items-center'>
                            <View className='w-1/2 pr-3'>
                                <View className='border border-[#E0E0E0] rounded-lg'>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: "El tipo de documento es obligatorio",
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <SelectPicker
                                                selectedValue={value}
                                                onValueChange={(itemValue) =>
                                                    onChange(itemValue)
                                                }
                                                placeholder='Tipo'
                                                className={`${ errors.documentType ? 'border-red-500' : 'border-[#E0E0E0] ' }`}
                                            >
                                                {
                                                    documents.map((item, index) => {
                                                        return (
                                                            <SelectPicker.Item
                                                                key={item.label}
                                                                label={item.label} value={item.value} />
                                                        )
                                                    })
                                                }
                                            </SelectPicker>
                                        )}
                                        name="documentType"
                                    />
                                </View>
                            </View>

                            <Controller
                                control={control}
                                rules={{
                                    required: "El número de documento es obligatorio",
                                    validate: (value) => {
                                        if (!documentType) {
                                            return 'Primero selecciona el tipo de documento';
                                        }
                                        const docInfo = documents.find(doc => doc.value === documentType);
                                        if (!docInfo) {
                                            return 'Tipo de documento no válido';
                                        }
                                        if (value.length < docInfo.min || value.length > docInfo.max) {
                                            return `El número debe tener entre ${ docInfo.min } y ${ docInfo.max } dígitos`;
                                        }
                                        return true;
                                    }
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="N° de documento"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className={`w-1/2 px-4 py-3 rounded-lg bg-white border text-base
                                            ${ errors.documentNumber ? 'border-red-500' : 'border-[#E0E0E0] ' }
                                            `}
                                    />
                                )}
                                name="documentNumber"
                            />
                        </View>


                        {
                            errors.documentNumber &&
                            <Text className="text-red-500">{errors.documentNumber.message}</Text>
                        }

                        <View className='w-full flex flex-row items-center pr-4 mt-3'>
                            <View className='rounded-lg bg-blue-200 flex justify-center items-center flex-row px-6 py-4'>
                                <Info color={"#082774"} size={24} strokeWidth={1}
                                    className='mr-2'
                                />
                                <Text className='text-[#082774]'>
                                    Tu documento de identidad debe coincidir con tus datos para evitar inconvenientes al momento de hacer una primera operación
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className='flex flex-row mt-3'>
                        <View className='w-1/2 flex flex-col mb-4'>
                            <Text className='text-[#686868] text-sm font-semibold'>
                                Celular ({watch('phoneNumber').length})
                            </Text>
                            <View className='w-full pr-3'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "El número de celular es obligatorio",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Solo se permiten números",
                                        },
                                        minLength: {
                                            value: 9,
                                            message: "Debe tener al menos 9 dígitos",
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "No debe tener más de 15 dígitos",
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            keyboardType='numeric'
                                            placeholder="N° de celular"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            className={`px-4 py-3 rounded-lg bg-white  border ${ errors.phoneNumber ? 'border-red-500' : 'border-[#E0E0E0] ' } text-base`}
                                        />
                                    )}
                                    name="phoneNumber"
                                />
                            </View>

                            {
                                errors.phoneNumber &&
                                <Text className="text-red-500">{errors.phoneNumber.message}</Text>
                            }
                        </View>

                        <View className='w-1/2 flex flex-col'>
                            <Text className='text-[#686868] text-sm font-semibold'>
                                Fecha de nacimiento
                            </Text>
                            <View className='w-full pr-3'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "La fecha de nacimiento es obligatoria",
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => {
                                        const dateValue = value instanceof Date ? value : new Date(value || new Date());
                                        return (
                                            <View className='w-full h-14 border border-[#E0E0E0] rounded-lg'>
                                                <TouchableOpacity
                                                    onPress={() => setShowPicker(true)}
                                                    className='w-full h-full flex justify-center items-start px-4'
                                                >
                                                    <Text className='text-[#686868] text-lg font-semibold'>
                                                        {/* {value.getDate()}/{value.getMonth() + 1}/{value.
                                                        getFullYear()} */}
                                                        {dateValue?.toLocaleDateString('es-ES')}
                                                    </Text>
                                                </TouchableOpacity>
                                                {
                                                    showPicker && (
                                                        <RNDateTimePicker
                                                            value={dateValue}
                                                            onChange={(event, selectedDate) => {
                                                                setShowPicker(false);
                                                                if (selectedDate) {
                                                                    onChange(selectedDate.toISOString());
                                                                }
                                                            }}
                                                            mode="date"
                                                            locale="es-ES"
                                                            maximumDate={new Date()}
                                                        />
                                                    )
                                                }
                                            </View>
                                        );
                                    }}
                                    name="birthDate"
                                />
                            </View>
                        </View>
                    </View>

                    <View className='flex flex-row mt-0'>
                        <View className='w-full flex flex-col'>
                            <Text className='text-[#686868] text-sm font-semibold'>
                                ¿Donde cambiabas antes? (Opcional)
                            </Text>
                            <View className='w-full pr-3'>
                                <View className='border border-[#E0E0E0] rounded-lg'>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: false,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <SelectPicker
                                                selectedValue={selectedLanguage}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setSelectedLanguage(itemValue)
                                                }
                                                placeholder='Último lugar de cambio'
                                            >
                                                <SelectPicker.Item label="FÍSICO" value="FISICO" />
                                                <SelectPicker.Item label="VIRTUAL" value="VIRTUAL" />
                                            </SelectPicker>
                                        )}
                                        name="previousExchangePlatform"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className='flex flex-col mt-3'>
                        <View className="flex flex-col pb-3">
                            <View className='flex flex-row'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "Debe aceptar los términos y condiciones",
                                    }}
                                    name="acceptTerms"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View className="flex flex-row items-center justify-start">
                                            <Checkbox
                                                className='p-2 rounded-md border border-[#686868]'
                                                value={value}
                                                onValueChange={onChange}
                                                color={value ? '#00e3c2' : undefined}
                                            />
                                            <Text className="text-[#686868] text-sm font-semibold pl-2"
                                                onPress={() => onChange(!value)}
                                            >
                                                He leído y acepto los <Text className='font-bold text-[#060F26]'>
                                                    Términos y condiciones
                                                </Text>
                                            </Text>
                                        </View>
                                    )
                                    }
                                />
                            </View>
                            {
                                errors.acceptTerms &&
                                <Text className="text-red-500 pl-7">{errors.acceptTerms.message}</Text>
                            }
                        </View>

                        <View className="flex">
                            <View className='flex flex-row'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "Debe aceptar la política de privacidad",
                                    }}
                                    name="acceptPolicy"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View className="flex flex-row items-center justify-start">
                                            <Checkbox
                                                className='p-2 rounded-md border border-[#686868]'
                                                value={value}
                                                onValueChange={onChange}
                                                color={value ? '#00e3c2' : undefined}
                                            />
                                            <Text className="text-[#686868] text-sm font-semibold pl-2"
                                                onPress={() => onChange(!value)}
                                            >
                                                Acepto de manera expresa e informada la  <Text className='font-bold text-[#060F26]'>
                                                    Política de Tratamiento de datos personales de Kambista
                                                </Text>
                                            </Text>
                                        </View>
                                    )
                                    }
                                />
                            </View>
                            <View className='flex flex-col'>
                                {
                                    errors.acceptPolicy &&
                                    <Text className="text-red-500 pl-7">{errors.acceptPolicy.message}</Text>
                                }
                            </View>
                        </View>
                    </View>



                    <View className='w-full flex flex-col px-0 mt-5'>
                        <TouchableOpacity
                            // className={`
                            //         bg-primary w-full p-4 rounded-lg items-center
                            //         transition-opacity duration-200
                            //         ${ isDisabled ? 'opacity-50' : '' }
                            //         `}
                            className={`
                                    bg-primary w-full p-4 rounded-lg items-center
                                    transition-opacity duration-200
                                    `}
                            onPress={handleSubmit(handleRegister)}
                        // disabled={isDisabled}
                        >
                            <Text
                                className='text-black font-semibold text-sm'
                            >REGISTRARME</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <GlobalErrorBottomSheet
                    visible={documentNumberError}
                    onClose={() => { setDocumentNumberError(false) }}
                    title='¡Vaya!'
                    message='El número de documento registrado esta en uso'
                    onContactSupport={true}
                />
            </ScrollView>
        </View>
    );
}

export default OnBoardingScreen;