import { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NoticeCard from '../../../components/notices/NoticeCard';
import Header from 'components/ui/Header';
import { useRouter } from 'expo-router';
import api from 'utils/authApi';

type Notice = {
  id: string;
  title: string;
  description: string;
  pdfUrl?: string;
};

export default function NoticesScreen() {
  const [page, setPage] = useState<number>(1);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const fetchNotices = async (pageNum: number, searchTerm: string) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageNum),
        search: searchTerm.trim(),
      }).toString();

      const { data: json } = await api.get<Notice[]>(`/api/notice/?${query}`);

      if (Array.isArray(json)) {
        setNotices(json);
      } else {
        setNotices([]);
      }
    } catch (error) {
      console.error('[Fetch Notices] Error:', error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchNotices(1, search);
    }, 700);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    fetchNotices(page, search);
  }, [page]);

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-12">
      <View className="flex-row items-baseline gap-64">
        <Header title="Notices" mode="normal" />
        <TouchableOpacity onPress={() => { }}>
          <Ionicons name="mail-unread-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item }) => (
            <NoticeCard
              title={item.title}
              description={item.description}
              onPress={() => router.push(`screens/notices/NoticeDetailScreen/${item.id}`)}
            />

          )}
        />
      )}
    </SafeAreaView>
  );
}
