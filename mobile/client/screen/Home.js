import { useQuery } from '@apollo/client';
import CardBase from "../components/Card";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { DATA_JOBS } from '../queries';


export default function Home ({navigation}) {
  const { loading, data, error } = useQuery (DATA_JOBS)

  if (loading) {
    return <ActivityIndicator/>
  }
  if (error){
    return <Text>Failed Fetching Data....</Text>
  }
  const jobs = data.showAllJob
  return (
    <View style={styles.container}>
      <FlatList 
        data = {
          jobs
        }
        renderItem={({item}) => {
          return <CardBase item={item} navigation={navigation}/>
        }}
        keyExtractor={(item) => item.id}  
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#27445c"
  },
});