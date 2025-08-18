import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface Props {
  label?: string;
  onPress?: () => void;
  variant?: "save" | "stop";
  actionButtons?: {
    onSubmit: () => void;
    onCancel: () => void;
  };
}

const PrimaryButton: React.FC<Props> = ({
  label,
  onPress,
  variant = "save",
  actionButtons,
}) => {
  if (actionButtons) {
  
    return (
      <View style={styles.row}>
        <TouchableOpacity
          className="bg-[#1877F2] rounded-lg py-3 w-1/2 mr-2"
          onPress={actionButtons.onSubmit}
        >
          <Text className="text-white text-center font-semibold text-base">
            Submit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#DC2626] rounded-lg py-3 w-1/2 ml-2"
          onPress={actionButtons.onCancel}
        >
          <Text className="text-white text-center font-semibold text-base">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  const bgColor = variant === "stop" ? "bg-[#DC2626]" : "bg-[#1877F2]";

  return (
    <TouchableOpacity
      className={`${bgColor} rounded-lg py-3 mt-6 w-full`}
      onPress={onPress}
    >
      <Text className="text-white text-center font-semibold text-base">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
