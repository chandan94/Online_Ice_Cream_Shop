export const addItemToCart = (cartItems: any[], newItem: any) => {

    const existingItem = cartItems.find(item => (item.name === newItem.name && item.navigate!== 'true') )

    if (existingItem) {
        return cartItems.map(item => {
            if (item.name === newItem.name) {
                if(item.inventory>= item.quantity+1){
                return {
                    ...item,
                    quantity: item.quantity + 1,
                }
            }
            }
            return item;
        });
    }

    newItem.quantity = 1;
    return [...cartItems, newItem];
}

export const addNavigateItemToCart = (cartItems: any[], newItem: any) => {

    return [...cartItems, newItem];
}


export const removeItemFromCart = (cartItems: any[], itemtoRemove:any) => {

    const existingItem = cartItems.find(item => item.name === itemtoRemove.name)

    if (existingItem && existingItem.quantity === 1) {
        return cartItems.filter(item => item.name !== existingItem.name)
    }

    return cartItems.map(item => item.name === existingItem.name ? { ...item , quantity: item.quantity - 1} : item);
}

export const removeNavigate = (cartItems: any[], itemtoRemove:any) => {

        return cartItems.filter(item => (item.navigate !== 'true')  );

}