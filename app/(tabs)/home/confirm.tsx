import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useStep } from "../../../src/features/home/store/step";
const piggyBank = require("../../../assets/icons/home/piggy-bank.png")
const discount = require("../../../assets/icons/home/discount-banner.png")
export function ConfirmationScreen() {

    const { setCurrentStep } = useStep()

    const {
        amount,
    } = useLocalSearchParams<{
        amount: string;
    }>();

    const handleNext = () => {
        setCurrentStep(0);
        router.navigate("/(tabs)/home")
    }

    return (
        <View className="flex flex-col flex-1 p-4 bg-white">
            <ScrollView className="">

                {/* Imagen */}
                <View className="items-center mb-4">
                    {/* Aquí pones tu imagen */}
                    <Image
                        source={piggyBank}
                        className="w-32 h-32"
                        resizeMode="contain"
                    />
                </View>

                {/* Mensaje enviado */}
                <View className="bg-gray-100 rounded-lg p-4 mb-6 items-center">
                    <Text className="text-xl font-bold mb-2">¡Constancia enviada!</Text>
                    <Text className="text-gray-500 mb-1">Código Kambista</Text>
                    <Text className="text-black font-bold mb-3">km20ttfff</Text>
                    <Text className="text-gray-500 mb-1">Monto a recibir</Text>
                    <Text className="text-black font-bold mb-3">
                        {
                            new Intl.NumberFormat("es-PE", {
                                style: "currency",
                                currency: "PEN",
                            }).format(parseFloat(amount || "0"))
                        }
                    </Text>
                    <Text className="text-gray-500 mb-1">Tiempo estimado de espera</Text>
                    <Text className="text-black font-bold">20h 15min</Text>
                </View>

                <Image
                    source={discount}
                    className="w-full h-32"
                    resizeMode="contain"
                />

                {/* Info adicional */}
                <Text className="text-center text-gray-500 mb-6">
                    Verificaremos tu operación. Puedes ver su estado en "Mis operaciones".
                </Text>

                {/* Botón */}
                <TouchableOpacity className="bg-primary py-3 rounded-md mb-8"
                    onPress={handleNext}
                >
                    <Text className="text-white text-center font-semibold">VOLVER A INICIO</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default ConfirmationScreen;