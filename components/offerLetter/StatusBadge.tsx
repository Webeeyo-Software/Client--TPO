
import { Text } from "react-native";

interface Props {
  status: "pending" | "accepted" | "rejected";
}

const StatusBadge: React.FC<Props> = ({ status }) => (
  <Text className="text-center mt-4 text-lg font-extrabold text-gray-700">
    Current Status: {status === "pending" ? "Pending Response" : status.toUpperCase()}
  </Text>
);

export default StatusBadge;
