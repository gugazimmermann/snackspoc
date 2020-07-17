/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  Switch,
  Button,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import getStyles from '../styles/drawer';

const avatar = require('../../assets/avatar/josesilva.png');

const DrawerScreen = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.drawerContent}>
        <View>
          <View style={styles.userInfoSection}>
            <Avatar.Image source={avatar} size={50} />
            <Title style={styles.title}>{user.name}</Title>
            <Caption style={styles.caption}>{user.email}</Caption>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  202
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  159
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name='account-outline'
                  color={color}
                  size={size}
                />
              )}
              label='Profile'
              onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name='tune' color={color} size={size} />
              )}
              label='Preferences'
              onPress={() => props.navigation.navigate('Preferences')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name='bookmark-outline'
                  color={color}
                  size={size}
                />
              )}
              label='Bookmarks'
              onPress={() => {}}
            />
          </Drawer.Section>
        </View>
        <Drawer.Section title='Theme'>
          <View style={styles.preference}>
            <Text>Dark</Text>
            <Switch value={theme.dark} onValueChange={props.toggleTheme} />
          </View>
        </Drawer.Section>
      </View>
      <View style={styles.buttonView}>
        <Button
          style={[styles.button, styles.signup]}
          icon='close'
          mode='contained'
          onPress={() => props.signOut()}
        >
          Sign Out
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};

DrawerScreen.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default DrawerScreen;
