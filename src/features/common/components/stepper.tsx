import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
const steps = ["Completa", "Transfiere", "Constancia"];

interface StepperProps {
    activeStep: number; // 0, 1 o 2
}

export const Stepper: React.FC<StepperProps> = ({ activeStep }: StepperProps) => {
    const progress = useSharedValue((activeStep / (steps.length - 1)) * 100);

    useEffect(() => {
        progress.value = withTiming((activeStep / (steps.length - 1)) * 100, {
            duration: 400,
        });
    }, [activeStep]);

    const animatedProgressStyle = useAnimatedStyle(() => ({
        width: `${ progress.value }%`,
    }));
    return (
        <View className="w-full px-2 py-4">
            {/* Fila de puntos + línea */}
            <View className="flex-row justify-between items-center relative" style={{ height: 16 }}>
                {/* Línea de fondo */}
                <View
                    className="absolute h-0.5 bg-gray-300 z-0"
                    style={{ left: 8, right: 8, top: 8 }}
                />
                {/* Línea animada de progreso */}
                <Animated.View
                    style={[animatedProgressStyle, { top: 8, left: 8, position: 'absolute' }]}
                    className="h-0.5 bg-primary z-0"
                />
                {steps.map((step, index) => (
                    <View key={step} className="z-10">
                        <View
                            className={`w-4 h-4 rounded-full border-2
                            ${ index <= activeStep ? 'bg-primary border-primary' : 'bg-white border-gray-300' }`}
                        />
                    </View>
                ))}
            </View>

            {/* Fila de etiquetas */}
            <View className="flex-row justify-between mt-1">
                {steps.map((step, index) => (
                    <Text
                        key={step}
                        className={`text-xs flex-1
                        ${ index === activeStep ? 'font-bold text-primary' : 'text-gray-400' }
                        ${ index === 0 ? 'text-left' : index === steps.length - 1 ? 'text-right' : 'text-center' }`}
                    >
                        {step}
                    </Text>
                ))}
            </View>
        </View>
    );
};