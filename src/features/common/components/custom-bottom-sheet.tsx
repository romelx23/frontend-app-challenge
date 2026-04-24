import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';

import { Info, PlusSquare, RefreshCcw } from 'lucide-react-native';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomSelect from '../../home/components/custom-select';
import { OptionAccount } from '../../home/components/select-account';
import { fetchBanks } from '../../../api/kambista/banks';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useAccounts } from '../../home/hooks/useAccounts';
import { useBanks } from '../../home/store/banks';

interface CustomBottomSheetProps {
    visible: boolean;
    onSelect: (option: string) => void;
    onClose: () => void;
    options: OptionAccount[];
    title: string;
    getAccounts: () => void;
}

export function CustomBottomSheet({ visible, onSelect, onClose, options, title, getAccounts }: CustomBottomSheetProps) {
    // const options = ['Soles', 'Dólares'];

    const [showAddAccount, setShowAddAccount] = useState(false);
    const { getBanks, bankList } = useAccounts();

    useEffect(() => {
        getBanks()
    }, []);

    const findBank = (name: string) => {
        return bankList.find(b => b.label === name);
    }

    return (
        <>
            <Modal visible={visible} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={onClose}>
                    <View className="flex-1 justify-end bg-black/50">
                        <View className="bg-white rounded-t-2xl max-h-[50%]  ">
                            {/* Header */}
                            <View className="pt-5 px-5">
                                <View className='flex flex-row'>
                                    <Text className="text-base text-left font-semibold">{title || "Seleccionar"}</Text>
                                    <TouchableOpacity
                                        onPress={getAccounts}
                                        className="ml-auto"
                                    >
                                        <RefreshCcw size={24} color="#000" />
                                    </TouchableOpacity>
                                </View>
                                <View className="w-full px-4 bg-gray-300 h-0.5 my-2" />
                            </View>

                            {/* Scrollable content */}
                            <ScrollView className="px-5 pb-3">
                                {options.map((opt) => (
                                    <TouchableOpacity
                                        key={opt.value}
                                        className="py-2 border-b border-gray-100"
                                        onPress={() => onSelect(opt.value)}
                                    >
                                        <Text className="text-base">{`${ opt.alias } - ${ opt.type }`}</Text>
                                        <Text className="text-gray-500 text-sm">●●●● {opt.number.slice(-4)}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Footer */}
                            <TouchableOpacity className="flex-row items-center px-5 pb-6 pt-2"
                                onPress={() => setShowAddAccount(true)}
                            >
                                <PlusSquare size={28} color="#000" className="mr-2" />
                                <Text>Agregar cuenta</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {
                showAddAccount &&
                <SheetAccountConfig
                    show={showAddAccount}
                    onClose={() => setShowAddAccount(false)}
                    getAccounts={getAccounts}
                />
            }
        </>
    );
}

interface SheetAccountProps {
    show: boolean;
    onClose: () => void;
    getAccounts: () => void
}

export const SheetAccountConfig: FC<SheetAccountProps> = ({ show, onClose, getAccounts }) => {

    // const [bankList, setBankList] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(true);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues
    } = useForm<{
        typeAccount: string;
        entityFinance: string;
        typeMoney: 'USD' | 'PEN';
        accountNumber: string;
        accountName: string;
        acceptTerms: boolean;
    }>({
        defaultValues: {
            typeAccount: "",
            entityFinance: "",
            typeMoney: "PEN",
            accountNumber: "",
            accountName: "",
            acceptTerms: false
        },
        mode: 'onBlur'
    })

    const { getBanks, bankList } = useAccounts();

    useEffect(() => {
        getBanks()
    }, []);

    const saveAccount = async (data: any) => {
        try {
            const existing = await AsyncStorage.getItem('accounts');
            const parsed = existing ? JSON.parse(existing) : [];
            parsed.push(data);
            await AsyncStorage.setItem('accounts', JSON.stringify(parsed));
            Toast.show({
                type: 'success',
                text1: 'Cuenta guardada con éxito',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Error al guardar la cuenta"
            })
        }
    };

    const onSubmit = handleSubmit((formData) => {
        if (!formData.acceptTerms) {
            Toast.show({
                type: 'error',
                text1: "Debes aceptar los términos y condiciones."
            })
            return;
        }

        const newAccount = {
            id: Date.now().toString(),
            name: bankList.find(b => b.value === formData.entityFinance)?.label || "",
            alias: formData.accountName,
            type: formData.typeAccount,
            number: formData.accountNumber,
            typeMoney: formData.typeMoney,
        };

        saveAccount(newAccount);
        onClose();
        getAccounts();
    });

    return (
        <Modal visible={show} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={onClose}>
                <View className='flex-1' />
            </TouchableWithoutFeedback>
            <View className="bg-white rounded-t-2xl max-h-[80%]">
                {/* Header */}
                <View className="pt-5 px-5">
                    <Text className="text-lg text-left font-bold">Agregar cuenta en soles</Text>

                    <View className="w-full px-4 bg-gray-300 h-0.5 my-2" />

                    <View className='max-h-[90%]'>

                        <ScrollView className="pb-3">
                            <View
                                className=''
                            >
                                <Text>
                                    La cuenta que registres
                                    <Text className='font-semibold'> debe estar a tu nombre </Text>(titular de este perfil en kambista)
                                </Text>
                            </View>

                            <View className='flex flex-col pt-3'>
                                <Text>Tipo de cuenta bancaria</Text>
                                <Controller
                                    control={control}
                                    name="typeAccount"
                                    rules={{
                                        required: "El tipo de cuenta es obligatorio",
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomSelect
                                            value={value}
                                            onChange={onChange}
                                            options={[
                                                {
                                                    label: "Ahorro",
                                                    value: "ahorro"
                                                },
                                                {
                                                    label: "Crédito",
                                                    value: "credito"
                                                }
                                            ]}
                                            title="Origen de fondos"
                                        />
                                    )}
                                />
                                {
                                    errors.typeAccount &&
                                    <Text className="text-red-500">{errors.typeAccount.message}</Text>
                                }
                            </View>

                            <View className='flex flex-col pt-3 pb-3'>
                                <Text>Entidad financiera</Text>
                                <Controller
                                    control={control}
                                    name="entityFinance"
                                    rules={{
                                        required: "La entidad financiera es obligatoria",
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomSelect
                                            value={value}
                                            onChange={onChange}
                                            options={bankList}
                                            title="¿Desde qué banco nos envías tu dinero?"
                                        />
                                    )}
                                />
                                {
                                    errors.entityFinance &&
                                    <Text className="text-red-500">{errors.entityFinance.message}</Text>
                                }
                            </View>

                            <View className="flex flex-row items-center justify-start bg-blue-100 py-4 px-3 rounded-md mb-4">
                                <Info color={"#000000"} size={24} />
                                <Text className="text-sm text-blue-900 pr-4 pl-4">
                                    Operamos en Lima con todos los bancos, Y en provincia con el BCP y cuentas digitales Interbank.
                                </Text>
                            </View>

                            <View className='py-1 px-0 flex flex-col items-start'>
                                <Text className='pb-1'>Moneda</Text>
                                <View className='w-full flex flex-row items-center justify-between'>
                                    <TouchableOpacity className={`${ watch("typeMoney") === "PEN" ? 'bg-black' : '' } flex justify-center items-center py-1.5 border rounded-lg w-[45%]`}
                                        onPress={() => setValue('typeMoney', 'PEN')}
                                    >
                                        <Text className={`${ watch("typeMoney") === "PEN" ? ' text-white' : '' } text-base uppercase`}>
                                            Soles
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className={`${ watch("typeMoney") === "USD" ? 'bg-black' : '' } flex justify-center items-center py-1.5 border rounded-lg w-[45%]`}
                                        onPress={() => setValue('typeMoney', 'USD')}

                                    >
                                        <Text className={`${ watch("typeMoney") === "USD" ? ' text-white' : '' } text-base uppercase`}>
                                            Dólares
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className='w-full flex flex-col py-2'>
                                <Text className='font-semibold pb-1'>
                                    Número de cuenta
                                </Text>
                                {/* account number */}
                                <Controller
                                    control={control}
                                    name="accountNumber"
                                    rules={{
                                        required: 'El número de cuenta es obligatorio',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'El número de cuenta solo debe contener números',
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'El número de cuenta debe tener al menos 10 dígitos',
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'El número de cuenta no debe superar los 16 dígitos',
                                        },
                                    }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <View className='flex flex-col'>
                                            <TextInput
                                                onChangeText={onChange}
                                                value={value}
                                                keyboardType="numeric"
                                                className={`${ error ? 'border-red-500' : 'border-gray-300' } border rounded-lg px-3 py-2 font-base text-lg`}
                                                placeholder='Escribe tu cuenta de destino'
                                            />
                                            {error && <Text className="text-red-500 mt-1">{error.message}</Text>}
                                        </View>
                                    )}
                                />
                            </View>

                            <View className='w-full flex flex-col py-2'>
                                <Text className='font-semibold pb-1'>
                                    Ponle nombre a tu cuenta
                                </Text>
                                {/* account number */}
                                <Controller
                                    control={control}
                                    name="accountName"
                                    rules={{
                                        required: 'El nombre de la cuenta es obligatorio',
                                        minLength: {
                                            value: 3,
                                            message: 'El nombre debe tener al menos 3 caracteres',
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: 'El nombre no debe superar los 30 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9 _-]+$/,
                                            message: 'El nombre solo puede contener letras, números, espacios, guiones o guiones bajos',
                                        },
                                    }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <View>
                                            <TextInput
                                                value={value}
                                                onChangeText={onChange}
                                                keyboardType="default"
                                                className={`${ error ? 'border-red-500' : 'border-gray-300' } border rounded-lg px-3 py-2 font-base text-lg`}
                                                placeholder='Escribe un alias'
                                            />
                                            {error && <Text className="text-red-500 mt-1">{error.message}</Text>}
                                        </View>
                                    )}
                                />
                            </View>

                            <View className='w-full flex flex-col py-2'>
                                {/* account number */}
                                <Controller
                                    control={control}
                                    name="acceptTerms"
                                    rules={{ required: 'Debe declarar que la cuenta es suya' }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                                                Declaro que esta cuenta es mía
                                            </Text>
                                        </View>
                                    )}
                                />
                                {
                                    errors.acceptTerms &&
                                    <Text className="text-red-500">{errors.acceptTerms.message}</Text>
                                }
                            </View>

                            <TouchableOpacity
                                className={` bg-primary w-full p-4 rounded-lg items-center
                                                transition-opacity duration-200
                                                `}
                                onPress={onSubmit}
                            >
                                <Text
                                    className='text-black font-semibold text-sm'
                                >GUARDAR CUENTA</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                </View>

            </View>
        </Modal>
    )
}