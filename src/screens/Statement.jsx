/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { SafeAreaView, RefreshControl, FlatList } from 'react-native';
import { Divider, ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import { UserContext } from '../context/UserContext';
import * as api from '../api';
import NothingToSee from './components/NothingToSee';
import StatementTotal from './components/StatementTotal';
import StatementItem from './components/StatementItem';

export default function Statement({ type }) {
  const [state] = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function formatItems(receivedItems) {
    const formatedItems = [];
    for (const item of receivedItems) {
      const store = await api.getStoreById(item.store);
      const date = moment(item.date).format('DD/MM/YY HH:mm');
      const expirationDate = moment(item.expirationDate).format('DD/MM/YY');
      formatedItems.push({
        id: item.id,
        store,
        originalDate: item.date,
        date,
        expirationDate,
        type: item.type,
        value: item.value,
      });
    }
    setTotal(formatedItems.reduce((t, i) => t + i.value, 0));
    return orderBy(formatedItems, ['originalDate'], ['desc']);
  }

  async function getItems() {
    const receivedItems = await api.getBalanceByUserId(state.user.id, type);
    const formatedItems = await formatItems(receivedItems);
    setItems(formatedItems);
    setLoading(false);
    setRefreshing(false);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getItems();
  }, []);

  useEffect(() => {
    setLoading(true);
    getItems();
  }, []);

  const renderItems = (item) => <StatementItem value={item} />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      {!items.length && loading && (
        <ActivityIndicator style={{ paddingTop: 16 }} />
      )}
      {items.length ? (
        <FlatList
          data={items}
          renderItem={renderItems}
          keyExtractor={(i) => i.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={Divider}
        />
      ) : (
        <NothingToSee />
      )}
      <StatementTotal total={total} type={type} />
    </SafeAreaView>
  );
}
