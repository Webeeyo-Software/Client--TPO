import { View, Text, TouchableOpacity } from "react-native";

export type OffcampusCardProps = {
  company_name: string;
  overview: string;
  location: string;
  date: any;
  description: string;
};

const OffcampusCard: React.FC<OffcampusCardProps> = ({
  company_name,
  overview,
  location,
  date,
  description,
}) => {
  return (
    <View className="bg-white border border-gray-200 rounded-lg p-6 mb-6 mt-8 shadow-2xl h-80 mx-6">

      <Text className="font-bold text-2xl text-center mb-3">
        {company_name}
      </Text>

      <Text className="font-bold text-lg mb-1">{overview}</Text>

      <Text className="text-gray-700-xl mb-1">{location}</Text>
      <Text className="text-gray-700-lg mb-2">{date}</Text>

      <Text className="text-gray-600-lg mb-3" numberOfLines={3}>
        {description}
      </Text>

      <TouchableOpacity className="bg-blue-500 rounded-lg p-2 items-center justify-center ml-10 mr-10 mt-5">
        <Text className="text-white font-medium ">Learn More & Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OffcampusCard;