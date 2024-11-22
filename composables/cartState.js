export function useCart() {
    const addToCartData = useState('to-be-add-to-cart', () => (null));
    const addToCartStatus = useState('add-to-cart-status', () => false);
    const cartItems = useState('cart-items', () => [])
    const cartItemsStatus = useState('cart-items-status', () => 'success')
    function insertItemToCart(dataObj) {
        addToCartData.value = dataObj
        addToCartStatus.value = 'update'
    }
    function refreshAddToCartState() {
        addToCartData.value = null;
        addToCartStatus.value = false
    }
    return {
        insertItemToCart,
        addToCartData,
        addToCartStatus,
        refreshAddToCartState,
        cartItems,
        cartItemsStatus
    }
}