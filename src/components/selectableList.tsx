import { View, Text } from "react-native";
import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";

export const selectableList = (
  dataFieldName: string,
  itemsList: Array<any>,
  selectedItemsId: Array<any>,
  setSelectedItemsId: any
) => {
  const handleListPress = (newItemId: any, htmlElement: any) => {
    if (selectedItemsId.includes(newItemId)) {
      setSelectedItemsId(
        selectedItemsId.filter((author) => author !== newItemId)
      );
      htmlElement.style = styles.item;
    } else {
      setSelectedItemsId((list: Array<any>) => [...list, newItemId]);
      htmlElement.style = styles.selectedItem;
      console.log(selectedItemsId);
    }
  };
  return (
    <View>
      <FlatList
        data={itemsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.item,
              selectedItemsId.includes(item.id) ? styles.selectedItem : {},
            ]}
            onPress={(e) => {
              handleListPress(item.id, e.target);
            }}
          >
            <Text>{item.data[dataFieldName]}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  selectedItem: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "#000000aa",
  },
});
