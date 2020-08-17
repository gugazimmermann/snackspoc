import React, { useContext, useState, useCallback, useEffect } from 'react';
import { SafeAreaView, RefreshControl, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { StoresContext } from '../context/StoreContext';
import Store from './components/Store';

export default function Stores() {
  const [storeState] = useContext(StoresContext);
  const [stores, setStores] = useState();
  const [refreshing, setRefreshing] = useState(false);

  function getStores() {
    setStores(storeState.stores);
    setRefreshing(false);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getStores();
  }, []);

  useEffect(() => {
    getStores();
  }, []);

  const renderStore = (store) => <Store store={store} />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <FlatList
        data={stores}
        renderItem={renderStore}
        keyExtractor={(store) => store.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={Divider}
      />
    </SafeAreaView>
  );
}
