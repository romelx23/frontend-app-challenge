import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { BottomSheet } from '../../common/components/bottom-sheet';
import { ChevronDown, PlusSquare } from 'lucide-react-native';
import { CustomBottomSheet } from '../../common/components/custom-bottom-sheet';

export interface OptionAccount {
    value: string;
    name: string;
    alias: string;
    type: string;
    number: string;
}

interface SelectAccountProps {
    value: string | null;
    onChange: (val: string) => void;
    options: OptionAccount[];
    title: string;
    getAccounts: () => void
}

export default function SelectAccount({ value, onChange, options, title,
    getAccounts }: SelectAccountProps) {
    const [open, setOpen] = useState(false);

    const selectedOption = options.find(opt => opt.value === value);
    const lastDigits = selectedOption?.number?.slice(-4);

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
                <Text className="text-left text-black text-lg font-base">{selectedOption?.name}
                </Text>
                <ChevronDown color={"#000000"} />
            </TouchableOpacity>
            <CustomBottomSheet
                visible={open}
                onSelect={(val) => {
                    onChange(val);
                    setOpen(false);
                }} onClose={() => setOpen(false)}
                options={options}
                title={title ? title : "Seleccionar"}
                getAccounts={getAccounts}
            />
        </>
    );
}