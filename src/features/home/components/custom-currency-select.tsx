import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { CurrencyBottomSheet } from '../../common/components/currency-bottom-sheet';

export interface Option {
    label: string;
    value: string;
}

interface CustomCurrencySelectProps {
    value: string | null;
    onChange: (val: string) => void;
    options: Option[];
}

export default function CustomCurrencySelect({ value, onChange, options }: CustomCurrencySelectProps) {
    const [open, setOpen] = useState(false);

    // Buscamos el label que corresponde al value actual
    const selectedLabel = options.find(opt => opt.value === value)?.label || 'Seleccionar';

    return (
        <>
            <TouchableOpacity
                // className="bg-black text-white justify-center items-center h-full w-full"
                className="bg-black text-white justify-center items-center"
                style={{
                    width: 110,
                    height: 70,
                    overflow: 'hidden',
                }}
                onPress={() => setOpen(true)}
                activeOpacity={0.8}
            >
                <Text className="text-center text-white text-lg font-bold">{selectedLabel}</Text>
            </TouchableOpacity>
            <CurrencyBottomSheet visible={open} onSelect={(val) => {
                onChange(val);
                setOpen(false);
            }} onClose={() => setOpen(false)}
                options={options}
            />
        </>
    );
}