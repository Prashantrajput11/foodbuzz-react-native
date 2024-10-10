import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	ActivityIndicator,
	Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);

	const { id } = useLocalSearchParams();

	const isUpdating = !!id;

	const resetFields = () => {
		setPrice("");
		setName("");
	};
	const isValid = () => {
		setErrors("");
		if (!name) {
			setErrors("Name is required");
			return false;
		}

		if (!price) {
			setErrors("Price is required");
			return false;
		}

		if (isNaN(parseFloat(price))) {
			setErrors("Price should be a number");
			return false;
		}

		return true;
	};

	const onSubmit = () => {
		if (isUpdating) {
			updateProduct();
		} else {
			createProduct();
		}
	};
	const createProduct = () => {
		if (!isValid()) {
			return;
		}

		console.warn(" created");

		resetFields();
	};
	const updateProduct = () => {
		if (!isValid()) {
			return;
		}

		console.warn(" updated");

		resetFields();
	};

	const onDelete = () => {
		console.warn("deleted");
	};

	const confirmDelete = () => {
		Alert.alert("Confirm", "Are you sure you want to delete this product", [
			{
				text: "Cancel",
			},
			{
				text: "Delete",
				style: "destructive",
				onPress: onDelete,
			},
		]);
	};

	const pickImage = async () => {
		try {
			setLoading(true);
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				setImage(result.assets[0].uri);
			}
		} catch (error) {
			console.error("Error picking image:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{ title: isUpdating ? "Update Product" : "Create Product" }}
			/>
			{!loading ? (
				<Image
					source={{
						uri:
							image ||
							"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png",
					}}
					style={styles.image}
					resizeMode="contain"
				/>
			) : (
				<ActivityIndicator size={"large"} color="gray" />
			)}
			<Text
				style={[styles.textButton, loading && { color: "gray" }]}
				onPress={pickImage}
			>
				{loading ? "Loading..." : "Select Image"}
			</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder="Margarita..."
				style={styles.input}
			/>

			<Text style={styles.label}>Price ($)</Text>

			<TextInput
				value={price}
				onChangeText={setPrice}
				placeholder="9.99"
				style={styles.input}
				keyboardType="numeric"
			/>

			<Text style={styles.error}>{errors}</Text>

			<Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
			{isUpdating && (
				<Text onPress={confirmDelete} style={styles.text}>
					{"Delete"}
				</Text>
			)}
		</View>
	);
};

export default CreateProductScreen;

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	image: {
		width: "50%",
		aspectRatio: 1,
		alignSelf: "center",
	},
	textButton: {
		alignSelf: "center",
		fontWeight: "bold",
		color: Colors.light.tint,
		marginVertical: 10,
	},
	label: {
		color: "gray",
	},

	text: {
		color: Colors.light.tint,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		padding: 10,
		marginTop: 5,
		marginBottom: 20,
		backgroundColor: "white",
		borderRadius: 5,
	},
	error: {
		color: "red",
		textAlign: "center",
	},
});
