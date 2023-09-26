import { ApolloProvider, gql } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screen/Home';
import Detail from './screen/Detail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import client from './config/apollo';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar style='auto'/>
          <SafeAreaView style={styles.container}>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{title : "Job"}}/>
                <Stack.Screen name="Detail" component={Detail}/>
              </Stack.Navigator>
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
