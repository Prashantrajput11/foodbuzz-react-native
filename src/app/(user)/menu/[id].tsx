import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailScreen = () => {
	const { id: productId } = useLocalSearchParams();
	const { addItem } = useCart();

	const [selectedSize, setSelectedSize] = useState<PizzaSize>(sizes[0]);

	const product = products.find((item) => item.id === Number(productId));

	// todo: update it with a falback text and image
	if (!product) return;

	const handleAddToCart = () => {
		if (!product) return;
		addItem(product, selectedSize);

		router.push("/cart");
	};

	return (
		<View>
			<Stack.Screen options={{ title: product.name }} />

			<Text style={styles.subtitle}>{product.name}</Text>
			<Image
				source={{
					uri:
						product.image ||
						"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
				}}
				style={styles.image}
				resizeMode="contain"
			/>

			<Text>Select size</Text>

			<View style={styles.sizes}>
				{sizes.map((size) => (
					<Pressable
						onPress={() => setSelectedSize(size)}
						key={size}
						style={[
							styles.size,
							{
								backgroundColor: size === selectedSize ? "gainsboro" : "white",
							},
						]}
					>
						<Text
							style={[
								styles.sizeText,
								{ color: size === selectedSize ? "black" : "gray" },
							]}
						>
							{size}
						</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>${product.price.toFixed(2)}</Text>

			<Button text="Add" onPress={handleAddToCart} />
		</View>
	);
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		flex: 1,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
		alignSelf: "center",
	},
	subtitle: {
		marginVertical: 10,
		fontWeight: "600",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: "auto",
	},

	sizes: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	size: {
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	sizeText: {
		fontSize: 20,
		fontWeight: "500",
		color: "black",
	},
});
