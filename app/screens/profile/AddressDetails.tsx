import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import axios from "axios";
import Header from "components/ui/Header";
import InputField from "components/ui/InputField";
import Checkbox from "components/profile/AddressCheckbox";
import PrimaryButton from "components/ui/PrimaryButton";
import Dropdown from "components/profile/DropDown";

type AddressDetailsProps = {
  localAddress: string;
  permanentAddress: string;
  sameAsLocal: boolean;
  pincode: string;
  country: string;
  state: string;
  district: string;
};

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
  const [addressDetails, setAddressDetails] = useState<AddressDetailsProps>({
    localAddress: "",
    permanentAddress: "",
    sameAsLocal: false,
    pincode: "",
    country: "",
    state: "",
    district: "",
  });

  // ✅ Handle input change
  const handleChange = (
    key: keyof AddressDetailsProps,
    value: string | boolean
  ) => {
    setAddressDetails((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ API call to fetch data by ID
  const fetchAddressDetails = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/profile/address-details/122102` // 👈 replace with your real API
      );
      setAddressDetails(response.data); // assumes API returns same structure
    } catch (error) {
      console.error("Error fetching address:", error);
      Alert.alert("Error", "Failed to load address details.");
    }
  };

  // ✅ Call API on mount
  useEffect(() => {
    fetchAddressDetails("123"); // 👈 pass dynamic id (maybe from props or redux)
  }, []);

  // ✅ Auto-fill permanent address if "same as local"
  useEffect(() => {
    if (addressDetails.sameAsLocal) {
      handleChange("permanentAddress", addressDetails.localAddress);
    }
  }, [addressDetails.sameAsLocal, addressDetails.localAddress]);

  // ✅ Submit handler (Save)
  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://your-api.com/address/123`, // 👈 replace with your API
        addressDetails
      );
      Alert.alert("Success", "Address details updated successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      Alert.alert("Error", "Failed to save address details.");
    }
  };

  return (
    <View className="flex-1 bg-white mt-12">
      <Header title="Address Details" />

      <ScrollView className="p-4">
        {/* Local Address */}
        <InputField
          label="Local Address"
          placeholder="Enter your address"
          value={addressDetails.localAddress}
          onChangeText={(text) => handleChange("localAddress", text)}
          required
        />

        {/* Permanent Address */}
        <InputField
          label="Permanent Address"
          placeholder="Enter your address"
          value={addressDetails.permanentAddress}
          onChangeText={(text) => handleChange("permanentAddress", text)}
          editable={!addressDetails.sameAsLocal}
          required
        />

        {/* Checkbox */}
        <Checkbox
          checked={addressDetails.sameAsLocal}
          label="Permanent Address is same as Local Address"
          onToggle={() =>
            handleChange("sameAsLocal", !addressDetails.sameAsLocal)
          }
        />

        {/* Pincode + Country */}
        <View className="flex-row space-x-2">
          <View className="flex-1 mr-2">
            <InputField
              label="Pincode"
              placeholder="Enter pincode"
              value={addressDetails.pincode}
              onChangeText={(text) => handleChange("pincode", text)}
              required
            />
          </View>

          <View className="flex-1">
            <Dropdown
              label="Country"
              value={addressDetails.country}
              onValueChange={(val) => handleChange("country", val)}
              items={COUNTRY_OPTIONS}
            />
          </View>
        </View>

        {/* State + District */}
        <View className="flex-row space-x-2 mt-4">
          <View className="flex-1 mr-2">
            <Dropdown
              label="State"
              value={addressDetails.state}
              onValueChange={(val) => handleChange("state", val)}
              items={STATE_OPTIONS}
            />
          </View>

          <View className="flex-1">
            <Dropdown
              label="District"
              value={addressDetails.district}
              onValueChange={(val) => handleChange("district", val)}
              items={DISTRICT_OPTIONS}
            />
          </View>
        </View>

        {/* Save button */}
        <PrimaryButton label="Save" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default AddressDetailsScreen;
