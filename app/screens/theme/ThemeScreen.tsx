import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const ThemeScreen = () => {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <View
      className={`flex-1 justify-center items-center px-6 ${
        isLight ? "bg-white" : "bg-[#1e1e1e]"
      }`}
    >
      <Text
        className={`text-2xl font-bold mb-10 ${
          isLight ? "text-black" : "text-white"
        }`}
      >
        Select Theme
      </Text>

      {/* Light Theme */}
      <TouchableOpacity
        className={`w-3/4 py-4 rounded-xl mb-4 items-center ${
          isLight ? "bg-blue-600" : "bg-gray-500"
        }`}
        onPress={() => setTheme("light")}
      >
        <Text
          className={`${
            isLight ? "text-white font-semibold" : "text-gray-300 font-semibold"
          }`}
        >
          Light Theme
        </Text>
      </TouchableOpacity>

      {/* Dark Theme */}
      <TouchableOpacity
        className={`w-3/4 py-4 rounded-xl mb-4 items-center ${
          isDark ? "bg-blue-600" : "bg-gray-500"
        }`}
        onPress={() => setTheme("dark")}
      >
        <Text
          className={`${
            isDark ? "text-white font-semibold" : "text-gray-300 font-semibold"
          }`}
        >
          Dark Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeScreen;
