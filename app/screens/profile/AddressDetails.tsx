import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "components/ui/Header";
import InputField from "components/ui/InputField";
import Checkbox from "components/profile/AddressCheckbox";
import PrimaryButton from "components/ui/PrimaryButton";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
const AddressDetailsScreen: React.FC = () => {
  const [localAddress, setLocalAddress] = useState("ABC Corner, randomnagar., 452350");
  const [permanentAddress, setPermanentAddress] = useState("ABC Corner, randomnagar., 452350");
  const [sameAsLocal, setSameAsLocal] = useState(false);
  const [pincode, setPincode] = useState("452350");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [dist, setDist] = useState("Pune");

  useEffect(() => {
    if (sameAsLocal) {
      setPermanentAddress(localAddress);
    }
  }, [sameAsLocal, localAddress]);

  return (
    <View className="flex-1 bg-white">
      <Header title="Address details" />

      <ScrollView className="p-4">
        <InputField
          label="Local Address"
          placeholder="Enter your address"
          value={localAddress}
          onChangeText={setLocalAddress}
          required
        />

        <InputField
          label="Permanent Address"
          placeholder="Enter your address"
          value={permanentAddress}
          onChangeText={setPermanentAddress}
          editable={!sameAsLocal}
          required
        />

        <Checkbox
          checked={sameAsLocal}
          label="Whether Permanent Address is same as Local Address"
          onToggle={() => setSameAsLocal(!sameAsLocal)}
        />

        {/* Pincode + Country */}
        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <InputField
              label="Pincode"
              placeholder="Enter pincode"
              value={pincode}
              onChangeText={setPincode}
              required
            />
          </View>

          <View className="flex-1">
            <Text style={styles.label}>Country</Text>
            <RNPickerSelect
              onValueChange={(value) => setCountry(value)}
              value={country}
              items={[
                { label: "India", value: "India" },
                { label: "USA", value: "USA" },
                { label: "UK", value: "UK" },
              ]}
              useNativeAndroidPickerStyle={false}
              style={pickerStyles}
              Icon={() => <Ionicons name="chevron-down" size={20} color="gray" />}
            />
          </View>
        </View>

        {/* State + District */}
        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Text style={styles.label}>State</Text>
            <RNPickerSelect
              onValueChange={(value) => setState(value)}
              value={state}
              items={[
                { label: "Maharashtra", value: "Maharashtra" },
                { label: "Gujarat", value: "Gujarat" },
                { label: "Karnataka", value: "Karnataka" },
              ]}
              useNativeAndroidPickerStyle={false}
              style={pickerStyles}
              Icon={() => <Ionicons name="chevron-down" size={20} color="gray" />}
            />
          </View>

          <View className="flex-1">
            <Text style={styles.label}>District</Text>
            <RNPickerSelect
              onValueChange={(value) => setDist(value)}
              value={dist}
              items={[
                { label: "Pune", value: "Pune" },
                { label: "Mumbai", value: "Mumbai" },
                { label: "Nagpur", value: "Nagpur" },
              ]}
              useNativeAndroidPickerStyle={false}
              style={pickerStyles}
              Icon={() => <Ionicons name="chevron-down" size={20} color="gray" />}
            />
          </View>
        </View>

        <PrimaryButton label="Save" onPress={() => console.log("Saved")} />
      </ScrollView>
    </View>
  );
};

export default AddressDetailsScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 12,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 12,
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
});
