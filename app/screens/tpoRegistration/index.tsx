import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../../../components/ui/Header';
import DeleteModal from '../../../components/tpoRegistration/DeleteModal';
import AddModal from '../../../components/tpoRegistration/AddModal';
import FloatingAddButton from '../../../components/tpoRegistration/FloatingButton';
import TpoCard from '../../../components/tpoRegistration/TpoCard';

export default function HomeScreen() {
  const [detailData, setDetailData] = useState([
    { title: 'Placement', year: '2024-25' },
    { title: 'Internship', year: '2024-25' },
    { title: 'Placement And Internship', year: '2024-25' },
    { title: 'Internship + PPO', year: '2024-25' },
    { title: 'Placement', year: '2024-25' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAddData = (academicYear: string, placementType: string) => {
    setDetailData((prev) => [...prev, { title: placementType, year: academicYear }]);
    setModalVisible(false);
  };

  const confirmDelete = (index: number) => {
    setDeleteIndex(index);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      setDetailData((prev) => prev.filter((_, i) => i !== deleteIndex));
    }
    setDeleteModalVisible(false);
    setDeleteIndex(null);
  };

  return (
   
      <View className="flex-1 px-4 pt-12 bg-white">
        <Header title="Tpo Registration" mode="normal" />

        <ScrollView className="mt-5 pb-11">
          {detailData.map((item, index) => (
            <TpoCard
              key={index}
              title={item.title}
              year={item.year}
              onDelete={() => confirmDelete(index)}
            />
          ))}
        </ScrollView>

        {/* Floating Add Button */}
        <FloatingAddButton onPress={() => setModalVisible(true)} />

        {/* Add Modal */}
        <AddModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleAddData}
        />

        <DeleteModal
          visible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onDelete={handleDelete}
        />
      </View>
    
  );
}
