import { View, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import * as React from 'react';
import { List } from 'react-native-paper';
import ListSkill from "../components/ListSkill";
import { useQuery } from '@apollo/client';
import { DATA_JOB } from '../queries';

const DATA_SKILLS = [
  {
    id: 1,
    skill: "Communication",
    level: "Intermediate"
  },
  {
    id: 2,
    skill: "Teamwork",
    level: "Intermediate"
  },
  {
    id: 3,
    skill: "SQL",
    level: "Advance"
  }
]



export default function Detail ({route}) {
  const {id} = route.params
  const { loading, data, error } = useQuery (DATA_JOB
  , {
    variables: {
      showJobByIdId: id
    }
  })
  if (loading) {
    return <ActivityIndicator/>
  }
  if (error){
    return <Text>Failed Fetching Data....</Text>
  }
  const job = data.showJobById
  return (
    <View style={styles.container}
      >
      <View style={{flex:2}}
      >
        <Card.Cover source={{ uri: job.Company.companyLogo }} />
        <Card.Content style={styles.text}>
          <Text variant="headlineSmall">{job.title}</Text>
          <Text variant="bodyMedium">{job.Company.name}</Text>
          <Text variant="bodyMedium">{job.jobType}</Text>
          <Card.Actions>
            <Button>Apply</Button>
          </Card.Actions>
        </Card.Content>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={{flex:1}}
        >
          <Text variant="titleMedium">JOB DESCRIPTION</Text>
          <Text variant="bodyLarge">{job.description}</Text>
          <List.Section>
            <List.Accordion
              title="Skills">
                {DATA_SKILLS.map (el => {
                  return <ListSkill key={el.id} el={el}/>
                })}
            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    marginTop: 10
  },
  scroll:{
    flex: 1,
    paddingTop: 10
  }
});

