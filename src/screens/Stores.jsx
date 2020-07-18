/* eslint-disable no-unused-vars */
import React, { useContext, useState, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from 'react-native';
import { StoresContext } from '../context/StoreContext';
import Store from './components/Store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Stores() {
  const [storeState, storeDispatch] = useContext(StoresContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderStore = (store) => <Store store={store} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={storeState.stores}
        renderItem={renderStore}
        keyExtractor={(store) => store.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
