import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import Header from 'components/ui/Header';

export default function UploadCVScreen() {
  return (
    <View className="flex-1 px-4 pt-10 bg-white">
      <Header title="Upload CV" mode="normal" className='mt-5'/>
      <View className=" bg-white mt-8">
        <ScrollView contentContainerStyle={{ padding: 15 }}>

          <View className="rounded-lg bg-white shadow-md overflow-hidden">
            {/* Card Header */}
            <View className="bg-blue-500 px-3 py-2">
              <Text className="text-white font-bold text-base">
                Software Developer
              </Text>
            </View>


            <View className="p-3">
              <Text className="font-bold text-blue-500 mb-1">
                CV Name: <Text className="font-normal text-black">Abhishek.pdf</Text>
              </Text>
              <Text className="font-bold text-blue-500 mb-1">
                CV Type: <Text className="font-normal text-black">Software Developer</Text>
              </Text>
              <View className="flex-row items-center">
                <Text className="font-bold text-blue-500">Is Default: </Text>
                <MaterialIcons name="check-circle" size={20} color="green" />
              </View>
            </View>


            <View className="flex-row justify-between px-3 py-2">
              <TouchableOpacity>
                <Feather name="edit-3" size={22} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}