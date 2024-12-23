export interface NavItem {
    text: string;
    path: string;
    isPrivate: boolean;
}

export const navConfig: NavItem[] = [
   {text: "Home", path: "home", isPrivate: false},
   {text: "Dashboard", path: "dashboard", isPrivate: true},
   {text: "<ShoppingBag/>", path: "cart", isPrivate: false}
]

