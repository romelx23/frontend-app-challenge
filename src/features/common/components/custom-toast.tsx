import { CheckCircle2 } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BaseToastProps } from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
    text1?: string;
    text2?: string;
}

export const toastConfig = {
    error: ({ text1, text2 }: CustomToastProps) => (
        <View className="flex-col items-center justify-start w-[80%] border border-[#D92D20] bg-[#FEF3F2] p-3 rounded-lg">
            <View className='flex-row items-center justify-start'>
                <CheckCircle2 size={20} color="#D92D20" className='mr-2' />
                {text1 && (
                    <Text className="text-[#D92D20] text-[12px] font-semibold">
                        {text1}
                    </Text>
                )}
            </View>
            {text2 && <Text className='text-gray-500'>{text2}</Text>}
        </View>
    ),
    success: ({ text1, text2 }: CustomToastProps) => {
        const scale = useSharedValue(0);

        useEffect(() => {
            scale.value = withSpring(1, {
                damping: 5,
                stiffness: 200,
            });
        }, []);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
        }));

        return (
            <Animated.View style={animatedStyle} className="flex-col items-center justify-start w-[80%] border border-[#ABEFC6] bg-[#ECFDF3] p-3 rounded-lg">
                <View className='flex-row items-center justify-start'>
                    <CheckCircle2 size={20} color="#067647" className='mr-2' />
                    {text1 && (
                        <Text className="text-[#067647] text-[12px] font-semibold">
                            {text1}
                        </Text>
                    )}
                </View>
                {text2 && <Text className='text-gray-500'>{text2}</Text>}
            </Animated.View>
        )
    },
    delete: ({ text1, text2 }: CustomToastProps) => (
        <View className="flex-col items-center justify-start w-[80%] border border-[#D92D20] bg-[#FEF3F2] p-3 rounded-lg">
            <View className='flex-row items-center justify-start'>
                <CheckCircle2 size={20} color="#D92D20" className='mr-2' />
                {text1 && (
                    <Text className="text-[#D92D20] text-[12px] font-semibold">
                        {text1}
                    </Text>
                )}
            </View>
            {text2 && <Text className='text-gray-500'>{text2}</Text>}
        </View>
    ),
    info: ({ text1, text2 }: CustomToastProps) => {
        const scale = useSharedValue(0);

        useEffect(() => {
            scale.value = withSpring(1, {
                damping: 5,
                stiffness: 200,
            });
        }, []);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
        }));
        return (
            <Animated.View style={animatedStyle} className="flex-col items-center justify-start w-[80%] border border-[#5fd2ff] bg-[#7ac5ff] p-3 rounded-lg">
                <View className='flex-row items-center justify-start'>
                    <CheckCircle2 size={20} color="#0794ff" className='mr-2' />
                    {text1 && (
                        <Text className="text-white text-[12px] font-semibold">
                            {text1}
                        </Text>
                    )}
                </View>
                {text2 && <Text className='text-white text-sm'>{text2}</Text>}
            </Animated.View>
        );
    },
    warning: ({ text1, text2 }: CustomToastProps) => (
        <View className="flex-col items-center justify-start w-[80%] border border-[#ffa929] bg-[#FEF3F2] p-3 rounded-lg">
            <View className='flex-row items-center justify-start'>
                <CheckCircle2 size={20} color="#ffa929" className='mr-2' />
                {text1 && (
                    <Text className="text-[#D9D20] text-[12px] font-semibold">
                        {text1}
                    </Text>
                )}
            </View>
            {text2 && <Text className='text-gray-500'>{text2}</Text>}
        </View>
    ),
};