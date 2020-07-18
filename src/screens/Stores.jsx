/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from 'react-native';
import { StoresContext } from '../context/StoreContext';
import Store from '../components/Store';

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
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
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
