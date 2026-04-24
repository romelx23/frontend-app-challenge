import { View, Text, Image, TouchableOpacity } from "react-native";
import { Stepper } from "../../../src/features/common/components/stepper";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";
import { useStep } from "../../../src/features/home/store/step";
import { useBanks } from "../../../src/features/home/store/banks";

const wallet = require("../../../assets/icons/home/wallet.png")

function TransferScreen() {

    const {
        bank,
        amount,
    } = useLocalSearchParams<{
        bank: string;
        amount: string;
    }>();

    const { banks } = useBanks();

    const { currentStep, setCurrentStep } = useStep()

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
        router.navigate("/(tabs)/home/constancy?amount=" + amount)
    }

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
        router.back()
    }

    const bankData = banks.find(b => b.id === bank)

    return (
        <View className="flex-1 bg-white">
            <ScrollView className="p-4">

                {/* Paso de progreso */}
                <Text className="text-center font-semibold text-lg mb-4">Transfiere a Kambista</Text>
                <View className=" w-full flex-col items-center justify-between mb-6">
                    <View className='w-full justify-between flex flex-row'>
                        <TouchableOpacity
                            onPress={handlePrev}
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

                {/* Tiempo de cambio */}
                <Text className="text-center text-gray-500 text-sm mb-4">
                    El tipo de cambio podría actualizarse a las: <Text className="font-bold">
                        {
                            new Intl.DateTimeFormat("es-PE", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                                timeZone: "America/Lima", // 👈 aquí fuerzas la hora de Perú
                            }).format(new Date())
                        }
                    </Text>
                </Text>

                {/* Imagen */}
                <View className="items-center mb-4">
                    {/* Aquí pones tu imagen */}
                    <Image
                        source={wallet}
                        className="w-32 h-32"
                        resizeMode="contain"
                    />
                </View>

                {/* Información de transferencia */}
                <View className="bg-gray-100 rounded-lg p-4 mb-6">
                    <Text className="mb-1 font-semibold">Banco</Text>
                    {/* <Text className="mb-2">{banks[parseInt(bank)].name || "Interbank"}</Text> */}
                    <Text className="mb-2">{bankData?.name}</Text>
                    <Text className="mb-1 font-semibold">Monto</Text>
                    <Text className="mb-2">
                        {
                            new Intl.NumberFormat("es-PE", {
                                style: "currency",
                                currency: "PEN",
                            }).format(parseFloat(amount || "0"))
                        }
                    </Text>
                    <Text className="mb-1 font-semibold">Número de cuenta</Text>
                    <Text className="mb-2">2010100000000000</Text>
                    <Text className="mb-1 font-semibold">RUC</Text>
                    <Text className="mb-2">20601708141</Text>
                    <Text className="mb-1 font-semibold">Titular de la cuenta</Text>
                    <Text className="mb-2">Kambista SAC</Text>
                    <Text className="mb-1 font-semibold">Tipo de cuenta</Text>
                    <Text>Corriente</Text>
                </View>

                {/* Botón */}
                <TouchableOpacity className="bg-[#00E0B8] py-3 rounded-md mb-7"
                    onPress={handleNext} >
                    <Text className="text-white text-center font-semibold">YA HICE MI TRANSFERENCIA</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default TransferScreen;
