import { View, StyleSheet, FlatList } from "react-native";
import PageContainer from "@/components/PageContainer";
import DefaultText from "@/components/DefaultText";
import HeaderText from "@/components/HeaderText";
import { PropsWithChildren } from "react";
import { ButtonLink } from "@/components/Button";


export default function Index() {
  return (
    <PageContainer>
      <HeaderText>Welcome to Pompom!</HeaderText>
      <View style={styles.content}>
        <DefaultText>
          Whether you're looking to work hard or work smart, using the pomodoro method will get you on top.
        </DefaultText>
        <DefaultText>
          Created by Francesco Cirillo in the late 1980s, the pomodoro method has become a well known and widely used
          method of productivity. It primarily consists of <DefaultText fontWeight="bold">seven</DefaultText> steps:
        </DefaultText>
      </View>
      {/* <FlatList
        style={styles.list}
        data={
          [
            {id: "1", title: "Decide on a task."},
            {id: "2", title: "Set the Pomodoro timer (typically for 25 minutes)."},
            {id: "3", title: "Work on the task."},
            {id: "4", title: "When the timer ends, take a short break (typically 5 - 10 minutes)."},
            {id: "5", title: "When the break time ends, get started again from step 2."},
            {id: "6", title: "After four pomodoros are done, take a longer break (typically 20 to 30 minutes)."},
            {id: "7", title: "When the long break is over, get started again from step 2."},
          ]
        }
        renderItem={({item}) => <ListItem>{item.title}</ListItem>}
        keyExtractor={item => item.id}
      /> */}
      <View style={styles.list}>
        {
          [
            {id: "1", title: "Decide on a task."},
            {id: "2", title: "Set the Pomodoro timer (typically for 25 minutes)."},
            {id: "3", title: "Work on the task."},
            {id: "4", title: "When the timer ends, take a short break (typically 5 - 10 minutes)."},
            {id: "5", title: "When the break time ends, get started again from step 2."},
            {id: "6", title: "After four pomodoros are done, take a longer break (typically 20 to 30 minutes)."},
            {id: "7", title: "When the long break is over, get started again from step 2."},
          ].map((item) => <ListItem key={item.id} index={item.id}>{item.title}</ListItem>)
        }
      </View>
      <View style={styles.buttons}>
        <ButtonLink href="quick-pom" category="primary">
          Get Started with a Quick Pom
        </ButtonLink>
        <ButtonLink href="projects" category="primary">
          Already Familiar? Create a Project!
        </ButtonLink>
      </View>
    </PageContainer>
  );
}

function ListItem({children, index} : PropsWithChildren<{index: string}>) {
  return (
    <View style={styles.listItem}>
      <DefaultText>{index}.</DefaultText>
      <DefaultText>{children}</DefaultText>
    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    display: "flex",
    width: "100%",
    gap: 5
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  list: {
    display: "flex",
    marginLeft: 10,
    marginRight: 15,
    gap: 5
  },
  buttons: {
    gap: 5,
    width: "100%"
  }

})