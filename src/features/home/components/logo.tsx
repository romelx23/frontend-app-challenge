import { Image, Text, View } from "react-native"

export const Logo = () => {
    return (
        <View className='w-full flex flex-col justify-center items-center'>
            <Image
                source={require('../../../../assets/kambista-logo.png')}
                className='mx-auto w-44 h-20 object-contain'
                resizeMode="contain"
            />
        </View>
    )
}