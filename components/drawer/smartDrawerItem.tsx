import React from "react";
import { DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer";
import { ViewStyle, TextStyle } from "react-native";

type SmartDrawerItemProps = DrawerContentComponentProps & {
  pageName: string;
  label: string;
  icon: ({ color, size }: { color: string; size: number }) => React.ReactNode;
};

export default function SmartDrawerItem({
  pageName,
  label,
  icon,
  navigation,
  state,
}: SmartDrawerItemProps) {
  const isActive = state?.routeNames[state.index] === pageName;

  const containerStyle: ViewStyle = {
    borderRadius: 14,
    marginVertical: 4,
    backgroundColor: isActive ? "#1877F2" : "transparent",
  };

  const labelStyle: TextStyle = {
    color: isActive ? "#FFFFFF" : "#555",
    fontWeight: isActive ? "700" : "500",
    fontSize: 15,
  };

  return (
    <DrawerItem
      label={label}
      labelStyle={labelStyle}
      icon={({ size }) =>
        icon({
          color: isActive ? "#FFFFFF" : "#999",
          size,
        })
      }
      onPress={() => navigation.navigate(pageName as never)}
      style={containerStyle}
    />
  );
}
