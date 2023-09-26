import { View } from 'react-native';
import { List } from 'react-native-paper';

export default function ListSkill({el}) {
  return (
    <View>
      
      <List.Item 
        title={el.skill}
        description={el.level}
        left={props => <List.Icon {...props} icon="check" />}
      />
    </View>
  )

  
}