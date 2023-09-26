import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet} from 'react-native';


export default function CardBase ({item, navigation}) {
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: item.Company.companyLogo }} />
      <Card.Content style={styles.text}>
        <Text variant="titleLarge">{item.title}</Text>
        <Text variant="bodyMedium">{item.jobType}</Text>
        <Text variant="bodyMedium">{item.Company.name}</Text>
      </Card.Content>
      <Card.Actions>
        <Button 
          onPress={() => navigation.navigate('Detail',
          {
            id: item.id
          })}>Detail</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  },
  text: {
    marginTop: 5
  }
});
