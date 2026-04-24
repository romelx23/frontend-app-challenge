import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Stepper } from "../../../src/features/common/components/stepper";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { useStep } from "../../../src/features/home/store/step";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const voucher = require("../../../assets/icons/home/voucher.png")

function UploadReceiptScreen() {
    const { currentStep, setCurrentStep } = useStep()

    const {
        amount,
    } = useLocalSearchParams<{
        amount: string;
    }>();


    const handleNext = () => {

        if (!imageUri) {
            Toast.show({
                text1: "Debes subir un archivo",
                type: "error"
            })
            return
        }

        setCurrentStep(currentStep + 1);
        router.navigate("/(tabs)/home/confirm?amount=" + amount)
    }
    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
        router.back()
    }

    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        // Pedimos permisos
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Necesitas dar permiso para acceder a tus fotos.");
            return;
        }

        // Abrimos el selector de imágenes
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
            allowsEditing: true, // Permite recortar
            quality: 1, // Mejor calidad
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); // Guardamos el URI local
        }
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <ScrollView className="p-4">

                {/* Paso de progreso */}
                <Text className="text-center font-semibold text-lg mb-4">Envía tu constancia</Text>
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

                {/* Imagen */}
                <View className="items-center mb-4">
                    {/* Aquí pones tu imagen */}
                    <Image
                        source={voucher}
                        className="w-32 h-32"
                        resizeMode="contain"
                    />
                </View>

                {/* Subir constancia */}
                <View className="bg-gray-100 rounded-lg p-4 mb-6">
                    <Text className="font-semibold mb-2">Sube el archivo de tu constancia</Text>
                    <TouchableOpacity className="border-2 border-gray-300 p-4 rounded-md items-center"
                        onPress={pickImage}
                    >
                        <Text className="text-gray-500">Selecciona archivo</Text>
                    </TouchableOpacity>
                    <Text className="text-xs text-gray-400 mt-2">*Tamaño máximo permitido del archivo 10 Mb</Text>
                    {imageUri && (
                        <Image
                            source={{ uri: imageUri }}
                            className="w-full h-64 rounded-md"
                            resizeMode="cover"
                        />
                    )}
                </View>

                {/* Recordatorio */}
                <Text className="text-gray-500 text-sm mb-6">
                    Recuerda:
                    {"\n"}• El voucher debe tener el monto, datos del beneficiario, fecha y hora.
                    {"\n"}• El voucher debe ser legible.
                    {"\n"}• Archivos permitidos: imágenes, Word y PDF.
                </Text>

                {/* Botón */}
                <TouchableOpacity className="bg-primary py-3 rounded-md mb-7"
                    onPress={handleNext}
                >
                    <Text className="text-white text-center font-semibold">ENVIAR CONSTANCIA</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
export default UploadReceiptScreen;