import { useCartStore } from "@/store/cart";

const useCartTotalPrice = () => {
  const items = useCartStore((state) => state.cart.items);
  const shipping = useCartStore((state) => state.cart.shipping);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = useCartStore((state) => state.cart.discount);
  const finalTotal = subtotal - discount + shipping;
  return finalTotal;
};

export default useCartTotalPrice;
