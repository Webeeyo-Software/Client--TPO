import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import InputField from "components/ui/InputField";
import Header from "components/ui/Header";
import PrimaryButton from "components/ui/PrimaryButton";
import InputFieldCalendar from "components/profile/InputFieldCalender";

const PersonalDetails = () => {
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [nationality, setNationality] = useState("");
  const [language, setLanguage] = useState("");
  const [religion, setReligion] = useState("");
  const [category, setCategory] = useState("");
  const [yearOfPassing, setYearOfPassing] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [contact, setContact] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState("");

  return (
    <View className="flex-1 bg-white px-2">
      <Header title="Personal Details" />

      {/* Scrollable form fields */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputField
          label="Full Name"
          placeholder="Enter your name"
          value={fullName}
          onChangeText={setFullName}
          required
        />

        <InputField
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          required
        />

        {/* <InputField
          label="Date of Birth"
          placeholder="DD-MM-YYYY"
          value={dob}
          onChangeText={setDob}
          required
        /> */}
        <InputFieldCalendar
         label="Date of Birth"
         value={dob}
         onChange={setDob}
         />
        

        <InputField
          label="Registration Number"
          placeholder="Enter your registration number"
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
          required
        />

        {/* Aadhar & Contact */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <InputField
              label="Aadhar Number"
              placeholder="Enter Aadhar"
              value={aadharNumber}
              onChangeText={setAadharNumber}
              keyboardType="numeric"
              required
            />
          </View>
          <View className="flex-1 mx-1">
            <InputField
              label="Contact Number"
              placeholder="+91 XXXXX XXXXX"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
              required
            />
          </View>
        </View>

        {/* PAN & Department */}
        <View className="flex-row justify-between">
          <View className="flex-1 mx-1">
            <InputField
              label="PAN Number"
              placeholder="Enter PAN"
              value={panNumber}
              onChangeText={setPanNumber}
              required
            />
          </View>
          <View className="flex-1 mx-1">
            <Text className="text-sm font-medium mb-1">Department</Text>
            <View className="border border-gray-300 rounded-lg px-2 justify-center h-12">
              <RNPickerSelect
                onValueChange={setDepartment}
                value={department}
                items={[
                  { label: "Computer", value: "computer" },
                  { label: "IT", value: "it" },
                  { label: "Mechanical", value: "mechanical" },
                  { label: "Civil", value: "civil" },
                  { label: "Electrical", value: "electrical" },
                  { label: "Electronics", value: "electronics" },
                  { label: "Chemical", value: "chemical" },
                  { label: "Production", value: "production" },
                  { label: "Textile", value: "textile" },
                  { label: "Automobile", value: "automobile" },
                  { label: "Other", value: "other" },
                ]}
                placeholder={{ label: "Select Department", value: null }}
              />
            </View>
          </View>
        </View>

        {/* Blood Group & Nationality */}
        <View className="flex-row justify-between mt-3">
          <View className="flex-1 mx-1">
            <Text className="text-sm font-medium mb-1">Blood Group</Text>
            <View className="border border-gray-300 rounded-lg px-2 justify-center h-12">
              <RNPickerSelect
                onValueChange={setBloodGroup}
                value={bloodGroup}
                items={[
                  { label: "A+", value: "A+" },
                  { label: "B+", value: "B+" },
                  { label: "O+", value: "O+" },
                  { label: "AB+", value: "AB+" },
                  { label: "AB-", value: "AB-" },
                  { label: "O-", value: "O-" },
                  { label: "A-", value: "A-" },
                  { label: "B-", value: "B-" },
                ]}
                placeholder={{ label: "Select Blood Group", value: null }}
              />
            </View>
          </View>
          <View className="flex-1 mx-1">
            <Text className="text-sm font-medium mb-1">Nationality</Text>
            <View className="border border-gray-300 rounded-lg px-2 justify-center h-12">
              <RNPickerSelect
                onValueChange={setNationality}
                value={nationality}
                items={[
                  { label: "Indian", value: "indian" },
                  { label: "American", value: "american" },
                  { label: "British", value: "british" },
                  { label: "Canadian", value: "canadian" },
                  { label: "Australian", value: "australian" },
                  { label: "Chinese", value: "chinese" },
                  { label: "Japanese", value: "japanese" },
                  { label: "German", value: "german" },
                  { label: "French", value: "french" },
                  { label: "Other", value: "other" },
                ]}
                placeholder={{ label: "Select Nationality", value: null }}
              />
            </View>
          </View>
        </View>

        {/* Language & Religion */}
        <View className="flex-row justify-between mt-3">
          <View className="flex-1 mx-1">
            <Text className="text-sm font-medium mb-1">Language</Text>
            <View className="border border-gray-300 rounded-lg px-2 justify-center h-12">
              <RNPickerSelect
                onValueChange={setLanguage}
                value={language}
                items={[
                  { label: "English", value: "english" },
                  { label: "Hindi", value: "hindi" },
                  { label: "Marathi", value: "marathi" },
                  { label: "Gujarati", value: "gujarati" },
                  { label: "Bengali", value: "bengali" },
                  { label: "Tamil", value: "tamil" },
                  { label: "Telugu", value: "telugu" },
                  { label: "Kannada", value: "kannada" },
                  { label: "Malayalam", value: "malayalam" },
                  { label: "Punjabi", value: "punjabi" },
                  { label: "Other", value: "other" },
                ]}
                placeholder={{ label: "Select Language", value: null }}
              />
            </View>
          </View>
          <View className="flex-1 mx-1">
            <Text className="text-sm font-medium mb-1">Religion</Text>
            <View className="border border-gray-300 rounded-lg px-2 justify-center h-12">
              <RNPickerSelect
                onValueChange={setReligion}
                value={religion}
                items={[
                  { label: "Hindu", value: "hindu" },
                  { label: "Muslim", value: "muslim" },
                  { label: "Christian", value: "christian" },
                  { label: "Sikh", value: "sikh" },
                  { label: "Buddhist", value: "buddhist" },
                  { label: "Jain", value: "jain" },
                  { label: "Zoroastrian", value: "zoroastrian" },
                  { label: "Jewish", value: "jewish" },
                  { label: "Other", value: "other" },
                ]}
                placeholder={{ label: "Select Religion", value: null }}
              />
            </View>
          </View>
        </View>

        {/* Category & Year of Passing */}
        <View className="flex-row justify-between mt-3">
          <View className="flex-1 mx-1">
            <Text className="text-sm font-medium mb-1">Category</Text>
            <View className="border border-gray-300 rounded-lg px-2 justify-center h-12">
              <RNPickerSelect
                onValueChange={setCategory}
                value={category}
                items={[
                  { label: "General", value: "general" },
                  { label: "OBC", value: "obc" },
                  { label: "SC", value: "sc" },
                  { label: "ST", value: "st" },
                  { label: "EWS", value: "ews" },
                  { label: "Other", value: "other" },
                ]}
                placeholder={{ label: "Select Category", value: null }}
              />
            </View>
          </View>
          <View className="flex-1 mx-1">
            <Text className="text-sm font-medium mb-1">Year of Passing</Text>
            <View className="border border-gray-300 rounded-lg px-2 justify-center h-12">
              <RNPickerSelect
                onValueChange={setYearOfPassing}
                value={yearOfPassing}
                items={[
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                  { label: "2025", value: "2025" },
                ]}
                placeholder={{ label: "Select Year of Passing", value: null }}
              />
            </View>
          </View>
        </View>

        {/* Year & Admission Date */}
        <View className="flex-row justify-between mt-3">
          <View className="flex-1 mx-1">
            <Text className="text-sm font-medium mb-1">Year</Text>
            <View className="border border-gray-300 rounded-lg px-2 justify-center h-12">
              <RNPickerSelect
                onValueChange={setYear}
                value={year}
                items={[
                  { label: "First Year", value: "1" },
                  { label: "Second Year", value: "2" },
                  { label: "Third Year", value: "3" },
                  { label: "Final Year", value: "4" },
                ]}
                placeholder={{ label: "Select Year", value: null }}
              />
            </View>
          </View>
          <View className="flex-1 mx-1">
            {/* <InputField
              label="Admission Date"
              placeholder="DD-MM-YYYY"
              value={admissionDate}
              onChangeText={setAdmissionDate}
            /> */}
            <InputFieldCalendar
             label="Admission Date"
             value={admissionDate}
             onChange={setAdmissionDate}
             />
          </View>
        </View>

        {/* Guardian */}
        <InputField
          label="Guardian Name"
          placeholder="Enter Guardian name"
          value={guardianName}
          onChangeText={setGuardianName}
          required
        />

        <InputField
          label="Guardian Contact Number"
          placeholder="Enter guardian's contact number"
          value={guardianContact}
          onChangeText={setGuardianContact}
          keyboardType="phone-pad"
          required
        />

        <View className="mt-5 mb-10">
          <PrimaryButton label="Save" onPress={() => {}} />
        </View>
      </ScrollView>
    </View>
  );
};  
export default PersonalDetails;