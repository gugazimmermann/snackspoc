/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import * as _ from 'lodash';
import Store from '../components/Store';
import { cities } from '../mock';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const calculateDistance = (place, me) => {
  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };
  const lat1 = place.latitude;
  const lon1 = place.longitude;
  const lat2 = me.latitude;
  const lon2 = me.longitude;

  const R = 6371e3; // metres
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return d;
};

export default function Stores() {
  const [refreshing, setRefreshing] = useState(false);
  const [citiesLocations, setCitiesLocations] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      findCoordinates();
      setRefreshing(false);
    });
  }, []);

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = position.coords;
        const getCitiesDinstance = cities.map((city) => {
          const distance = calculateDistance(
            {
              latitude: loc.latitude,
              longitude: loc.longitude,
            },
            {
              latitude: city.coords[0],
              longitude: city.coords[1],
            }
          );
          return { ...city, distance };
        });
        const citiesNearby = _.orderBy(
          getCitiesDinstance,
          ['distance'],
          ['asc']
        );
        setCitiesLocations(citiesNearby);
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    findCoordinates();
  }, []);

  const renderItem = (city) => <Store city={city} />;

  return (
    <SafeAreaView style={styles.container}>
      {citiesLocations && (
        <FlatList
          initialNumToRender={15}
          data={citiesLocations}
          renderItem={renderItem}
          keyExtractor={(i) => i.name}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
