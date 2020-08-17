/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import orderBy from 'lodash/orderBy';
import { geoCoderKey } from '../utils/keys';
import { UserContext } from '../context/UserContext';
import { StoresContext } from '../context/StoreContext';
import i18n from '../../i18n';
import * as api from '../api';
import calculateDistance from '../utils/distance';
import notification from '../utils/notifications';
import ErrorDialog from '../components/ErrorDialog';
import Initializing from '../components/Initializing';
import HomeNav from './HomeNav';
import DrawerScreen from '../screens/Drawer';

const DINTANCE_TO_NOTIFY = 50;

const Drawer = createDrawerNavigator();

export default function AppNavigation({ toggleTheme, signOut }) {
  const theme = useTheme();
  const [userState, userDispatch] = useContext(UserContext);
  const [storeState, storeDispatch] = useContext(StoresContext);

  const [init, setInit] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  function storeNotifications(stores) {
    stores.forEach((store) => {
      if (store.dist < DINTANCE_TO_NOTIFY) {
        notification(store.name);
      }
    });
  }

  async function getNearStores(coords) {
    const cities = await api.getAllCities();
    const stores = await api.getAllStores();
    const distanceCities = cities.map((city) => {
      const dist = calculateDistance(coords, {
        latitude: city.coords[0],
        longitude: city.coords[1],
      });
      return { ...city, dist };
    });
    const orderCities = orderBy(distanceCities, ['dist'], ['asc']);
    const citiesArea = orderCities.filter((c) => c.dist < userState.user.area);
    const storesArr = [];
    citiesArea.forEach((city) => {
      stores.forEach((store) => {
        if (store.city === city.id && store.state === city.state) {
          storesArr.push(store);
        }
      });
    });
    const distanceStores = storesArr.map((store) => {
      const dist = calculateDistance(coords, {
        latitude: store.coords[0],
        longitude: store.coords[1],
      });
      return { ...store, dist };
    });
    const orderStores = orderBy(distanceStores, ['dist'], ['asc']);
    storeNotifications(orderStores);
    storeDispatch({ type: 'SET_STORES', payload: orderStores });
    if (!init) setInit(true);
  }

  async function watchPosition() {
    const { status } = await Location.getPermissionsAsync();
    if (status === 'granted') {
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          enableHighAccuracy: true,
          distanceInterval: 1,
        },
        (position) => getNearStores(position.coords)
      );
    }
  }

  async function verifyCity(userChanged) {
    const city = await api.getCityByName(userChanged.city.long_name);
    if (city === undefined) {
      setError({
        show: true,
        msg: i18n.t('geocoder.noData'),
      });
      userChanged = {
        ...userState.user,
        update: false,
        city: {
          long_name: 'Itajaí',
          short_name: 'Itajaí',
        },
        state: {
          long_name: 'Santa Catarina',
          short_name: 'SC',
        },
        coords: {
          latitude: -26.9040417,
          longitude: -48.6715267,
        },
      };
    } else {
      watchPosition();
    }
    getNearStores(userChanged.coords);
    userDispatch({ type: 'SET_USER', payload: userChanged });
  }

  async function getGeocoder(coords) {
    Geocoder.init(geoCoderKey, { language: 'pt-BR' });
    const geocoder = await Geocoder.from(coords);

    const addressComponents = geocoder.results[0].address_components;
    const formattedAddress = geocoder.results[0].formatted_address;
    const cityObj = addressComponents.map((a) =>
      a.types.find((t) => t === 'administrative_area_level_2') ? a : null
    );
    const stateObj = addressComponents.map((a) =>
      a.types.find((t) => t === 'administrative_area_level_1') ? a : null
    );
    const cityFiltered = cityObj.filter(Boolean);
    const stateFiltered = stateObj.filter(Boolean);
    const changedUser = {
      ...userState.user,
      update: true,
      city: {
        long_name: cityFiltered[0].long_name,
        short_name: cityFiltered[0].short_name,
      },
      state: {
        long_name: stateFiltered[0].long_name,
        short_name: stateFiltered[0].short_name,
      },
      formattedAddress,
      coords,
    };

    verifyCity(changedUser);
  }

  async function currentPosition() {
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      enableHighAccuracy: true,
    });
    getGeocoder(position.coords);
  }

  async function askPermissions() {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      currentPosition();
    } else {
      verifyCity(userState.user);
    }
  }

  useEffect(() => {
    askPermissions();
  }, []);

  if (!init) {
    return <Initializing />;
  }

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerScreen
            {...props}
            toggleTheme={toggleTheme}
            signOut={signOut}
          />
        )}
      >
        <Drawer.Screen name='HomeNav' component={HomeNav} />
      </Drawer.Navigator>
      <ErrorDialog theme={theme} data={error} show={setError} />
    </>
  );
}
