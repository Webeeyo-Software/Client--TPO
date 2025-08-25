import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Alert
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "components/ui/Header";
import NoticeImage from "components/notices/NoticeImage";
import DescriptionItem from "components/notices/DescriptionItem";
import api from "utils/authApi";

type Notice = {
  id: string;
  title: string;
  description: string;
  pdfUrl?: string;
  imageUrl?: string;
};

export default function NoticeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNoticeDetail = async (noticeId: string) => {
    setLoading(true);
    try {
      const { data } = await api.get<Notice>(`/api/notice/${noticeId}`);
      setNotice(data);
    } catch (error) {
      console.error("[Fetch Notice Detail] Error:", error);
      setNotice(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNoticeDetail(id);
    }
  }, [id]);

  const openPDF = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open PDF link");
      }
    } catch (error) {
      console.error("PDF Open Error:", error);
      Alert.alert("Error", "Failed to open PDF");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!notice) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Notice not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Notice Details" mode="normal" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Use API image if available, else fallback */}
        <NoticeImage
          source={
            notice.imageUrl
              ? { uri: notice.imageUrl }
              : require("../../../../assets/images/1.jpg")
          }
        />

        <View className="px-4 mt-6">
          <Text className="text-xl font-bold text-blue-600 mb-4">
            {notice.title}
          </Text>

          <DescriptionItem title="Description" content={notice.description} />

          {notice.pdfUrl && (
            <View className="mt-6">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                Attachment
              </Text>
              <TouchableOpacity
                onPress={() => openPDF(notice.pdfUrl!)}
                className="bg-blue-600 py-3 px-4 rounded-lg"
              >
                <Text className="text-white text-center font-medium">
                  Open PDF
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
