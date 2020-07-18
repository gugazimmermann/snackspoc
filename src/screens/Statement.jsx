/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from 'react-native';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import { UserContext } from '../context/UserContext';
import * as api from '../api';
import Balance from './components/Balance';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default function Statement() {
  const [state] = useContext(UserContext);
  const [balance, setBalance] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function formatBalance(bal) {
    const formatedBalance = [];
    for (const b of bal) {
      const store = await api.getStoreById(b.store);
      const date = moment(b.date).format('DD/MM/YY HH:mm');
      const expirationDate = moment(b.expirationDate).format('DD/MM/YY');
      formatedBalance.push({
        id: b.id,
        store,
        date,
        expirationDate,
        type: b.type,
        value: b.value,
      });
    }
    return orderBy(formatedBalance, ['date'], ['asc']);
  }

  async function getBalance() {
    setRefreshing(true);
    const b = await api.getBalanceByUserId(state.user.id);
    const formatB = await formatBalance(b);
    setBalance(formatB);
    setRefreshing(false);
  }

  const onRefresh = useCallback(() => {
    getBalance();
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  const renderBalance = (item) => <Balance item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={balance}
        renderItem={renderBalance}
        keyExtractor={(b) => b.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
