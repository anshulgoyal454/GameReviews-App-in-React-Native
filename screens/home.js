import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./reviewForm";

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("ReviewDetails");
  };

  const [review, setReview] = useState([
    {
      title: "Pubg",
      rating: 5,
      body:
        "Very Adventerous game, real time playing with friends makes it even more exiting and also addicting at times ",
      key: "1",
    },
    {
      title: "GTA5",
      rating: 4,
      body:
        "Makes virtual life looks like real, great graphics(I mean seriously). Missions are good too.",
      key: "2",
    },
    {
      title: "Max Payne",
      rating: 4,
      body:
        "Based on a man whose family is murdered by some bad guys, our characted is in a mission to KILL THEM ALL",
      key: "3",
    },
    {
      title: "World War Z",
      rating: 5,
      body: "Very good graphics, based on Zombie Apoclipse",
      key: "4",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const addReview = (review) => {
    review.key = Math.random().toString();
    setReview((currentReviews) => {
      return [review, ...currentReviews];
    });
    setModalOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name='close'
              size={24}
              style={styles.modalToggle}
              onPress={() => setModalOpen(false)}
            />
            <ReviewForm addReview={addReview} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons
        name='add'
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      />

      {/* <Text style={globalStyles.titleText}>Home Screen</Text> */}
      {/* <Button title='go to details' onPress={pressHandler} /> */}
      <FlatList
        data={review}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewDetails", item)}>
            <Card>
              <Text key={item.key} style={globalStyles.titleText}>
                {item.title}
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalContent: {
    flex: 1,
  },
});
