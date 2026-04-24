import { FC, useState } from "react";
import { TextInput } from "react-native";

interface PhoneInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

const PhoneInput: FC<PhoneInputProps> = ({ value, onChangeText }) => {
    const [displayValue, setDisplayValue] = useState(value || '');

    const handleChange = (text: string) => {
        // Eliminar todo excepto números
        const numbers = text.replace(/[^0-9]/g, '');

        // Limitar a 9 dígitos
        const formatted = numbers.substring(0, 9);

        setDisplayValue(formatted);
        onChangeText(formatted);
    };

    return (
        <TextInput
            value={displayValue}
            onChangeText={handleChange}
            keyboardType="numeric"
            maxLength={9}
            placeholder="9 dígitos"
            className="px-4 py-3 rounded-lg bg-white mb-4 border border-[#E0E0E0] text-base"
        />
    );
};