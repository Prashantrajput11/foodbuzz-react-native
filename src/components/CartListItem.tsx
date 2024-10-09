import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { CartItem } from "../types";
import { Link } from "expo-router";
// import { defaultPizzaImage } from "./ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../providers/CartProvider";

type CartListItemProps = {
	cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
	const { updateQuantity } = useCart();
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri:
						cartItem.product.image ||
						"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fpizza&psig=AOvVaw0FAxNUF_D6QkNH0IpZFJ62&ust=1728488638322000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCND14I-Q_4gDFQAAAAAdAAAAABAE",
				}}
				style={styles.image}
				resizeMode="contain"
			/>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{cartItem.product.name}</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
					<Text>Size: {cartItem.size}</Text>
				</View>
			</View>
			<View style={styles.quantitySelector}>
				<FontAwesome
					onPress={() => updateQuantity(cartItem.id, -1)}
					name="minus"
					color="#ef4444"
					style={{ padding: 5, fontWeight: "thin" }}
				/>

				<Text style={styles.quantity}>{cartItem.quantity}</Text>
				<FontAwesome
					onPress={() => updateQuantity(cartItem.id, 1)}
					name="plus"
					color="#ef4444"
					style={{ padding: 5, fontWeight: "ultralight" }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 5,
		marginVertical: 10,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 75,
		aspectRatio: 1,
		alignSelf: "center",
		marginRight: 10,
	},
	title: {
		fontWeight: "500",
		fontSize: 16,
		marginBottom: 5,
	},
	subtitleContainer: {
		flexDirection: "row",
		gap: 5,
	},
	quantitySelector: {
		flexDirection: "row",
		gap: 20,
		alignItems: "center",
		marginVertical: 10,
		borderWidth: 0.4,
		backgroundColor: "#fee2e2",
		borderColor: "#ef4444",
		borderRadius: 8,
		paddingVertical: 4,

		shadowColor: "#000", // for iOS shadow
		// shadowOffset: {
		// 	width: 0,
		// 	height: 1,
		// },
		// shadowOpacity: 0.25,
		// shadowRadius: 3.84,
	},
	quantity: {
		fontWeight: "300",
		fontSize: 18,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: "bold",
	},
});

export default CartListItem;
