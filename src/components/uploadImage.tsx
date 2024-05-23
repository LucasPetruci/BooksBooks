import { View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/Firebase-config";
import { auth } from "../firebase/Firebase-config";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";

export default function UploadImage() {
  const [imageProfile, setImageProfile] = useState(null);

  const authen = auth;
  const navigation = useNavigation();

  const submitData = async () => {
    const storageRef = ref(storage, `imageProfile/${authen.currentUser.uid}`);

    const blob = await (await fetch(imageProfile.uri)).blob();

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Profile" }],
        });
        console.log("Uploaded a blob or file!", snapshot);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setImageProfile(source);
      }
    });
  };

  const fetchImage = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `imageProfile/${authen.currentUser.uid}`);
      const url = await getDownloadURL(storageRef);

      setImageProfile({ uri: url });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <View>
      <Image source={imageProfile} style={{ width: 200, height: 200 }} />

      <Button title="Select Image" onPress={selectImage} />
      <Button
        title="Upload Image"
        onPress={() => {
          submitData();
          //delay
        }}
      />
    </View>
  );
}
