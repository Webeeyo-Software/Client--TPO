// components/InfoCard.tsx
import { View, Text } from "react-native";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => (
  <View className="bg-white p-4 mb-4 rounded-2xl shadow">
    <Text className="text-lg font-bold mb-2">{title}</Text>
    {children}
  </View>
);

export default InfoCard;
