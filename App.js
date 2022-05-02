import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Toast } from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/Storage";

const intialCountables = [
  { name: "Crow", count: 0 },
  { name: "Woodpecker", count: 3 },
];

export default function App() {
  const [countables, setCountables] = useState(intialCountables);

  useEffect(() => {
    loadCountables().then((result) => setCountables(result));
  }, []);

  const changeCounts = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
    saveCountables(newState);
  };

  const addNewCountable = (name) => {
    for (let i = 0; i < countables.length; i++) {
      if (countables[i].name === name) {
        console.log("Duplicate name");
        //Toast.show("Duplicate names not allowed", {
        //  duration: Toast.durations.LONG,
        //});
        return;
      }
    }
    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
    saveCountables(newState);
  };

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4
  return (
    <RootSiblingParent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCounts={changeCounts}
                index={index}
              />
            ))}
            <View style={{ flex: 1 }} />
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
          <StatusBar style="auto" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
});
