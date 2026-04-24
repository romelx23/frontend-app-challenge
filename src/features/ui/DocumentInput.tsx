import { FC, useEffect, useState } from 'react';
import { TextInput } from 'react-native';

interface DocumentInputProps {
    documentType: 'DNI' | 'Pasaporte';
    value?: string;
    onChangeText: (text: string) => void;
}

const DocumentInput: FC<DocumentInputProps> = ({ documentType, value, onChangeText }) => {
    const [displayValue, setDisplayValue] = useState(value || '');

    useEffect(() => {
        // Limpiar el campo cuando cambia el tipo de documento
        setDisplayValue('');
        onChangeText('');
    }, [documentType]);

    const handleChange = (text: string) => {
        // Eliminar todo excepto números
        const numbers = text.replace(/[^0-9]/g, '');

        // Aplicar límite según tipo de documento
        let formatted = numbers;
        if (documentType === 'DNI' && numbers.length > 8) {
            formatted = numbers.substring(0, 8);
        } else if (documentType === 'Pasaporte' && numbers.length > 11) {
            formatted = numbers.substring(0, 11);
        }

        setDisplayValue(formatted);
        onChangeText(formatted);
    };

    return (
        <TextInput
            value={displayValue}
            onChangeText={handleChange}
            keyboardType="numeric"
            maxLength={documentType === 'DNI' ? 8 : 11}
            placeholder={documentType === 'DNI' ? '8 dígitos' : '11 dígitos'}
            className="w-1/2 px-4 py-3 rounded-lg bg-white border border-[#E0E0E0] text-base"
        />
    );
};