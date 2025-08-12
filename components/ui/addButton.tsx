import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
interface ButtonProps {
  className?: string; 
}

const AddButton: React.FC<ButtonProps> = ({ className }) => {
    const router=useRouter();
  return (
     <TouchableOpacity className={"absolute bottom-20 right-10 bg-white w-12 h-12 rounded-full justify-center items-center border border-gray-300 shadow-md"}
           onPress={() => router.push('../addTPO')} > 
            <AddButton />
    
            <Ionicons name="add" size={28} color="black" />
          </TouchableOpacity>
          
  );
};

export default AddButton;