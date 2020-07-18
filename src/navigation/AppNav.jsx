/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useContext, useState, useEffect } from 'react';
import Geocoder from 'react-native-geocoding';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import orderBy from 'lodash/orderBy';
import { geoCoderKey } from '../utils/keys';
import { UserContext } from '../context/UserContext';
import { StoresContext } from '../context/StoreContext';

import * as api from '../api';
import calculateDistance from '../utils/distance';
import notification from '../utils/notifications';

import ErrorDialog from '../components/ErrorDialog';
import Initializing from '../components/Initializing';
import HomeNav from './HomeNav';
import DrawerScreen from '../screens/Drawer';

const Drawer = createDrawerNavigator();

export default function AppNavigation({ toggleTheme, signOut }) {
  const theme = useTheme();
  const [userState, userDispatch] = useContext(UserContext);
  const [storeState, storeDispatch] = useContext(StoresContext);

  const [init, setInit] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

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
    storeDispatch({ type: 'SET_STORES', payload: orderStores });
    orderStores.forEach((store) => {
      if (store.dist < 50) {
        notification(store.name);
      }
    });
    if (!init) setInit(true);
  }

  function getGeocoder(coords) {
    Geocoder.init(geoCoderKey);
    Geocoder.from(coords.latitude, coords.longitude)
      .then((res) => {
        const addressComponents = res.results[0].address_components;
        const cityObj = addressComponents.map((a) =>
          a.types.find((t) => t === 'administrative_area_level_2') ? a : null
        );
        const stateObj = addressComponents.map((a) =>
          a.types.find((t) => t === 'administrative_area_level_1') ? a : null
        );
        const cityFiltered = cityObj.filter(Boolean);
        const stateFiltered = stateObj.filter(Boolean);
        let changeUser = {
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
        };
        api.getCityByName(changeUser.city.long_name).then((r) => {
          if (r === undefined) {
            setError({
              show: true,
              msg: `Sorry, ${changeUser.city.long_name} has no data in this demo, we are changing to Itajaí / SC / Brazil.`,
            });
            changeUser = {
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
            };
            coords = {
              latitude: -26.9040417,
              longitude: -48.6715267,
            };
          }
          userDispatch({ type: 'SET_USER', payload: changeUser });
          getNearStores(coords);
        });
      })
      .catch((err) => console.warn(err));
  }

  function getInitialCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      if (!userState.user.city.long_name) {
        getGeocoder(coords);
      } else {
        getNearStores(coords);
      }
    });
  }

  useEffect(() => {
    getInitialCoords();
    navigator.geolocation.watchPosition(
      (possiton) => {
        const coords = {
          latitude: possiton.coords.latitude,
          longitude: possiton.coords.longitude,
        };
        getNearStores(coords);
      },
      (err) => console.error(err.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 5,
      }
    );
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
