import React, { useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { View, TouchableOpacity, Alert } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Text,
  Drawer,
  Switch,
  Button,
  Divider,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../../i18n';
import { UserContext } from '../context/UserContext';
import getStyles from '../styles/drawer';

export default function DrawerScreen(props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [{ user }, dispatch] = useContext(UserContext);
  const { toggleTheme } = props;

  async function handleCamera() {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const cameraRollPermission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (
      cameraPermission.status === 'granted' &&
      cameraRollPermission.status === 'granted'
    ) {
      const photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!photo.cancelled) {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        dispatch({
          type: 'SET_USER',
          payload: {
            ...user,
            avatar: asset.uri,
          },
        });
      }
    }
  }

  async function handleImagePicker() {
    const permission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permission.granted === false) {
      console.warn('Permission to access camera roll is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!pickerResult.cancelled) {
      dispatch({
        type: 'SET_USER',
        payload: {
          ...user,
          avatar: pickerResult.uri,
        },
      });
    }
  }

  const openAvatar = () =>
    Alert.alert(
      'Mudar Avatar',
      'Escolha a origem',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Escolher na Galeria',
          onPress: handleImagePicker,
        },
        {
          text: 'Nova Foto',
          onPress: handleCamera,
        },
      ],
      { cancelable: true }
    );

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <Drawer.Section style={styles.drawerSection}>
        <View style={styles.userInfoSection}>
          <TouchableOpacity onPress={openAvatar} style={styles.avatar}>
            <Avatar.Image source={{ uri: user.avatar }} size={150} />
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <View style={styles.row}>
            <Text>
              {user.city.long_name} / {user.state.short_name}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              {i18n.t('drawer.searchingArea')}: {user.area / 1000} km
            </Text>
          </View>
        </View>
      </Drawer.Section>

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
        <Divider />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name='tune' color={color} size={size} />
          )}
          label={i18n.t('drawer.preferences')}
          onPress={() => props.navigation.navigate('Preferences')}
        />
        <Divider />
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

      <Drawer.Section title={i18n.t('drawer.theme')}>
        <View style={styles.preference}>
          <Text>{i18n.t('drawer.dark')}</Text>
          <Switch value={theme.dark} onValueChange={toggleTheme} />
        </View>
      </Drawer.Section>

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
