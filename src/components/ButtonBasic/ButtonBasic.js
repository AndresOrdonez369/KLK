import React from 'react';
import {
  TouchableOpacity, Image, Text, View,
} from 'react-native';

class ButtonBasic extends React.PureComponent {
  render() {
    const {
      imageStyle, buttonStyle, onPress, text, image, textStyle, icon,
    } = this.props;
    return (
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <Image
          resizeMode="center"
          source={image}
          style={imageStyle}
        />
        <View style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          { text && (<Text style={textStyle}>{text}</Text>) }
          { icon }
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonBasic;
