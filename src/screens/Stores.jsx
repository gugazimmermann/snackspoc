import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { StoresContext } from '../context/StoreContext';
import Store from './components/Store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default function Stores() {
  const [storeState] = useContext(StoresContext);

  const renderStore = (store) => <Store store={store} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={storeState.stores}
        renderItem={renderStore}
        keyExtractor={(store) => store.id}
      />
    </SafeAreaView>
  );
}
