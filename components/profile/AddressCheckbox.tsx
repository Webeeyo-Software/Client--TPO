// components/Checkbox.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";

interface Props {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

const Checkbox: React.FC<Props> = ({ checked, label, onToggle }) => {
  return (
    <View style={styles.container}>
      <CheckBox value={checked} onValueChange={onToggle} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
});
