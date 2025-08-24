import { View,Text } from "react-native";
type ProgressCardProps = {
  education: string;
  university: string;
  instituteName: string;
  percentage: string;
  passingYear: string;
  highestQualification: string;
};
const ProgressCard=({ education, university, instituteName, percentage, passingYear, highestQualification }: ProgressCardProps)=>{
    return(
    <View className="mt-3 rounded-lg overflow-hidden border border-gray-300">
        <View className="bg-blue-500 p-3">
          <Text className="text-white font-bold">{highestQualification}</Text>
        </View>
        <View className="p-3 justify-between">
          <Text>Education: {education}</Text>
          <Text>University: {university}</Text>
          <Text>Institute Name: {instituteName}</Text>
          <Text>Percentage: {percentage}</Text>
          <Text>Passing Year: {passingYear}</Text>
          <Text>Highest Qualification: {highestQualification}</Text>
        </View>
      </View>
    )
}
export default ProgressCard;