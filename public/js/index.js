document.addEventListener("DOMContentLoaded", () => {
    const menuContent = document.querySelector(".menu-content")
    const allItemBtn = document.querySelector(".all-item")
    const categoriesBtn = document.querySelector(".categories")
    const countAll = allItemBtn.querySelector(".count-all")

    localStorage.setItem("menu", '[{"id":"1","nama":"resep 1","sku_code":null,"price_menu":84500,"category_id":null},{"id":"2","nama":"resep 2","sku_code":null,"price_menu":67200,"category_id":null},{"id":"3","nama":"resep 3","sku_code":null,"price_menu":15700,"category_id":null},{"id":"4","nama":"resep 4","sku_code":null,"price_menu":54400,"category_id":null},{"id":"5","nama":"resep 5","sku_code":null,"price_menu":98000,"category_id":null},{"id":"6","nama":"resep 6","sku_code":null,"price_menu":32600,"category_id":null},{"id":"7","nama":"resep 7","sku_code":null,"price_menu":47800,"category_id":null},{"id":"8","nama":"resep 8","sku_code":null,"price_menu":62100,"category_id":null},{"id":"9","nama":"resep 9","sku_code":null,"price_menu":71000,"category_id":null},{"id":"10","nama":"resep 10","sku_code":null,"price_menu":26500,"category_id":null},{"id":"11","nama":"resep 11","sku_code":null,"price_menu":39800,"category_id":null},{"id":"12","nama":"resep 12","sku_code":null,"price_menu":15000,"category_id":null},{"id":"13","nama":"resep 13","sku_code":null,"price_menu":46800,"category_id":null},{"id":"14","nama":"resep 14","sku_code":null,"price_menu":72500,"category_id":null},{"id":"15","nama":"resep 15","sku_code":null,"price_menu":57400,"category_id":null},{"id":"16","nama":"resep 16","sku_code":null,"price_menu":15900,"category_id":null},{"id":"17","nama":"resep 17","sku_code":null,"price_menu":82000,"category_id":null},{"id":"18","nama":"resep 18","sku_code":null,"price_menu":42300,"category_id":null},{"id":"19","nama":"resep 19","sku_code":null,"price_menu":56100,"category_id":null},{"id":"20","nama":"resep 20","sku_code":null,"price_menu":27500,"category_id":null}]')

    loadMenuContent(JSON.parse(localStorage.getItem("menu")))
    function loadMenuContent(menuData = [{}]) {
        countAll.textContent = menuData.length
        menuData.forEach(menu => {
            const menuCard = document.createElement("menu-card")
            menuCard.setAttribute("data-menu", JSON.stringify(menu))
            menuContent.appendChild(menuCard)
        })
    }

    allItemBtn.addEventListener("click", () => {
        console.log("see all menu")
    })

    categoriesBtn.addEventListener("click", () => {
        const categories = [
            {
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Coffee_cup_icon.svg/1069px-Coffee_cup_icon.svg.png",
                name: "Drink"
            },
            {
                image: "https://freesvg.org/img/mealplate.png",
                name: "Food"
            }
        ]
        Swal.fire({
            showConfirmButton: false,
            html: `<modal-category data-json=${JSON.stringify(categories)}></modal-category>`
        })
    })

    menuContent.addEventListener("show-category", (ev) => {
        Swal.close()
        console.log("see menu by category: " + ev.detail.currentCategory)
    })
})