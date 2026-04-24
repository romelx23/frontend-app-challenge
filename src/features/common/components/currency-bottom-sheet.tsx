import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Option } from '../../home/components/custom-currency-select';

interface CurrencyBottomSheetProps {
    visible: boolean;
    onSelect: (option: string) => void;
    onClose: () => void;
    options: Option[]
}

export function CurrencyBottomSheet({ visible, onSelect, onClose, options }: CurrencyBottomSheetProps) {
    // const options = ['Soles', 'Dólares'];

    return (
        <Modal visible={visible} transparent animationType="slide"
        >
            <TouchableWithoutFeedback onPress={onClose}>

                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white rounded-t-2xl p-5">
                        {options.map((opt) => (
                            <TouchableOpacity
                                key={opt.value}
                                className="py-4 border-b border-gray-200"
                                onPress={() => onSelect(opt.value)}
                            >
                                <Text className="text-lg text-center">{opt.label}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={onClose} className="py-4">
                            <Text className="text-red-500 text-center">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}