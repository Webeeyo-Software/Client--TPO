import { View, FlatList } from 'react-native';
import Header from 'components/ui/Header';
import JobCard from 'components/scheduledCompanies/card';

export default function Index() {
  const jobs = [
    {
      id: '1',
      logo: require('../../../assets/images/micro.png'),
      company: 'Microsoft Corporation',
      type: 'Placement',
      mode: 'Regular',
      date: '04-Aug-2025',
    },
    {
      id: '2',
      logo: require('../../../assets/images/amazon.png'),
      company: 'Amazon',
      type: 'Internship',
      mode: 'Regular',
      date: '04-Aug-2025',
    },
    {
      id: '3',
      logo: require('../../../assets/images/google.png'),
      company: 'Google',
      type: 'Placement',
      mode: 'Regular',
      date: '04-Aug-2025',
    },
    {
      id: '4',
      logo: require('../../../assets/images/google.png'),
      company: 'Facebook',
      type: 'Placement',
      mode: 'Regular',
      date: '04-Aug-2025',
    },
    {
      id: '5',
      logo: require('../../../assets/images/google.png'),
      company: 'Microsoft Corporation',
      type: 'Placement',
      mode: 'Regular',
      date: '04-Aug-2025',
    },
    {
      id: '6',
      logo: require('../../../assets/images/Cisco.png'),
      company: 'Microsoft Corporation',
      type: 'Placement',
      mode: 'Regular',
      date: '04-Aug-2025',
    },
  ];

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Header */}
      <Header title="Scheduled Companies" />

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            logo={item.logo}
            company={item.company}
            type={item.type}
            mode={item.mode}
            date={item.date}
            onApply={() => alert('Applied successfully')}
            onMore={() => alert('More details')}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal:15 }}
      />
    </View>
  );
}
