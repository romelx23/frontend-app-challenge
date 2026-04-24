import { Stack } from "expo-router";

export default function Layout() {
    return (
        <>
            <Stack
                initialRouteName="index"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="transaction" />
                <Stack.Screen name="transfer" />
                <Stack.Screen name="constancy" />
                <Stack.Screen name="confirm" />
                {/* <Stack.Screen name="profile" /> */}
            </Stack>
        </>
    );
}