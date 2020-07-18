/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme, Appbar, Avatar } from 'react-native-paper';
import { UserContext } from '../context/UserContext';
import { uriPath } from '../utils/keys';
import getStyles from '../styles/header';

export default function Header({ scene, previous, navigation }) {
  const [state, dispatch] = useContext(UserContext);
  const theme = useTheme();
  const styles = getStyles(theme);

  const { options } = scene.descriptor;

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={theme} statusBarHeight={0} style={styles.header}>
      {previous ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={{ uri: `${uriPath}avatar/${state.user.avatar}` }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
