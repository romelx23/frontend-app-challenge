import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Option } from '../../home/components/custom-currency-select';

interface BottomSheetProps {
    visible: boolean;
    onSelect: (option: string) => void;
    onClose: () => void;
    options: Option[];
    title: string;
}

export function BottomSheet({ visible, onSelect, onClose, options, title }: BottomSheetProps) {
    // const options = ['Soles', 'Dólares'];

    return (
        <Modal visible={visible} transparent animationType="slide"
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white rounded-t-2xl p-5">
                        <Text className='text-base text-center font-semibold'>{title}</Text>
                        <View className='w-full px-4 bg-gray-300 h-0.5 my-2'></View>
                        {options.map((opt) => (
                            <TouchableOpacity
                                key={opt.value}
                                className="py-1 border-gray-200"
                                onPress={() => onSelect(opt.value)}
                            >
                                <Text className="text-base text-left">{opt.label}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={onClose} className="py-1">
                            <Text className="text-red-500 text-left">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}