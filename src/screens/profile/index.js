import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text,
} from 'react-native';
import {
  Icon, Button
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBasic from '../../components/InputBasic/inputBasic';
import ProfilePicture from '../../components/Avatar/ProfilePicture';
import { updateDescription } from './actionCreator';
const { height, width } = Dimensions.get('screen');

const Profile=()=> {
  //state
  const [input, showInput] = useState(false);
  //redux
  const dispatch = useDispatch();
  const profile = useSelector(state => state.reducerProfile);
  const { description } = profile;
  console.log(description)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      <View style={styles.container}>
        <ProfilePicture type="cover" />
        <View style={styles.avatarView}>
          <ProfilePicture type="picture" />
          <Icon />
        </View>
        <View style={styles.settingsIcon}>
          <Icon
            name="settings"
            type="material-icons"
            size={30}
            color="black"
          />
        </View>
        <View style={styles.generalInfo}>
          <View style={styles.textInfo}>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{`10`}</Text>
              <Text style={styles.category}>posts</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{`20`}</Text>
              <Text style={styles.category}>seguidores</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{`30`}</Text>
              <Text style={styles.category}>siguiendo</Text>
            </View>            
          </View>
          <View style={styles.descriptionView}>
            {input ? (
              <InputBasic
                placeholder=""
                value={description}
                changeText={(text) => dispatch(updateDescription(text))}
              />
            ) : (
              <Text style={{ alignText: 'center', flexWrap: 'wrap', marginRight: 10 }}>
                { description || `¡Escribe una descripción para tu perfil!` }
              </Text>
            )}
            <Icon
              name={input ? "checksquare" : "edit"}
              size={30}
              color="black"
              type="ant-design"
              onPress={() => input ? showInput(false) : showInput(true)}
            />
          </View>
          <Button
            title="Mis chats"
            buttonStyle={styles.buttonSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
  }


const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
  },
  avatarView: {
    marginTop: -80,
    height: 90,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  settingsIcon: {
    alignSelf: "flex-end",
    marginTop: -80,
    marginRight: 5,
  },
  generalInfo: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 38,
    height: height * 0.4,
    backgroundColor: 'white'
  },
  textInfo: {
    flexDirection: "row",
    marginTop: height * 0.05,
    justifyContent: "center"
  },
  numbersInfo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: width * 0.07,
    marginRight: width * 0.07,
  },
  textCategory: {
    alignItems: "center",
  },
  descriptionView: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    height: height * 0.1,
    width: width * 0.8,
  },
  buttonSubmit: {
    backgroundColor: '#f22',
    borderRadius: 20,
    width: width * 0.6,
    alignSelf: 'center',
    marginTop: height * 0.04
  },
});

export default Profile;
