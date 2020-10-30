import React from 'react';
import {
  View, StyleSheet, Dimensions, FlatList, Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/SimpleAvatar';

const { height, width } = Dimensions.get('screen');

const Bubbles = ({
  pressStory, stories,
}) => {
  const profile = useSelector((state) => state.reducerProfile);
  const { imageURL, user, uid } = profile;

  const renderStory = ({ item }) => (
    <View style={styles.bubbleContainer}>
      <Avatar
        size={height * 0.1}
        url={item.urlAvatar}
        onPress={() => pressStory(item) || null}
      />
      <Text>{item.authorName}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={(
          <View style={styles.bubbleContainer}>
            <Avatar
              size={height * 0.1}
              url={imageURL}
              onPress={() => pressStory(uid) || null}
            />
            <Text>{user.userName}</Text>
          </View>
          )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        data={stories}
        renderItem={renderStory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.13,
    width,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: height * 0.015,
  },
  bubbleContainer: {
    height: height * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    width: height * 0.1,
  },
});
export default Bubbles;
