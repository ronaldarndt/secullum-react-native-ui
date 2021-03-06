import * as React from 'react';
import { getTheme } from '../modules/theme';
import { HeaderButton } from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { isTablet } from '../modules/layout';

export interface HeaderDesktopProperties {
  logo: ImageSourcePropType;
  title: string;
  greeting?: string;
  rightButton?: HeaderButton;
}

export class HeaderDesktop extends React.Component<HeaderDesktopProperties> {
  static height = 60;

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.backgroundColor3,
        height: HeaderDesktop.height,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: 0.6,
        shadowRadius: 20,
        shadowColor: theme.shadowColor1
      },
      logo: {
        height: 40,
        width: 40,
        marginHorizontal: 20
      },
      title: {
        color: theme.textColor4,
        fontSize: 24,
        fontFamily: 'MankSans-Medium'
      },
      greeting: {
        color: theme.textColor4,
        fontSize: 18,
        fontFamily: 'Lato-Regular',
        marginLeft: 'auto',
        marginRight: 20
      },
      button: {
        padding: isTablet() ? 14 : 10
      },
      counterContainer: {
        position: 'absolute',
        backgroundColor: theme.counterBackgroundColor,
        height: isTablet() ? 20 : 15,
        width: isTablet() ? 20 : 15,
        top: 5,
        left: 18,
        borderRadius: 50
      },
      counterText: {
        textAlign: 'center',
        color: theme.counterTextColor,
        fontSize: isTablet() ? 15 : 10
      }
    });

    return styles;
  };

  renderRightButton = (button: HeaderButton) => {
    const styles = this.getStyles();
    const theme = getTheme();

    const icon = (
      <>
        <FontAwesome
          nativeID={button.nativeID}
          name={button.icon}
          size={isTablet() ? 30 : 20}
          color={button.disabled ? theme.textColor1 : theme.textColor4}
        />
        {button.counter ? (
          <View style={styles.counterContainer}>
            <Text
              nativeID={`${button.nativeID}-counter`}
              style={styles.counterText}
            >
              {button.counter}
            </Text>
          </View>
        ) : null}
      </>
    );

    if (button.disabled) {
      return <View style={styles.button}>{icon}</View>;
    }

    return (
      <TouchableOpacity onPress={button.onPress} style={styles.button}>
        {icon}
      </TouchableOpacity>
    );
  };

  render() {
    const { logo, title, greeting, rightButton } = this.props;
    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
        {greeting && (
          <Text nativeID="app-greeting-message" style={styles.greeting}>
            {greeting}
          </Text>
        )}
        {rightButton && this.renderRightButton(rightButton)}
      </View>
    );
  }
}
