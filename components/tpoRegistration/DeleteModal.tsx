import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onCancel, onDelete }) => {
  return (
    <Modal isVisible={visible} backdropColor="#000" backdropOpacity={0.5}>
      <View className="bg-white rounded-lg p-5 border border-gray-400">
        <Text className="text-lg font-bold mb-3 text-center">
          Delete registered details
        </Text>
        <Text className="text-center text-gray-600 mb-5">
          Are you sure you want to delete the registration details?{"\n"}
          This action cannot be undone.
        </Text>
        <View className="flex flex-row justify-between">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-md items-center mr-2"
            onPress={onCancel}
          >
            <Text className="text-black font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-red-500 py-3 rounded-md items-center ml-2"
            onPress={onDelete}
          >
            <Text className="text-white font-semibold">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
