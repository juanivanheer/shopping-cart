import { ReactNode, createContext, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getItemQuantity = (id: number) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

  const increaseCartQuantity = (id: number) =>
    setCartItems((current) => {
      if (current.find((item) => item.id === id) == null) {
        return [...current, { id, quantity: 1 }];
      } else {
        return current.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });

  const decreaseCartQuantity = (id: number) =>
    setCartItems((current) => {
      if (current.find((item) => item.id === id)?.quantity === 1) {
        return current.filter((item) => item.id !== id);
      } else {
        return current.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });

  const removeFromCart = (id: number) =>
    setCartItems((current) => current.filter((item) => item.id !== id));

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
