import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SavedCredential {
  email: string;
  password: string; // Consider removing password from storage or encrypting it using secure storage APIs
}

interface SavedCredentialsModalProps {
  visible: boolean;
  onClose: () => void;
  credentials: SavedCredential[];
  onSelect: (cred: SavedCredential) => void;
  onDelete: (email: string) => void;
}

const SavedCredentialsModal: React.FC<SavedCredentialsModalProps> = ({
  visible,
  onClose,
  credentials,
  onSelect,
  onDelete,
}) => {
  const confirmDelete = (email: string) => {
    Alert.alert(
      'Delete Saved Credential',
      `Are you sure you want to delete the saved credential for ${email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(email),
        },
      ]
    );
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/60 px-8">
        <View className="w-full bg-white rounded-lg p-6 max-h-[80%]">
          <Text className="text-lg font-semibold mb-4 text-center">Select a Saved Account</Text>

          {credentials.length === 0 ? (
            <Text className="text-center text-gray-500 my-4">No saved accounts available.</Text>
          ) : (
            <FlatList
              data={credentials}
              keyExtractor={(item) => item.email}
              renderItem={({ item }) => (
                <View className="flex-row justify-between items-center border border-gray-300 rounded p-3 mb-2">
                  <Pressable onPress={() => onSelect(item)} className="flex-1">
                    <Text className="text-base text-gray-900">{item.email}</Text>
                  </Pressable>
                  <TouchableOpacity onPress={() => confirmDelete(item.email)} className="ml-4 p-1">
                    <Text className="text-red-600 font-semibold">Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-gray-200 rounded py-2"
          >
            <Text className="text-center text-gray-700 font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SavedCredentialsModal;
