import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { RefreshCcw } from 'lucide-react-native';
import { Logo } from '../../../src/features/home/components/logo';
import { Controller, useForm } from 'react-hook-form';
import CustomCurrencySelect from '../../../src/features/home/components/custom-currency-select';
import { KambistaExchangeApi } from '../../../src/api/kambista/config';
import { IExchangeResponse } from '../../../src/interfaces/exchange.type';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useStep } from '../../../src/features/home/store/step';
import { useTheme } from '../../../src/features/common/hooks/useTheme';

const starIcon = require("../../../assets/star-icon.png")

type Currency = 'PEN' | 'USD';
type DiscountType = 'percentage' | 'fixed';

interface FormValues {
    amount: string;
    fromCurrency: Currency;
    toCurrency: Currency;
    couponCode?: string;
    discountType?: DiscountType;
    discountValue?: string;
}

const StartScreen = () => {
    const [exchangeRate, setExchangeRate] = useState({ buy: 3.7, sell: 3.8 });
    const [convertedAmount, setConvertedAmount] = useState('');
    const { colors, isDarkMode } = useTheme();

    const { setCurrentStep } = useStep()

    const optionsSelect = [
        {
            label: 'PEN',
            value: 'PEN'
        },
        {
            label: 'USD',
            value: 'USD'
        }
    ]

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<FormValues>({
        defaultValues: {
            fromCurrency: 'PEN',
            toCurrency: 'USD',
            amount: '1',
            couponCode: '',
            discountType: 'percentage',
            discountValue: ''
        },
        mode: 'onBlur'
    })

    const onSubmit = (data: FormValues) => {

        if (watch("amount") === "" || watch("amount") === undefined) {
            Toast.show({
                text1: "Debes ingresar un monto valido"
            })
            return;
        }

        if (watch("fromCurrency") === undefined) {
            Toast.show({
                text1: "Debes seleccionar una moneda de origen"
            })
            return;
        }

        router.navigate("/(tabs)/home/transaction?amount=" + data.amount + "&fromCurrency=" + data.fromCurrency + "&toCurrency=" + data.toCurrency + "&couponCode=" + data.couponCode + "&discountType=" + data.discountType + "&discountValue=" + data.discountValue + "&convertedAmount=" + convertedAmount + "&buy=" + exchangeRate.buy + "&sell=" + exchangeRate.sell)
        setCurrentStep(0)
    };

    const swapCurrencies = () => {
        const oldFrom = watch('fromCurrency');
        const oldTo = watch('toCurrency');
        const currentAmount = parseFloat(watch('amount'));

        const newFrom = oldTo;
        const newTo = oldFrom;

        setValue('fromCurrency', newFrom);
        setValue('toCurrency', newTo);

        if (!currentAmount || !exchangeRate) return;

        let result = 0;
        if (newFrom === 'PEN' && newTo === 'USD') {
            console.log("PEN => USD (after swap)", { currentAmount, sell: exchangeRate.sell });
            result = currentAmount / exchangeRate.sell;
        } else if (newFrom === 'USD' && newTo === 'PEN') {
            console.log("USD => PEN (after swap)", { currentAmount, buy: exchangeRate.buy });
            result = currentAmount * exchangeRate.buy;
        } else {
            console.log("Misma moneda");
            result = currentAmount;
        }
        setConvertedAmount(result.toFixed(2));

    };

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await KambistaExchangeApi.get<IExchangeResponse>("/");
                // const data = await response.json();
                const data = response.data

                const buyRate = parseFloat(data.bid.toString());
                const sellRate = parseFloat(data.ask.toString());

                // Puedes guardar ambos si lo necesitas
                setExchangeRate({
                    buy: buyRate,
                    sell: sellRate
                });
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, []);

    useEffect(() => {
        const subscription = watch((value) => {
            const amount = parseFloat(value.amount || '0');
            const from = value.fromCurrency;
            const to = value.toCurrency;

            if (!amount || !exchangeRate) return;

            let result = 0;
            if (from === 'PEN' && to === 'USD') {
                result = amount / exchangeRate.sell;
            } else if (from === 'USD' && to === 'PEN') {
                result = amount * exchangeRate.buy;
            } else {
                result = amount; // misma moneda
            }

            setConvertedAmount(result.toFixed(2));
        });

        return () => subscription.unsubscribe();
    }, [watch, exchangeRate]);

    const isDisabled =
        Object.keys(errors).length > 0 ||
        !watch('amount') ||
        convertedAmount === '' ||
        !watch('fromCurrency') ||
        !watch('toCurrency');

    const fromCurrency = watch('fromCurrency');
    const toCurrency = watch('toCurrency');
    const isBuyingUSD = fromCurrency === 'PEN' && toCurrency === 'USD';

    const errorMessages = Object.entries(errors).map(([fieldName, errorObj]) => {
        if (errorObj?.message) {
            return errorObj.message;
        }
        return null;
    }).filter(Boolean); // Quitamos nulos

    useEffect(() => {
        const amount = parseFloat(watch('amount') || '0');
        const from = watch('fromCurrency');
        const to = watch('toCurrency');

        if (!amount || !exchangeRate) return;

        let result = 0;
        if (from === 'PEN' && to === 'USD') {
            result = amount / exchangeRate.sell;
        } else if (from === 'USD' && to === 'PEN') {
            result = amount * exchangeRate.buy;
        } else {
            result = amount;
        }

        setConvertedAmount(result.toFixed(2));
    }, [exchangeRate]);

    return (
        <View className="flex-1 w-full flex flex-col py-2 px-0" style={{ backgroundColor: colors.background }}>
            <Logo />

            <ScrollView>
                <View className="flex flex-col w-full justify-center items-center px-4">
                    <View className='flex flex-row w-full'>
                        <TouchableOpacity
                            style={{ backgroundColor: !isBuyingUSD ? (isDarkMode ? '#fff' : '#000') : colors.card }}
                            className='w-1/2 flex justify-center items-center py-3 rounded-t-md'
                        >
                            <Text style={{ color: !isBuyingUSD ? (isDarkMode ? '#000' : '#fff') : colors.textTertiary }}>
                                Compra: {exchangeRate.buy}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: isBuyingUSD ? (isDarkMode ? '#fff' : '#000') : colors.card }}
                            className='w-1/2 flex justify-center items-center py-3 rounded-t-md'
                        >
                            <Text style={{ color: isBuyingUSD ? (isDarkMode ? '#000' : '#fff') : colors.textTertiary }}>
                                Venta: {exchangeRate.sell}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className='relative flex flex-col px-3 w-full pt-7 pb-7' style={{ backgroundColor: colors.card }}>

                        {/* input */}
                        <View className='w-full flex flex-row rounded-lg overflow-hidden'>
                            <View className='w-[70%] flex flex-col py-2 px-3' style={{ backgroundColor: colors.backgroundSecondary }}>
                                <Text className='font-semibold px-3' style={{ color: colors.textPrimary }}>
                                    ¿Cuánto envías?
                                </Text>
                                {/* Amount Input */}
                                <Controller
                                    control={control}
                                    name="amount"
                                    rules={{ required: 'El Monto es requerido' }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <View>
                                            <TextInput
                                                value={value}
                                                onChangeText={onChange}
                                                keyboardType="numeric"
                                                style={{ color: colors.textPrimary }}
                                                className={`font-bold ${ error ? 'border-red-500' : 'border-gray-300' } rounded-lg px-3 py-1 font-bold text-lg`}
                                            />
                                        </View>
                                    )}
                                />
                            </View>
                            <View className='w-[40%]'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomCurrencySelect value={value} onChange={onChange} options={optionsSelect} />
                                    )}
                                    name="fromCurrency"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={swapCurrencies}
                            className="absolute top-[24%] left-[65%] z-20 flex justify-center items-center shadow-xl w-10 h-10 rounded-full"
                            style={{
                                backgroundColor: colors.card,
                                shadowColor: "#000000",
                                shadowOffset: {
                                    width: 25,
                                    height: 20
                                }
                            }}
                        >
                            <RefreshCcw color={colors.textPrimary} />
                        </TouchableOpacity>

                        {/* input */}
                        <View className='flex flex-row rounded-lg overflow-hidden mt-3'>
                            <View className='w-[70%] flex flex-col py-2 px-3' style={{ backgroundColor: colors.backgroundSecondary }}>
                                <Text className='font-semibold px-3' style={{ color: colors.textPrimary }}>
                                    Entonces recibes
                                </Text>
                                {/* Amount Input */}
                                <Controller
                                    control={control}
                                    name="amount"
                                    rules={{
                                        required: 'El monto es requerido'
                                    }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <View>
                                            <TextInput
                                                value={convertedAmount}
                                                editable={false}
                                                keyboardType="numeric"
                                                style={{ color: colors.textPrimary }}
                                                className={`${ error ? 'border-red-500' : 'border-gray-300' } rounded-lg px-3 py-1 font-bold text-lg`}
                                            />
                                        </View>
                                    )}
                                />
                            </View>
                            <View className='w-[40%] flex justify-start border' style={{ borderColor: colors.border }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "El tipo de cambio es obligatorio",
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomCurrencySelect
                                            value={value}
                                            onChange={onChange}
                                            options={optionsSelect}
                                        />
                                    )}
                                    name="toCurrency"
                                />
                            </View>
                        </View>

                        <View className='flex flex-col pt-3'>
                            <View className='flex flex-row justify-between'>
                                <Text style={{ color: colors.textSecondary }}>
                                    Ahorro estimado
                                </Text>
                                <Text style={{ color: colors.textSecondary }}>
                                    Koins
                                </Text>
                            </View>

                            <View className='flex flex-row justify-between'>
                                <Text style={{ color: colors.textPrimary }}>
                                    S/. 555.00
                                </Text>
                                <Text style={{ color: colors.textPrimary }}>
                                    10.000
                                </Text>
                            </View>
                        </View>

                        <View className='flex flex-col pt-2'>
                            {
                                errorMessages.map((errorMessage, index) => {
                                    return (
                                        <Text key={index} className='text-red-500 text-sm'>{errorMessage}</Text>
                                    )
                                })
                            }
                        </View>

                        <View className='w-full flex flex-col pt-4'>
                            <View className='flex flex-row justify-between pb-7'>
                                <TextInput
                                    placeholder='Ingrese el cupón'
                                    placeholderTextColor={colors.textTertiary}
                                    style={{
                                        backgroundColor: colors.background,
                                        borderColor: colors.border,
                                        color: colors.textPrimary,
                                    }}
                                    className='border w-[72%] px-4 rounded-l-lg text-center'
                                />
                                <TouchableOpacity
                                    style={{ backgroundColor: isDarkMode ? '#fff' : '#000' }}
                                    className='w-[28%] px-2 py-3 rounded-r-lg flex justify-center items-center'
                                >
                                    <Text style={{ color: isDarkMode ? '#000' : '#fff' }} className='font-semibold'>APLICAR</Text>
                                </TouchableOpacity>
                            </View>

                            <View className='flex flex-row justify-evenly items-center'>
                                <Image
                                    source={starIcon}
                                    className='w-8 h-8'
                                    resizeMode='contain'
                                />
                                <View className='flex flex-col justify-start'>
                                    <Text style={{ color: colors.textPrimary }} className='text-base'>
                                        ¿Monto mayor a $5.000 o S/18.000?
                                    </Text>
                                    <Text style={{ color: colors.textSecondary, letterSpacing: 0.5 }} className='font-semibold text-sm'>
                                        ¡Obtén un tipo de Cambio Preferencial!
                                    </Text>
                                    <View style={{ borderBottomColor: colors.border }} className='border-b w-[98%]'></View>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View className='w-full flex flex-col px-3 mt-8'>
                        <TouchableOpacity
                            className={`
                            bg-primary w-full p-4 rounded-lg items-center
                            transition-opacity duration-200
                            `}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text
                                className='text-black font-semibold text-sm'
                            >INICIA OPERACIÓN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default StartScreen;