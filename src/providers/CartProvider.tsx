import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
	items: CartItem[];
	addItem: (product: Product, size: CartItem["size"]) => void;
	updateQuantity: (itemId: string, amount: -1 | 1) => void;
	total: number;
};
const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
	// Initial State
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = (product: Product, size: CartItem["size"]) => {
		// Check if item exist in the cart already
		const existingItem = items.find(
			(item) => item.product.id === product.id && item.size === size
		);

		// If item exits, increase quanity
		if (existingItem) {
			updateQuantity(existingItem.id, 1);
			return;
		}

		// Create a new cart item
		const newCartItem: CartItem = {
			id: randomUUID(),
			product: product,
			product_id: product.id,
			size: size,
			quantity: 1,
		};

		// Update Items
		setItems([newCartItem, ...items]);
	};

	// Update Cart quantity
	const updateQuantity = (itemId: string, amount: -1 | 1) => {
		const updatedItems = items
			.map((item) =>
				item.id !== itemId
					? item
					: { ...item, quantity: item.quantity + amount }
			)
			.filter((item) => item.quantity > 0);

		setItems(updatedItems);
	};

	// Calculate total of cart
	const total = items.reduce((acc, curr) => {
		return (acc += curr.product.price * curr.quantity);
	}, 0);

	return (
		<CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
