import {
	FlatList,
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
} from "react-native";
import React, { useCallback, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";

const CartScreen = () => {
	const { items } = useCart();

	return (
		<View>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				contentContainerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
			/>

			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
};

export default CartScreen;

const styles = StyleSheet.create({});
