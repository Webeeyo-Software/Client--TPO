import "./global.css"; 
import { Slot } from "expo-router"; 
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });



export default function App() {
  return <Slot />;
}
