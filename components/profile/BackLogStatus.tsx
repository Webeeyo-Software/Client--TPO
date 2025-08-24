import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";


export default function BacklogStatus() {
  const [dead, setDead] = useState("");
  const [active, setActive] = useState("");

  

  return (
    <View className="px-4 ">
      {/* Dead Backlogs */}
      <View className="flex-row items-center mt-2">
        <Text className="text-base font-medium">No of dead Backlogs: </Text>
        <TextInput
          value={dead}
          onChangeText={setDead}
          placeholder="0"
          keyboardType="numeric"
          className=" w-12 text-gray-700 text-base mt-"
        />
      </View>

      {/* Active Backlogs */}
      <View className="flex-row items-center ">
        <Text className="text-base font-medium">No of active Backlogs: </Text>
        <TextInput
          value={active}
          onChangeText={setActive}
          placeholder="0"
          keyboardType="numeric"
          className=" w-12 text-gray-700 text-base"
        />
      </View>
    </View>
  );
}