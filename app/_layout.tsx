
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="navigation/drawer" />
      <Stack.Screen name="index" />



      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
