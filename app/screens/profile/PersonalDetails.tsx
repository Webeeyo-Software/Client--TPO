import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert, ActivityIndicator } from "react-native";
import InputField from "components/ui/InputField";
import PrimaryButton from "components/ui/PrimaryButton";
import Header from "components/ui/Header";
import Dropdown from "components/profile/DropDown";
import { useFetchOptions } from "hooks/UsefetchOption";
import api from "utils/authApi";

type PersonalDetailsProps = {
  fullName: string;
  deptId: string;
  bgId: string;
  nationalityId: string;
  religionId: string;
  categoriesId: string;
  year: string;
  email: string;
  dob: string;
  registrationNo: string;
  aadharNumber: string;
  mobile: string;
  admissionDate: string;
  guardianName: string;
  guardianContact: string;
};

const PersonalDetails: React.FC = () => {
  // Fetch dropdown options
  const { options: religions } = useFetchOptions("/api/profile/religions", "religionName", "id");
  const { options: departments } = useFetchOptions("/api/profile/departments", "deptName", "id");
  const { options: categories } = useFetchOptions("/api/profile/categories", "categoryName", "id");
  const { options: bloodGroups } = useFetchOptions("/api/profile/bloodgroups", "bloodGroup", "id");
  const { options: nationalities } = useFetchOptions("/api/profile/nationalities", "nationalityName", "id");

  const [loading, setLoading] = useState<boolean>(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsProps>({
    fullName: "",
    deptId: "",
    bgId: "",
    nationalityId: "",
    religionId: "",
    categoriesId: "",
    year: "",
    email: "",
    dob: "",
    registrationNo: "",
    aadharNumber: "",
    mobile: "",
    admissionDate: "",
    guardianName: "",
    guardianContact: "",
  });

  const registrationNo = "122102";

  const handleChange = (field: keyof PersonalDetailsProps, value: string | boolean) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: value as string }));
  };

  // ✅ helper to map NAME → ID from options
  const mapNameToId = (options: { label: string; value: string }[], name?: string) => {
    if (!name) return "";
    return options.find((opt) => opt.label === name)?.value || "";
  };

  // ✅ Fetch details and map names → IDs
  const fetchPersonalDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<any>(`/api/PersonalDetails/${registrationNo}`);
      console.log("Fetched personal details:", data);

      if (data) {
        const fullName = [data.fname, data.mname, data.lname].filter(Boolean).join(" ");

        setPersonalDetails({
          fullName: fullName || "",
          deptId: mapNameToId(departments, data.departments?.deptName),
          bgId: mapNameToId(bloodGroups, data.bloodGroups?.bloodGroup),
          nationalityId: mapNameToId(nationalities, data.nationalities?.nationalityName),
          religionId: mapNameToId(religions, data.religions?.religionName),
          categoriesId: mapNameToId(categories, data.categories?.categoryName),
          year: data.year || "",
          email: data.email || "",
          dob: data.dob || "",
          registrationNo: data.registrationNo || "",
          aadharNumber: data.aadharNumber || "",
          mobile: data.mobile || "",
          admissionDate: data.admissionDate || "",
          guardianName: data.guardianName || "",
          guardianContact: data.guardianContact || "",
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

  // ✅ Save details using IDs
  const savePersonalDetails = async () => {
    setLoading(true);
    try {
      const nameParts = personalDetails.fullName.trim().split(" ");
      const fname = nameParts[0] || "";
      const mname = nameParts.length === 3 ? nameParts[1] : "";
      const lname =
        nameParts.length === 3 ? nameParts[2] : nameParts.length === 2 ? nameParts[1] : "";

      const payload = {
        fname,
        mname,
        lname,
        deptId: personalDetails.deptId,
        bgId: personalDetails.bgId,
        nationalityId: personalDetails.nationalityId,
        religionId: personalDetails.religionId,
        categoriesId: personalDetails.categoriesId,
        year: personalDetails.year,
        email: personalDetails.email,
        dob: personalDetails.dob,
        registrationNo: personalDetails.registrationNo,
        aadharNumber: personalDetails.aadharNumber,
        mobile: personalDetails.mobile,
        admissionDate: personalDetails.admissionDate,
        guardianName: personalDetails.guardianName,
        guardianContact: personalDetails.guardianContact,
      };

      const { data } = await api.put(`/api/profile/personal-details/${registrationNo}`, payload);

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

  // 🔄 Run fetch only when options are loaded
  useEffect(() => {
    if (religions.length && departments.length && categories.length && bloodGroups.length && nationalities.length) {
      fetchPersonalDetails();
    }
  }, [religions, departments, categories, bloodGroups, nationalities]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Personal details" />
      <ScrollView showsVerticalScrollIndicator={false} className="mx-5 mt-5">
        {/* Full Name */}
        <InputField
          label="Full Name"
          placeholder="Enter your name"
          value={personalDetails.fullName}
          onChangeText={(val) => handleChange("fullName", val)}
          required
        />

        {/* Email */}
        <InputField
          label="Email Address"
          placeholder="Enter your email"
          value={personalDetails.email}
          onChangeText={(val) => handleChange("email", val)}
          required
        />

        {/* DOB */}
        <InputField
          label="Date of Birth"
          placeholder="DD-MM-YYYY"
          value={personalDetails.dob}
          onChangeText={(val) => handleChange("dob", val)}
          required
        />

        {/* Registration Number */}
        <InputField
          label="Registration Number"
          placeholder="Enter your registration number"
          value={personalDetails.registrationNo}
          onChangeText={(val) => handleChange("registrationNo", val)}
          required
        />

        {/* Aadhaar & Contact */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <InputField
              label="Aadhar Number"
              placeholder="Enter Aadhar"
              value={personalDetails.aadharNumber}
              onChangeText={(val) => handleChange("aadharNumber", val)}
              keyboardType="numeric"
              required
            />
          </View>
          <View className="flex-1 mx-1">
            <InputField
              label="Mobile Number"
              placeholder="+91 XXXXX XXXXX"
              value={personalDetails.mobile}
              onChangeText={(val) => handleChange("mobile", val)}
              keyboardType="phone-pad"
              required
            />
          </View>
        </View>

        {/* Department */}
        <Dropdown
          label="Department"
          value={personalDetails.deptId}
          onValueChange={(val) => handleChange("deptId", val)}
          items={departments}
        />

        {/* Blood Group & Nationality */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <Dropdown
              label="Blood Group"
              value={personalDetails.bgId}
              onValueChange={(val) => handleChange("bgId", val)}
              items={bloodGroups}
            />
          </View>
          <View className="flex-1 mx-1">
            <Dropdown
              label="Nationality"
              value={personalDetails.nationalityId}
              onValueChange={(val) => handleChange("nationalityId", val)}
              items={nationalities}
            />
          </View>
        </View>

        {/* Religion */}
        <Dropdown
          label="Religion"
          value={personalDetails.religionId}
          onValueChange={(val) => handleChange("religionId", val)}
          items={religions}
        />

        {/* Category */}
        <Dropdown
          label="Category"
          value={personalDetails.categoriesId}
          onValueChange={(val) => handleChange("categoriesId", val)}
          items={categories}
        />

        {/* Year & Admission Date */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <Dropdown
              label="Year"
              value={personalDetails.year}
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
              value={personalDetails.admissionDate}
              onChangeText={(val) => handleChange("admissionDate", val)}
              required
            />
          </View>
        </View>

        {/* Guardian Name */}
        <InputField
          label="Guardian Name"
          placeholder="Enter Guardian name"
          value={personalDetails.guardianName}
          onChangeText={(val) => handleChange("guardianName", val)}
          required
        />

        {/* Guardian Contact */}
        <InputField
          label="Guardian Contact Number"
          placeholder="Enter guardian's contact number"
          value={personalDetails.guardianContact}
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
