export const addItemToCart = (cartItems: any[], newItem: any) => {

    const existingItem = cartItems.find(item => item.name === newItem.name)

    if (existingItem) {
        return cartItems.map(item => {
            if (item.name === newItem.name) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                }
            }
            return item;
        });
    }

    newItem.quantity = 1;
    return [...cartItems, newItem];
}


export const removeItemFromCart = (cartItems: any[], itemtoRemove: { id: any; }) => {

    const existingItem = cartItems.find(item => item.id === itemtoRemove.id)

    if (existingItem && existingItem.quantity === 1) {
        return cartItems.filter(item => item.id !== existingItem.id)
    }

    return cartItems.map(item => item.id === existingItem.id ? { ...item , quantity: item.quantity - 1} : item);
}