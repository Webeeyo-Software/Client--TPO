import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from 'components/ui/Header';
import AddButton from 'components/ui/addButton';

const detailData = [
    { title: 'Placement', year: '2024-25' },
    { title: 'Internship', year: '2024-25' },
    { title: 'Placement And Internship', year: '2024-25' },
    { title: 'Internship + PPO', year: '2024-25' },
    { title: 'Placement', year: '2024-25' },
];

const App = () => {
    const router = useRouter();
    return (


        <View className=" flex-1 px-10 pt-12 bg-white py-20">
            <Header title='Tpo Registration' mode='normal' />
            <ScrollView style={{ marginTop: 10 }}>
                {detailData.map((item, index) => (

                    <View key={index} className=" border border-[#ccc] rounded-lg overflow-hidden mb-3">


                        <View className="bg-[#1877F2] p-3 flex flex-row justify-between items-center">


                            <Text className="text-white font-semibold text-base"> {item.title}</Text>


                            <TouchableOpacity>
                                <Ionicons name="trash-outline" size={20} color="white" />
                            </TouchableOpacity>
                        </View>



                        <View className={"bg-white p-3 flex flex-row justify-between"}>


                            <Text className={"font-[600]"}>Academic Year</Text>


                            <Text className={"text-black"}>{item.year}</Text>

                        </View>
                    </View>
                ))}
            </ScrollView>

            <AddButton />



        </View>

    );
};

export default App;

