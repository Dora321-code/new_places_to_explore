import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PlaceCard from '../../components/PlaceCard';
import PLACES from '../../models/data';
import Colors from '../../constants/Colors';


function HomeNoLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();



  // const selectItemHandler = (id, title) => {y
  //   props.navigation.navigate('ProductDetail', {
  //     productId: id,
  //     productTitle: title
  //   });
  // };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          // onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={ Colors.primary} />
      </View>
    );
  }

  if (!isLoading && PLACES.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      // onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={PLACES}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceCard
          image={itemData.item.imageUri}
          title={itemData.item.title}
          price={itemData.item.address}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To "
            // onPress={() => {
            //   dispatch(cartActions.addToCart(itemData.item));
            // }}
          />
        </PlaceCard>
      )}
    />
  );
}

export default HomeNoLogin