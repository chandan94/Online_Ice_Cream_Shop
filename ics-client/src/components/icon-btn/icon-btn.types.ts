
export interface IconBtnProps {
    iconName: string,
    btnName: string,
    url: string,
    quantity : number,
    disabled: boolean,
};

export interface IconBtn {
    button: IconBtnProps,
    clearCart ?:any,
    setCurrentUser ?:any
    user: any,
    getAllOrders: (user: any) => void,
}