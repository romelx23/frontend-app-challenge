import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { BottomSheet } from '../../common/components/bottom-sheet';
import { ChevronDown } from 'lucide-react-native';

export interface Option {
    label: string;
    value: string;
}

interface CustomCurrencySelectProps {
    value: string | null;
    onChange: (val: string) => void;
    options: Option[];
    title: string;
}

export default function CustomSelect({ value, onChange, options, title }: CustomCurrencySelectProps) {
    const [open, setOpen] = useState(false);

    // Buscamos el label que corresponde al value actual
    const selectedLabel = options.find(opt => opt.value === value)?.label || 'Seleccionar';

    return (
        <>
            <TouchableOpacity
                className="w-full bg-white items-center border border-gray-300 rounded-xl flex flex-row justify-between px-5 "
                style={{
                    height: 50,
                    overflow: 'hidden',
                }}
                onPress={() => setOpen(true)}
                activeOpacity={0.8}
            >
                <Text className="text-left text-black text-lg font-base">{selectedLabel}</Text>
                <ChevronDown color={"#000000"} />
            </TouchableOpacity>
            <BottomSheet
                visible={open}
                onSelect={(val) => {
                    onChange(val);
                    setOpen(false);
                }} onClose={() => setOpen(false)}
                options={options}
                title={title ? title : "Seleccionar"}
            />
        </>
    );
}