import React from "react";
import { View,TouchableOpacity, Text, StyleSheet,Image } from "react-native";
const ProfileCard=()=>{
  return(
    <View className="flex-1 bg-white px-4 py-4 ">
      <Image
        source={require("../../assets/images/abhi.jpg")}
        className="w-24 h-24 rounded-full mx-auto mt-4"
        resizeMode="cover"
      />
    <Text className="text-2xl font-bold text-center ">Abhishek Lohot</Text>
    <Text className="text-center mt-2">Btech-Computer Science Engineering</Text>
    </View>
  );
}
export default ProfileCard;