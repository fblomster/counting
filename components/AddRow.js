import { useState } from "react";
import { View, TextInput } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";
import { AddButton } from "./AddButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.addRow}>
      <TextInput placeholder="Enter name" onChangeText={setName} />
      <AddButton
        text="Add"
        submit={() => {
          addNewCountable(name);
        }}
      />
    </View>
  );
};
