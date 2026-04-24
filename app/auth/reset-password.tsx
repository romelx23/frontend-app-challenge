import { router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Linking } from 'react-native';

const ResetPasswordScreen = () => {

    const url = Linking.getInitialURL() || '';
    console.log(url)

    const token = url
    //   const { token } = router.params; // Obtén el token del enlace

    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert('Éxito', 'Tu contraseña ha sido actualizada.');
            } else {
                Alert.alert('Error', result.msg || 'Hubo un problema al restablecer tu contraseña.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ marginBottom: 10 }}>Nueva Contraseña:</Text>
            <TextInput
                secureTextEntry
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 20,
                    paddingHorizontal: 10,
                }}
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <Button title="Restablecer Contraseña" onPress={handleResetPassword} />
        </View>
    );
};

export default ResetPasswordScreen;