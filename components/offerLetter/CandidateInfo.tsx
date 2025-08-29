// components/CandidateInfo.tsx
import { Text } from "react-native";
import InfoCard from "./InfoCard";

const CandidateInfo = () => (
  <InfoCard title="Candidate Information">
    <Text>Name: Aniruddha Bhagade</Text>
    <Text>Reg. No: 2023CS001</Text>
    <Text>Department: Computer Science</Text>
    <Text>Email: aniruddha@example.com</Text>
  </InfoCard>
);

export default CandidateInfo;
