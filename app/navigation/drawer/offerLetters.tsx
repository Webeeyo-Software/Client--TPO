import { useState, useCallback } from "react";
import { View, ScrollView  } from "react-native";
import CandidateInfo from "../../../components/offerLetter/CandidateInfo";
import CompanyInfo from "../../../components/offerLetter/CompanyInfo";
import OfferDetails from "../../../components/offerLetter/OfferDetails";

import Documents from "../../../components/offerLetter/Documents";
import ActionButtons from "../../../components/offerLetter/ActionButtons";
import StatusBadge from "../../../components/offerLetter/StatusBadge";

const OfferLetterScreen: React.FC = () => {
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">("pending");

  const handleAccept = useCallback(() => setStatus("accepted"), []);
  const handleReject = useCallback(() => setStatus("rejected"), []);

  return (
    <ScrollView className="flex-1 bg-[#f8f9fa] px-4 pt-10">
      <CandidateInfo />
      <CompanyInfo />
      <OfferDetails />
      <Documents />
      <ActionButtons onAccept={handleAccept} onReject={handleReject} />
      <StatusBadge status={status} />
    </ScrollView>

  );
};

export default OfferLetterScreen;
