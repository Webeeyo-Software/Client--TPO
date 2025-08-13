import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FloatingAddButtonProps {
  onPress: () => void;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="absolute bottom-20 right-10 bg-white w-12 h-12 rounded-full justify-center items-center border border-gray-300 shadow-md"
      onPress={onPress}
    >
      <Ionicons name="add" size={28} color="black" />
    </TouchableOpacity>
  );
};

export default FloatingAddButton;
