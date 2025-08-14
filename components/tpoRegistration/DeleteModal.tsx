import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from '@expo/vector-icons/AntDesign';
interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onCancel, onDelete }) => {
  return (
    <Modal isVisible={visible} backdropColor="#000" backdropOpacity={0.5}>
      <View className="ml-5 h-60 w-96 rounded-lg border border-gray-400 bg-gray-200 p-5">
        <View className="flex-row">
          <View>
            <Text className="mb-3 text-left text-xl  font-bold">Delete registered details</Text>
            <Text className=" mb-5 w-72 text-left text-gray-600">
              Are you sure you want to delete the registration details?{'\n'}
              {'\n'}
              This action cannot be undone.
            </Text>
          </View>
          <View className="mb-5 justify-center">
            <AntDesign name="warning" size={28} color="black" />
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <TouchableOpacity
            className="mr-2 flex-1 items-center rounded-md bg-gray-300 py-3"
            onPress={onCancel}>
            <Text className="font-semibold text-black">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-2 flex-1 items-center rounded-md bg-red-500 py-3"
            onPress={onDelete}>
            <Text className="font-semibold text-white">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
