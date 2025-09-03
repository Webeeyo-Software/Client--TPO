// import { View, Text } from "react-native";
// import InputField from "components/ui/InputField";
// import ExaminationDetailsProps from "app/screens/profile/ExaminationDetails";

// type ResultCardProps = {
//   year: string;
//   academicYear: string;
//   semester: string;
//   cpi: string;
//   spi: string;
//   deadBacklog: number;
//   activeBacklog: number;
//   backlogName: string | null;
//   action: string | null;
//   onChangeText: (field: keyof ExaminationDetailsProps, value: string | number | null) => void;
//   // separate change handlers
 
// };

// const ResultCard: React.FC<ResultCardProps> = ({
//   year,
//   academicYear,
//   semester,
//   cpi,
//   spi,
//   deadBacklog,
//   activeBacklog,
//   backlogName,
//   action,
//  onChangeText
  
// }) => {
//   return (
//     <View className="flex-col justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 mt-2 mb-2">
//       <Text className="text-xl font-semibold mt-4 mb-4">{year}</Text>

//       <InputField
//         label="Academic Year"
//         placeholder="Enter Academic Year"
//         value={academicYear}
//         onChangeText={(value) => onChangeText("academicYear", value)}
//         keyboardType="numeric"
//       />

//       <InputField
//         label="Semester"
//         placeholder="Enter Semester"
//         value={semester}
//         onChangeText={(value) => onChangeText("semester", value)}
//         keyboardType="numeric"
//       />

//       <InputField
//         label="CPI"
//         placeholder="Enter CPI"
//         value={cpi}
//         onChangeText={(value) => onChangeText("cpi", value)}
//         keyboardType="numeric"
//       />

//       <InputField
//         label="SPI"
//         placeholder="Enter SPI"
//         value={spi}
//         onChangeText={(value) => onChangeText("spi", value)}
//         keyboardType="numeric"
//       />

//       <InputField
//         label="Dead Backlogs"
//         placeholder="Enter Dead Backlogs"
//         value={String(deadBacklog)}
//         onChangeText={(value) => onChangeText("deadBacklog", Number(value))}
//         keyboardType="numeric"
//       />

//       <InputField
//         label="Active Backlogs"
//         placeholder="Enter Active Backlogs"
//         value={String(activeBacklog)}
//         onChangeText={onChangeText.bind(null, "activeBacklog")}
//         keyboardType="numeric"
//       />

//       <InputField
//         label="Backlog Name"
//         placeholder="Enter Backlog Name"
//         value={backlogName || ""}
//         onChangeText={onChangeText.bind(null, "backlogName")}
//       />

//       <InputField
//         label="Action"
//         placeholder="Enter Action"
//         value={action || ""}
//         onChangeText={onChangeText.bind(null, "action")}
//       />
//     </View>
//   );
// };

// export default ResultCard;
