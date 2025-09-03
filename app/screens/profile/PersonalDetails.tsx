import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import InputField from "components/ui/InputField";
import PrimaryButton from "components/ui/PrimaryButton";
import Header from "components/ui/Header";
import Dropdown from "components/profile/DropDown";
import { useFetchOptions } from "hooks/UsefetchOption";
import api from "utils/authApi";

type PersonalDetailsProps = {
  fullName: string;
  bloodGroup: string;
  nationalityName: string;
  religionName: string;
  categoryName: string;
  year: string;
  email: string;
  dob: string;
  registrationNo: string;
  aadharNumber: string;
  mobile: string;
  admissionDate: string;
  guardianName: string;
  guardianContact: string;
  departmentName: string;
};

const PersonalDetails: React.FC = () => {
  // Fetch dropdown options
  const { options: religions } = useFetchOptions(
    "/api/profile/religions",
    "religionName",
    "id"
  );

  const { options: departments } = useFetchOptions(
    "/api/profile/departments",
    "deptName",
    "id"
  );

  const { options: categories } = useFetchOptions(
    "/api/profile/categories",
    "categoryName",
    "id"
  );

  const { options: bloodGroups } = useFetchOptions(
    "/api/profile/bloodgroups",
    "bloodGroup",
    "id"
  );

  const { options: nationalities } = useFetchOptions(
    "/api/profile/nationalities",
    "nationalityName",
    "id"
  );

  // Form data state
  const [loading, setLoading] = useState<boolean>(false);
  const [PersonalDetails, setPersonalDetails] = useState<PersonalDetailsProps>({
    fullName: "",
    bloodGroup: "",
    nationalityName: "",
    religionName: "",
    categoryName: "",
    year: "",
    email: "",
    dob: "",
    registrationNo: "",
    aadharNumber: "",
    mobile: "",
    admissionDate: "",
    guardianName: "",
    guardianContact: "",
    departmentName: "",
  });

  const registrationNo = "122101";

  const handleChange = (
    field: keyof PersonalDetailsProps,
    value: string | boolean
  ) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Fetch details and combine fname, mname, lname
  const fetchPersonalDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<any>(
        `/api/PersonalDetails/${registrationNo}`
      );

      if (data) {
        const fullName = [data.fname, data.mname, data.lname]
          .filter(Boolean)
          .join(" ");

        setPersonalDetails({
          fullName: fullName || "",
          bloodGroup: data.bloodGroup || "",
          nationalityName: data.nationalityName || "",
          religionName: data.religionName || "",
          categoryName: data.categoryName || "",
          year: data.year || "",
          email: data.email || "",
          dob: data.dob || "",
          registrationNo: data.registrationNo || "",
          aadharNumber: data.aadharNumber || "",
          mobile: data.mobile || "",
          admissionDate: data.admissionDate || "",
          guardianName: data.guardianName || "",
          guardianContact: data.guardianContact || "",
          departmentName: data.departmentName || "",
        });
      } else {
        Alert.alert("Info", "No personal details found");
      }
    } catch (error) {
      console.error("Error fetching personal details:", error);
      Alert.alert("Error", "Failed to fetch Personal Details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save details and split fullName into fname, mname, lname
  const savePersonalDetails = async () => {
    setLoading(true);
    try {
      // Split full name back
      const nameParts = PersonalDetails.fullName.trim().split(" ");
      const fname = nameParts[0] || "";
      const mname = nameParts.length === 3 ? nameParts[1] : "";
      const lname =
        nameParts.length === 3
          ? nameParts[2]
          : nameParts.length === 2
          ? nameParts[1]
          : "";

      const payload = {
        fname,
        mname,
        lname,
        bloodGroup: PersonalDetails.bloodGroup,
        nationality: PersonalDetails.nationalityName,
        religion: PersonalDetails.religionName,
        category: PersonalDetails.categoryName,
        year: PersonalDetails.year,
        email: PersonalDetails.email,
        dob: PersonalDetails.dob,
        registrationNo: PersonalDetails.registrationNo,
        aadharNumber: PersonalDetails.aadharNumber,
        mobile: PersonalDetails.mobile,
        admissionDate: PersonalDetails.admissionDate,
        guardianName: PersonalDetails.guardianName,
        guardianContact: PersonalDetails.guardianContact,
        departmentName: PersonalDetails.departmentName,
      };

      const { data } = await api.put(
        `/api/profile/personal-details/${registrationNo}`,
        payload
      );

      if (data && data.message) {
        Alert.alert("Success", data.message);
      } else {
        Alert.alert("Error", "Failed to save Personal Details.");
      }
    } catch (error) {
      console.error("Error saving personal details:", error);
      Alert.alert("Error", "Failed to save Personal Details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalDetails();
  }, []);

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Personal details" />
      <ScrollView showsVerticalScrollIndicator={false} className="mx-5 mt-5">
        {/* Full Name */}
        <InputField
          label="Full Name"
          placeholder="Enter your name"
          value={PersonalDetails.fullName}
          onChangeText={(val) => handleChange("fullName", val)}
          required
        />

        {/* Email */}
        <InputField
          label="Email Address"
          placeholder="Enter your email"
          value={PersonalDetails.email}
          onChangeText={(val) => handleChange("email", val)}
          required
        />

        {/* DOB */}
        <InputField
          label="Date of Birth"
          placeholder="DD-MM-YYYY"
          value={PersonalDetails.dob}
          onChangeText={(val) => handleChange("dob", val)}
          required
        />

        {/* Registration Number */}
        <InputField
          label="Registration Number"
          placeholder="Enter your registration number"
          value={PersonalDetails.registrationNo}
          onChangeText={(val) => handleChange("registrationNo", val)}
          required
        />

        {/* Aadhaar & Contact */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <InputField
              label="Aadhar Number"
              placeholder="Enter Aadhar"
              value={PersonalDetails.aadharNumber}
              onChangeText={(val) => handleChange("aadharNumber", val)}
              keyboardType="numeric"
              required
            />
          </View>
          <View className="flex-1 mx-1">
            <InputField
              label="Mobile Number"
              placeholder="+91 XXXXX XXXXX"
              value={PersonalDetails.mobile}
              onChangeText={(val) => handleChange("mobile", val)}
              keyboardType="phone-pad"
              required
            />
          </View>
        </View>

        {/* Department */}
        <Dropdown
          label="Department"
          value={PersonalDetails.departmentName}
          onValueChange={(val) => handleChange("departmentName", val)}
          items={departments}
        />

        {/* Blood Group & Nationality */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <Dropdown
              label="Blood Group"
              value={PersonalDetails.bloodGroup}
              onValueChange={(val) => handleChange("bloodGroup", val)}
              items={bloodGroups}
            />
          </View>
          <View className="flex-1 mx-1">
            <Dropdown
              label="Nationality"
              value={PersonalDetails.nationalityName}
              onValueChange={(val) => handleChange("nationalityName", val)}
              items={nationalities}
            />
          </View>
        </View>

        {/* Religion */}
        <Dropdown
          label="Religion"
          value={PersonalDetails.religionName}
          onValueChange={(val) => handleChange("religionName", val)}
          items={religions}
        />

        {/* Category */}
        <Dropdown
          label="Category"
          value={PersonalDetails.categoryName}
          onValueChange={(val) => handleChange("categoryName", val)}
          items={categories}
        />

        {/* Year & Admission Date */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <Dropdown
              label="Year"
              value={PersonalDetails.year}
              onValueChange={(val) => handleChange("year", val)}
              items={[
                { label: "FE", value: "FE" },
                { label: "SE", value: "SE" },
                { label: "TE", value: "TE" },
                { label: "BE", value: "BE" },
              ]}
            />
          </View>
          <View className="flex-1 mx-1">
            <InputField
              label="Admission Date"
              placeholder="DD-MM-YYYY"
              value={PersonalDetails.admissionDate}
              onChangeText={(val) => handleChange("admissionDate", val)}
              required
            />
          </View>
        </View>

        {/* Guardian Name */}
        <InputField
          label="Guardian Name"
          placeholder="Enter Guardian name"
          value={PersonalDetails.guardianName}
          onChangeText={(val) => handleChange("guardianName", val)}
          required
        />

        {/* Guardian Contact */}
        <InputField
          label="Guardian Contact Number"
          placeholder="Enter guardian's contact number"
          value={PersonalDetails.guardianContact}
          onChangeText={(val) => handleChange("guardianContact", val)}
          keyboardType="phone-pad"
          required
        />
      </ScrollView>
      <View className="mb-10">
        <PrimaryButton label="Save" onPress={savePersonalDetails} />
      </View>
    </View>
  );
};

export default PersonalDetails;
