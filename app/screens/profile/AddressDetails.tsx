import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import Header from "components/ui/Header";
import InputField from "components/ui/InputField";
import Checkbox from "components/profile/AddressCheckbox";
import PrimaryButton from "components/ui/PrimaryButton";
import Dropdown from "components/profile/DropDown";

const BASE_URL = "http://192.168.1.30:3000";

type AddressDetailsProps = {
  localAddress: string;
  permanentAddress: string;
  sameAsLocal: boolean;
  pincode: string;
  country: string;
  state: string;
  district: string;
};

type ApiResponse = {
  success: boolean;
  data: AddressDetailsProps[];
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
  const [loading, setLoading] = useState<boolean>(false);

  const [addressDetails, setAddressDetails] = useState<AddressDetailsProps>({
    localAddress: "",
    permanentAddress: "",
    sameAsLocal: false,
    pincode: "",
    country: "",
    state: "",
    district: "",
  });

  // ✅ Handle input changes in a single place
  const handleChange = (field: keyof AddressDetailsProps, value: string | boolean) => {
    setAddressDetails((prev) => ({
      ...prev,
      [field]: value,
      // Auto-fill permanent address if sameAsLocal = true
      ...(field === "sameAsLocal" && value
        ? { permanentAddress: prev.localAddress }
        : {}),
    }));
  };

  // ✅ Fetch address details from backend
  const fetchAddressDetails = async () => {
    setLoading(true);
    try {
      const registrationNo = "122102";
      const { data: json } = await axios.get<ApiResponse>(
        `${BASE_URL}/api/profile/address-details/${registrationNo}`
      );

      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setAddressDetails(json.data[0]);
      }
    } catch (error) {
      console.error("[Fetch Address Details] Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save address details
  

  useEffect(() => {
    fetchAddressDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

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
          onToggle={() => handleChange("sameAsLocal", !addressDetails.sameAsLocal)}
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
        <PrimaryButton label="Save" onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

export default AddressDetailsScreen;
