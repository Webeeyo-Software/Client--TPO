import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface AddModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (academicYear: string, placementType: string) => void;
}

const AddModal: React.FC<AddModalProps> = ({ visible, onClose, onSave }) => {
  const [academicYearDropdown, setAcademicYearDropdown] = useState(false);
  const [placementTypeDropdown, setPlacementTypeDropdown] = useState(false);
  const [academicYear, setAcademicYear] = useState('');
  const [placementType, setPlacementType] = useState('');

  const handleSave = () => {
    if (academicYear && placementType) {
      onSave(academicYear, placementType);
      setAcademicYear('');
      setPlacementType('');
      setAcademicYearDropdown(false);
      setPlacementTypeDropdown(false);
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <Modal isVisible={visible} backdropColor="#000" backdropOpacity={0.5}>
      <View className="ml-5 h-auto w-96 rounded-lg border border-gray-400 bg-gray-200 p-5">
        <Text className="text-lg font-bold mb-5 text-center">
          Add Tpo Registration
        </Text>

        <Text className="text-base font-semibold mb-1.5">Academic year</Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-md p-3 mb-2"
          onPress={() => setAcademicYearDropdown(!academicYearDropdown)}
        >
          <Text className="text-base text-gray-500">
            {academicYear || 'Choose Academic year'}
          </Text>
        </TouchableOpacity>
        {academicYearDropdown && (
          <View className="border border-gray-300 rounded-md mb-4">
            {['2024-25', '2025-26'].map((year) => (
              <TouchableOpacity
                key={year}
                className="p-3"
                onPress={() => {
                  setAcademicYear(year);
                  setAcademicYearDropdown(false);
                }}
              >
                <Text>{year}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text className="text-sm font-semibold mb-1.5">Placement type</Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-md p-3 mb-2"
          onPress={() => setPlacementTypeDropdown(!placementTypeDropdown)}
        >
          <Text className="text-sm text-gray-500">
            {placementType || 'Choose Placement type'}
          </Text>
        </TouchableOpacity>
        {placementTypeDropdown && (
          <View className="border border-gray-300 rounded-md mb-4">
            {['Placement', 'Internship + PPO'].map((type) => (
              <TouchableOpacity
                key={type}
                className="p-3"
                onPress={() => {
                  setPlacementType(type);
                  setPlacementTypeDropdown(false);
                }}
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="flex flex-row justify-between mt-2">
          <TouchableOpacity
            className="flex-1 bg-[#1E6DFF] py-3 rounded-md items-center mr-2"
            onPress={handleSave}
          >
            <Text className="text-white font-semibold">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-gray-300 py-3 rounded-md items-center ml-2"
            onPress={onClose}
          >
            <Text className="text-black font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddModal;
