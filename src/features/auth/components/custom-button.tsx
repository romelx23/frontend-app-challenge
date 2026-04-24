import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            className="bg-primary w-full p-4 rounded-lg items-center"
            onPress={onPress}>
            <Text
                className='text-black font-semibold text-sm'
            >{title}</Text>
        </TouchableOpacity>
    );
};