import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ChevronLeft, Info } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Stepper } from '../../../src/features/common/components/stepper';
import { useEffect, useState } from 'react';
import CustomSelect from '../../../src/features/home/components/custom-select';
import { Controller, useForm } from 'react-hook-form';
import SelectAccount from '../../../src/features/home/components/select-account';
import { useAccounts } from '../../../src/features/home/hooks/useAccounts';
import { useStep } from '../../../src/features/home/store/step';
import { useBanks } from '../../../src/features/home/store/banks';

const TransactionScreen = () => {
    // const [bankList, setBankList] = useState<{ label: string; value: string }[]>([]);
    // const [sourceFunds, setSourceFunds] = useState<{ label: string; value: string }[]>([]);
    // const [loading, setLoading] = useState(true);

    const {
        amount,
        fromCurrency,
        toCurrency,
        couponCode,
        discountType,
        discountValue,
        convertedAmount,
        buy,
        sell
    } = useLocalSearchParams<{
        amount: string;
        fromCurrency: string;
        toCurrency: string;
        couponCode?: string;
        discountType?: string;
        discountValue?: string;
        convertedAmount: string;
        buy: string;
        sell: string
    }>();
    const { currentStep, setCurrentStep } = useStep()

    const { getAccounts, loading, getSourceFunds, getBanks, accountList, bankList, sourceFunds } = useAccounts();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<{
        bank: string;
        account: string;
        origin: string;
    }>({
        defaultValues: {
            bank: "",
            account: "",
            origin: ""
        },
        mode: 'onBlur'
    })

    const exchangeRate =
        fromCurrency === "PEN" && toCurrency === "USD"
            ? sell
            : buy;

    const isDisabled =
        Object.keys(errors).length > 0 ||
        !watch('bank') ||
        !watch('account') ||
        !watch('origin');

    useEffect(() => {
        getBanks();
    }, []);

    useEffect(() => {
        getSourceFunds();
    }, [])

    useEffect(() => {
        getAccounts()
    }, [])

    const handleNext = () => {
        setCurrentStep(1);
        router.navigate("/(tabs)/home/transfer?bank=" + watch('bank') + "&amount=" + amount)
    }

    const errorMessages = Object.entries(errors).map(([fieldName, errorObj]) => {
        if (errorObj?.message) {
            return errorObj.message;
        }
        return null;
    }).filter(Boolean);

    return (
        <View className='flex flex-col flex-1'>
            <ScrollView className="bg-[#F9FAFB] flex-1 px-4 pt-10 pb-20">
                {/* Header */}
                <View className=" w-full flex-col items-center justify-between mb-6">
                    <View className='w-full justify-between flex flex-row'>
                        <TouchableOpacity
                            onPress={() => router.navigate("/(tabs)/home")}
                            className='flex justify-center items-center'
                        >
                            <ChevronLeft size={24} color={"#000000"} />
                        </TouchableOpacity>
                        {
                            currentStep === 0 &&
                            <Text className="text-sm font-semibold text-center">
                                Completa los datos
                            </Text>
                        }
                        {
                            currentStep === 1 &&
                            <Text className="text-sm font-semibold text-center">
                                Transfiere
                            </Text>
                        }
                        {
                            currentStep === 2 &&
                            <Text className="text-sm font-semibold text-center">
                                Constancia
                            </Text>
                        }
                        <View></View>
                    </View>
                    <Stepper
                        activeStep={currentStep}
                    />
                </View>

                {/* Info enviada/recibida */}
                <View className="bg-white rounded-lg p-4 shadow mb-4">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600 text-sm">Tú envías</Text>
                        <Text className="text-black font-semibold text-sm">
                            {
                                new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: fromCurrency,
                                }).format(parseFloat(amount))
                            }
                        </Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600 text-sm">Tú recibes</Text>
                        <Text className="text-black font-semibold text-sm">
                            {
                                new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: toCurrency,
                                }).format(parseFloat(convertedAmount))
                            }
                        </Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600 text-sm">Cupón aplicado</Text>
                        <Text className="text-black font-semibold text-sm">
                            {
                                couponCode ? couponCode : "-"
                            }
                        </Text>
                    </View>
                    <View className="flex-row justify-between mt-2 border-t pt-2">
                        <Text className="text-xs text-gray-500">Tipo de cambio utilizado</Text>
                        <View className=" flex flex-row">
                            <Text className="text-xs flex flex-rows text-red-500 mr-1">
                                {

                                }
                            </Text>
                            <Text className="text-xs text-gray-500">
                                {
                                    exchangeRate ? exchangeRate : "-"
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Info de espera */}
                <View className="bg-blue-100 p-3 rounded-md mb-4">
                    <Text className="text-xs text-blue-900">
                        <Text className="font-bold">Tiempo estimado de espera</Text> BCP, Interbank, BanBif,
                        Pichincha: 15 minutos. Otros bancos: 1 día hábil.
                    </Text>
                </View>

                {/* Campos */}
                <View className="space-y-4">
                    {/* Banco origen */}
                    <View className='flex flex-col'>
                        <Text className="text-gray-700 mb-1 text-sm">
                            ¿Desde qué banco nos envías tu dinero?
                        </Text>
                        <Controller
                            control={control}
                            name="bank"
                            rules={{
                                required: "El banco es obligatorio",
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
                            errors.bank &&
                            <Text className="text-red-500">{errors.bank.message}</Text>
                        }
                    </View>

                    {/* Cuenta destino */}
                    <View className='flex flex-col'>
                        <Text className="text-gray-700 mb-1 text-sm">
                            ¿En qué cuenta deseas recibir tu dinero?
                        </Text>
                        <Controller
                            control={control}
                            name="account"
                            rules={{
                                required: "La cuenta es obligatoria",
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <SelectAccount
                                    value={value}
                                    onChange={onChange}
                                    options={accountList}
                                    title="¿En qué cuenta deseas recibir tu dinero?"
                                    getAccounts={getAccounts}
                                />
                            )}
                        />
                        {
                            errors.account &&
                            <Text className="text-red-500">{errors.account.message}</Text>
                        }
                    </View>

                    {/* Advertencia */}
                    <View className="flex flex-row items-center justify-center bg-orange-100 p-3 rounded-md">
                        <Info color={"#7c2d12"} size={24} className="mr-2" />
                        <Text className="text-xs text-orange-900 pr-12">
                            <Text className="font-bold">Recuerda:</Text> las cuentas deben estar a tu nombre. Kambista no transfiere a cuentas de terceros.
                        </Text>
                    </View>

                    {/* Origen de fondos */}
                    <View className='flex flex-col'>
                        <Text className="text-gray-700 mb-1 text-sm">Origen de fondos</Text>
                        <Controller
                            control={control}
                            name="origin"
                            rules={{
                                required: "El origen de fondos es obligatorio",
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomSelect
                                    value={value}
                                    onChange={onChange}
                                    options={sourceFunds}
                                    title="Origen de fondos"
                                />
                            )}
                        />
                    </View>
                    {
                        errors.origin &&
                        <Text className="text-red-500">{errors.origin.message}</Text>
                    }
                </View>

                {/* <View className='flex flex-col '>
                    {
                        errorMessages.map((errorMessage, index) => {
                            return (
                                <Text key={index} className='text-red-500 text-sm pt-2'>{errorMessage}</Text>
                            )
                        })
                    }
                </View> */}

                {/* Botón */}
                <TouchableOpacity
                    // className={`mt-6 bg-primary py-3 rounded-md
                    // ${ isDisabled ? 'opacity-50' : '' }
                    // `}
                    className={`mt-6 bg-primary py-3 rounded-md`}
                    onPress={handleSubmit(handleNext)}
                // disabled={isDisabled}
                >
                    <Text className="text-center text-white font-semibold">CONTINUAR</Text>
                </TouchableOpacity>

                <View className='h-20'></View>
            </ScrollView>
        </View>
    );
}

export default TransactionScreen;