import { useCartStore } from "@/store/cart";

const useCartTotalItems = () => {
  const itemsLen = useCartStore((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  return itemsLen;
};

export default useCartTotalItems;
