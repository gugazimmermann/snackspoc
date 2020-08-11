/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
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
import i18n from '../../i18n';
import { UserContext } from '../context/UserContext';
import { uriPath } from '../utils/keys';
import getStyles from '../styles/drawer';

export default function DrawerScreen(props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.drawerContent}>
        <View>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{ uri: `${uriPath}avatar/${state.user.avatar}` }}
              size={50}
            />
            <Title style={styles.title}>{user.name}</Title>
            <Caption style={styles.caption}>{user.email}</Caption>
            <View style={styles.row}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {user.city.long_name} / {user.state.short_name}
              </Paragraph>
            </View>
            <View style={styles.row}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {i18n.t('drawer.searchingArea')}: {user.area / 1000}km
              </Paragraph>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  202
                </Paragraph>
                <Caption style={styles.caption}>
                  {i18n.t('drawer.following')}
                </Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  159
                </Paragraph>
                <Caption style={styles.caption}>
                  {i18n.t('drawer.followers')}
                </Caption>
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
              label={i18n.t('drawer.profile')}
              onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name='tune' color={color} size={size} />
              )}
              label={i18n.t('drawer.preferences')}
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
              label={i18n.t('drawer.marked')}
              onPress={() => {}}
            />
          </Drawer.Section>
        </View>
        <Drawer.Section title={i18n.t('drawer.theme')}>
          <View style={styles.preference}>
            <Text>{i18n.t('drawer.dark')}</Text>
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
          {i18n.t('drawer.signOut')}
        </Button>
      </View>
    </DrawerContentScrollView>
  );
}
