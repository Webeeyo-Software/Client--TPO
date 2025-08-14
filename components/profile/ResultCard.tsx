import { View, Text } from 'react-native';
import BacklogStatus from './BackLogStatus';
import InputField from './InputField';
import { useState } from 'react';
const ResultCard = () => {
    const [Academic, setAcademic] = useState(0);
    const [semester, setSemester] = useState(0);
    const [CPI, setCPI] = useState(0);
    const [SPI, setSPI] = useState(0);
    const [Dead, setDead] = useState(0);
    const [Active, setActive] = useState(0);
    const [BacklogName, setBacklogName] = useState('');
    const [Action, setAction] = useState('');
  return (
    <View className="bg-white border border-gray-200 p-6 mb-4 mt-8 shadow-xl px-4">
      <Text className="text-xl font-semibold mt-4 mb-4">Second Year</Text>
      <InputField
        label="Academic Year"
        placeholder="-"
        value={Academic}
        onChangeText={text => setAcademic(Number(text))}
        
      />
    <InputField
        label="Semester"
        placeholder=""
        value={semester}
        onChangeText={text => setSemester(Number(text))}
        
      />
      <InputField
        label="CPI"
        placeholder=""
        value={CPI}
        onChangeText={text => setCPI(Number(text))}
        
      />
      <InputField
        label="SPI"
        placeholder=""
        value={SPI}
        onChangeText={text => setSPI(Number(text))}
        
      />
      <InputField
        label="Dead"
        placeholder=""
        value={Dead}
        onChangeText={text => setDead(Number(text))}
        
      />
      <InputField
        label="Active"
        placeholder=""
        value={Active}
        onChangeText={text => setActive(Number(text))}
        
      />
      <InputField
        label="Backlog Name"
        placeholder="-"
        value={BacklogName}
        onChangeText={text => setBacklogName(String(text))}
        
      />
      <InputField
        label="Action"
        placeholder="-"
        value={Action}
        onChangeText={text => setAction(String(text))}
      />
    </View>
  );
};
export default ResultCard;
