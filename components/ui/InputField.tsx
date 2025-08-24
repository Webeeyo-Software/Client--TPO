import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextInputProps,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputType =
  | "text"
  | "password"
  | "textarea"
  | "date"
  | "email"
  | "number";

interface InputFieldProps
  extends Omit<TextInputProps, "secureTextEntry" | "multiline"> {
  label?: string; // Made optional
  placeholder?: string;
  type?: InputType;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  maxLength?: number;
  showDropdown?: boolean;
  renderIcon?: (showPassword: boolean, toggle: () => void) => React.ReactNode;
  frontIcon?: React.ReactNode; // Leading icon
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "",
  type = "text",
  value,
  onChangeText,
  required = false,
  maxLength,
  renderIcon,
  keyboardType,
  frontIcon,
  ...rest
  
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const secureTextEntry = isPassword && !showPassword;
  const multiline = type === "textarea";

  const resolvedKeyboardType = keyboardType
    ? keyboardType
    : type === "email"
    ? "email-address"
    : type === "number"
    ? Platform.OS === "ios"
      ? "numbers-and-punctuation"
      : "numeric"
    : type === "date"
    ? "default"
    : "default";

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <View className="mb-4">
      {/* Render label only if provided */}
      {label ? (
        <Text className="text-m text-gray-700 mb-1 font-semibold">
          {label}
          {required && <Text className="text-red-600"></Text>}
        </Text>
      ) : null}

      <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-3">
        {/* Front icon if passed */}
        {frontIcon ? <View className="mr-3">{frontIcon}</View> : null}

        <TextInput
          style={{ flex: 1 }}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          keyboardType={resolvedKeyboardType}
          placeholderTextColor="#9ca3af"
          {...rest}
          accessibilityLabel={label ? label + (required ? " required" : "") : placeholder}
          className="text-base text-gray-900 p-0 m-0"
        />

        {/* Password eye toggle */}
        {isPassword && (
          <TouchableOpacity
            onPress={toggleShowPassword}
            activeOpacity={0.7}
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            accessibilityRole="button"
            className="ml-3"
          >
            {renderIcon ? (
              renderIcon(showPassword, toggleShowPassword)
            ) : (
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9ca3af"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
{/* <InputField
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        required
      /> */}

//       {/* Password input with show/hide */}
//       <InputField
//         label="Password"
//         placeholder="Enter your password"
//         type="password"
//         value={password}
//         onChangeText={setPassword}
//         required
//       />

//       {/* Textarea multiline input */}
//       <InputField
//         label="Bio"
//         placeholder="Tell us about yourself"
//         type="textarea"
//         value={bio}
//         onChangeText={setBio}
//       />

//       {/* Email input */}
//       <InputField
//         label="Email"
//         placeholder="email@example.com"
//         type="email"
//         value={email}
//         onChangeText={setEmail}
//       />

//       {/* Number input */}
//       <InputField
//         label="Age"
//         placeholder="Enter your age"
//         type="number"
//         value={age}
//         onChangeText={setAge}
//       />