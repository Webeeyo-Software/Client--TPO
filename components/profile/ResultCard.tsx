import { View, Text } from "react-native";
import InputField from "components/ui/InputField";
import { useState } from "react";

const ResultCard = () => {
  const [academic, setAcademic] = useState("");
  const [semester, setSemester] = useState("");
  const [cpi, setCpi] = useState("");
  const [spi, setSpi] = useState("");
  const [dead, setDead] = useState("");
  const [active, setActive] = useState("");
  const [backlogName, setBacklogName] = useState("");
  const [action, setAction] = useState("");

  return (
    <View className="flex-col  justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 mt-2 mb-2">
      <Text className="text-xl font-semibold mt-4 mb-4">Second Year</Text>

      <InputField
        label="Academic Year"
        placeholder="Enter Academic Year"
        value={academic}
        onChangeText={setAcademic}
        keyboardType="numeric"
      />

      <InputField
        label="Semester"
        placeholder="Enter Semester"
        value={semester}
        onChangeText={setSemester}
        keyboardType="numeric"
      />

      <InputField
        label="CPI"
        placeholder="Enter CPI"
        value={cpi}
        onChangeText={setCpi}
        keyboardType="numeric"
      />

      <InputField
        label="SPI"
        placeholder="Enter SPI"
        value={spi}
        onChangeText={setSpi}
        keyboardType="numeric"
      />

      <InputField
        label="Dead"
        placeholder="Dead Subjects"
        value={dead}
        onChangeText={setDead}
        keyboardType="numeric"
      />

      <InputField
        label="Active"
        placeholder="Active Backlogs"
        value={active}
        onChangeText={setActive}
        keyboardType="numeric"
      />

      <InputField
        label="Backlog Name"
        placeholder="Enter Backlog Name"
        value={backlogName}
        onChangeText={setBacklogName}
      />

      <InputField
        label="Action"
        placeholder="Enter Action"
        value={action}
        onChangeText={setAction}
      />
    </View>
  );
};

export default ResultCard;
