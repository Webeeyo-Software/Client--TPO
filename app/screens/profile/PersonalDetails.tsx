import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import axios from "axios";
import InputField from "components/ui/InputField";
import PrimaryButton from "components/ui/PrimaryButton";
import Header from "components/ui/Header";
import Dropdown from "components/profile/DropDown";
import {useFetchOptions} from "hooks/UsefetchOption";

type PersonalDetailsProps = {
  fullName: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  category: string;
  year: string;
  email: string;
  dob: string;
  registrationNumber: string;
  aadharNumber: string;
  contact: string;
  admissionDate: string;
  guardianName: string;
  guardianContact: string;
  department: string;
};

const BASE_URL = "http://192.168.1.30:3000";

const PersonalDetails: React.FC = () => {
  // Fetch dropdown options
  const { options: religions } = useFetchOptions(`${BASE_URL}/api/profile/religions`);
  const { options: departments } = useFetchOptions(`${BASE_URL}/api/profile/departments`);
  const { options: categories } = useFetchOptions(`${BASE_URL}/api/profile/categories`);
  const { options: bloodGroups } = useFetchOptions(`${BASE_URL}/api/profile/bloodgroups`);
  const { options: nationalities } = useFetchOptions(`${BASE_URL}/api/profile/nationalities`);

  // Form data state
  const [formData, setFormData] = useState<PersonalDetailsProps>({
    fullName: "",
    bloodGroup: "",
    nationality: "",
    religion: "",
    category: "",
    year: "",
    email: "",
    dob: "",
    registrationNumber: "",
    aadharNumber: "",
    contact: "",
    admissionDate: "",
    guardianName: "",
    guardianContact: "",
    department: "",
  });

  // Update handler
  const handleChange = (key: keyof PersonalDetailsProps, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Submit handler
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/profile/personal-details`, formData);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <View className="flex-1 bg-white p-5 mt-10">
      <Header title="Personal details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Full Name */}
        <InputField
          label="Full Name"
          placeholder="Enter your name"
          value={formData.fullName}
          onChangeText={(val) => handleChange("fullName", val)}
          required
        />

        {/* Email */}
        <InputField
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(val) => handleChange("email", val)}
          required
        />

        {/* DOB */}
        <InputField
          label="Date of Birth"
          placeholder="DD-MM-YYYY"
          value={formData.dob}
          onChangeText={(val) => handleChange("dob", val)}
          required
        />

        {/* Registration Number */}
        <InputField
          label="Registration Number"
          placeholder="Enter your registration number"
          value={formData.registrationNumber}
          onChangeText={(val) => handleChange("registrationNumber", val)}
          required
        />

        {/* Aadhaar & Contact */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <InputField
              label="Aadhar Number"
              placeholder="Enter Aadhar"
              value={formData.aadharNumber}
              onChangeText={(val) => handleChange("aadharNumber", val)}
              keyboardType="numeric"
              required
            />
          </View>
          <View className="flex-1 mx-1">
            <InputField
              label="Contact Number"
              placeholder="+91 XXXXX XXXXX"
              value={formData.contact}
              onChangeText={(val) => handleChange("contact", val)}
              keyboardType="phone-pad"
              required
            />
          </View>
        </View>

        {/* Department */}
        <Dropdown
          label="Department"
          value={formData.department}
          onValueChange={(val) => handleChange("department", val)}
          items={departments}
        />

        {/* Blood Group & Nationality */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <Dropdown
              label="Blood Group"
              value={formData.bloodGroup}
              onValueChange={(val) => handleChange("bloodGroup", val)}
              items={bloodGroups}
            />
          </View>
          <View className="flex-1 mx-1">
            <Dropdown
              label="Nationality"
              value={formData.nationality}
              onValueChange={(val) => handleChange("nationality", val)}
              items={nationalities}
            />
          </View>
        </View>

        {/* Religion */}
        <Dropdown
          label="Religion"
          value={formData.religion}
          onValueChange={(val) => handleChange("religion", val)}
          items={religions}
        />

        {/* Category */}
        <Dropdown
          label="Category"
          value={formData.category}
          onValueChange={(val) => handleChange("category", val)}
          items={categories}
        />

        {/* Year & Admission Date */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <Dropdown
              label="Year"
              value={formData.year}
              onValueChange={(val) => handleChange("year", val)}
              items={[
                { label: "FY", value: "FY" },
                { label: "SY", value: "SY" },
                { label: "TY", value: "TY" },
                { label: "Final", value: "Final" },
              ]}
            />
          </View>
          <View className="flex-1 mx-1">
            <InputField
              label="Admission Date"
              placeholder="DD-MM-YYYY"
              value={formData.admissionDate}
              onChangeText={(val) => handleChange("admissionDate", val)}
              required
            />
          </View>
        </View>

        {/* Guardian Name */}
        <InputField
          label="Guardian Name"
          placeholder="Enter Guardian name"
          value={formData.guardianName}
          onChangeText={(val) => handleChange("guardianName", val)}
          required
        />

        {/* Guardian Contact */}
        <InputField
          label="Guardian Contact Number"
          placeholder="Enter guardian's contact number"
          value={formData.guardianContact}
          onChangeText={(val) => handleChange("guardianContact", val)}
          keyboardType="phone-pad"
          required
        />

        {/* Save Button */}
        <View className="mt-5 mb-10">
          <PrimaryButton label="Save" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalDetails;
