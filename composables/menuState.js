const defaultMenus = [
    {
        "category_id": 1,
        "category_name": "Food",
        "menus": []
    },
    {
        "category_id": 2,
        "category_name": "Drink",
        "menus": [
            {
                "id": "134",
                "nama": "resep 1",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "135",
                "nama": "lemon tea",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "136",
                "nama": "Espresso",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "137",
                "nama": "Tubruk",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "138",
                "nama": "Americano Hot",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "139",
                "nama": "Americano Ice",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "140",
                "nama": "Cappuccino Hot",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "141",
                "nama": "Cafe Latte",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "142",
                "nama": "Cha Phe Trung",
                "sku_code": "",
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "143",
                "nama": "Encino Caps Hot",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "144",
                "nama": "Encino Twist",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "145",
                "nama": "Piccolo Latte Hot",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "146",
                "nama": "Crumble Latte Hot",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "147",
                "nama": "Nougat Latte Hot",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "148",
                "nama": "Bullet Proof Latte Hot",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "149",
                "nama": "Charcoal Latte",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "150",
                "nama": "Spanish Latte",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "151",
                "nama": "Cappuccino Ice",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "152",
                "nama": "Cafe Latte Ice",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "153",
                "nama": "Korean Americano Ice",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "154",
                "nama": "Ice Orange Coffe Small",
                "sku_code": "SCRT-133203669",
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "155",
                "nama": "Ice Orange Coffe Large",
                "sku_code": "SCRT-133203670",
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "156",
                "nama": "Dolce Latte Ice",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "157",
                "nama": "Tubruk Fresh Milk",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "158",
                "nama": "Tubruk Osaka",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "159",
                "nama": "Tubruk No Milk",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "160",
                "nama": "Fresh Dawn With Helmigs Orange",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
            {
                "id": "161",
                "nama": "Crumble Latte Ice",
                "sku_code": null,
                "price_menu": 0,
                "category_id": 2
            },
        ]
    }
];

export function useMenu() {
    return useState('menu-list', () => defaultMenus);
}

export function useMenuMode() {
    return useState("show-menu-mode", () => "show-all")
}