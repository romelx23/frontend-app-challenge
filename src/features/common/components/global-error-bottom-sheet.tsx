import React from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal } from "react-native";

export interface GlobalErrorBottomSheet {
    visible: boolean;
    onClose: () => void;
    title: string;
    message?: string;
    onContactSupport?: boolean
    onContactSupportEvent?: () => void;
    supportMessage?: string;

}

export const GlobalErrorBottomSheet = ({ visible, onClose, title, message, onContactSupport = false, onContactSupportEvent, supportMessage }: GlobalErrorBottomSheet) => {

    return (
        <Modal visible={visible} transparent animationType="slide"
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 justify-end bg-black/50">
                    <View className="px-3 py-4 bg-white rounded-t-2xl max-h-[50%]">
                        <View>
                            <Text className="text-lg font-bold text-center mb-2">{title}</Text>
                            {
                                message &&
                                <Text className="text-base text-gray-600 text-center">{message}</Text>
                            }
                        </View>

                        <View className="mt-6">
                            <TouchableOpacity
                                className="bg-black rounded-lg py-3 mb-4"
                                onPress={onClose}
                            >
                                <Text className="text-white text-center text-base font-semibold">Aceptar</Text>
                            </TouchableOpacity>

                            {onContactSupport && (
                                <View className="flex flex-row justify-center items-center">
                                    <Text className="text-black text-center text-base font-base">
                                        ¿Problemas?{" "}
                                    </Text>
                                    <View className="flex flex-col">
                                        <Text className="font-bold">
                                            Contacta a soporte
                                        </Text>
                                        <View className="border-b"></View>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

}