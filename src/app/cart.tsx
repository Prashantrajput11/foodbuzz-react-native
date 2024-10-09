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
import Button from "../components/Button";

const CartScreen = () => {
	const { items, total } = useCart();

	return (
		<View style={{ margin: 10 }}>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				contentContainerStyle={{
					marginHorizontal: 10,
					paddingVertical: 10,
				}}
			/>

			{total > 0 && <Text> Total: {total}</Text>}

			<Button text="Checkout" />

			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
};

export default CartScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ED4C67",
		borderRadius: 5, // This creates the pill shape
		paddingVertical: 8,
		paddingHorizontal: 24,
		alignItems: "center",
		justifyContent: "center",
		elevation: 3, // for Android shadow
		shadowColor: "#000", // for iOS shadow
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		maxWidth: 200,
	},

	text: {
		color: "#fff",
	},
	text2: {
		color: "gray",
		fontSize: 14,
	},
});
