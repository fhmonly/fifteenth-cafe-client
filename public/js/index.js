document.addEventListener("DOMContentLoaded", () => {
    const menuContent = document.querySelector(".menu-content")
    const allItemBtn = document.querySelector(".all-item")
    const categoriesBtn = document.querySelector(".categories")

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