import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import Header from "components/ui/Header";
import InputField from "components/ui/InputField";
import Checkbox from "components/profile/AddressCheckbox";
import PrimaryButton from "components/ui/PrimaryButton";
import Dropdown from "components/profile/DropDown";

// ✅ Centralized dropdown data
const COUNTRY_OPTIONS = [
  { label: "India", value: "India" },
  { label: "USA", value: "USA" },
  { label: "UK", value: "UK" },
];

const STATE_OPTIONS = [
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Gujarat", value: "Gujarat" },
  { label: "Karnataka", value: "Karnataka" },
];

const DISTRICT_OPTIONS = [
  { label: "Pune", value: "Pune" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Nagpur", value: "Nagpur" },
];

const AddressDetailsScreen: React.FC = () => {
  const [localAddress, setLocalAddress] = useState("ABC Corner, randomnagar., 452350");
  const [permanentAddress, setPermanentAddress] = useState("ABC Corner, randomnagar., 452350");
  const [sameAsLocal, setSameAsLocal] = useState(false);

  const [pincode, setPincode] = useState("452350");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Pune");

  // ✅ Auto-fill permanent address if "same as local"
  useEffect(() => {
    if (sameAsLocal) {
      setPermanentAddress(localAddress);
    }
  }, [sameAsLocal, localAddress]);

  return (
    <View className="flex-1 bg-white mt-12">
      <Header title="Address Details" />

      <ScrollView className="p-4">
        {/* Local Address */}
        <InputField
          label="Local Address"
          placeholder="Enter your address"
          value={localAddress}
          onChangeText={setLocalAddress}
          required
        />

        {/* Permanent Address */}
        <InputField
          label="Permanent Address"
          placeholder="Enter your address"
          value={permanentAddress}
          onChangeText={setPermanentAddress}
          editable={!sameAsLocal}
          required
        />

        {/* Checkbox */}
        <Checkbox
          checked={sameAsLocal}
          label="Permanent Address is same as Local Address"
          onToggle={() => setSameAsLocal(!sameAsLocal)}
        />

        {/* Pincode + Country */}
        <View className="flex-row space-x-2">
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
            <Dropdown
              label="Country"
              value={country}
              onValueChange={setCountry}
              items={COUNTRY_OPTIONS}
            />
          </View>
        </View>

        {/* State + District */}
        <View className="flex-row space-x-2 mt-4">
          <View className="flex-1 mr-2">
            <Dropdown
              label="State"
              value={state}
              onValueChange={setState}
              items={STATE_OPTIONS}
            />
          </View>

          <View className="flex-1">
            <Dropdown
              label="District"
              value={district}
              onValueChange={setDistrict}
              items={DISTRICT_OPTIONS}
            />
          </View>
        </View>

        {/* Save button */}
        <PrimaryButton label="Save" onPress={() => console.log("Saved")} />
      </ScrollView>
    </View>
  );
};

export default AddressDetailsScreen;
