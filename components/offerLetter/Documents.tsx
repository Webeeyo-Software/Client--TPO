
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InfoCard from "./InfoCard";

const Documents = () => (
  <InfoCard title="Documents">
    <TouchableOpacity className="flex-row bg-[#007bff] px-3 py-2 rounded-lg ">
      <Ionicons name="download-outline" size={14} color="#fff" />
      <Text className="text-white font-semibold ml-2">Download Offer Letter</Text>
    </TouchableOpacity>
  </InfoCard>
);

export default Documents;
