if (!customElements.get("modal-category")) {
    class ModalCategory extends HTMLElement {
        constructor() {
            super()
            this.template = `
            <div id="modal-category" class="m-auto bg-white rounded-lg shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Categories</h2>
                    <button id="closeButton" class="text-gray-600 text-2xl focus-visible:outline-none aspect-square w-[24px]"
                        onclick="Swal.close()">&times;</button>
                </div>
                <div class="grid items-center justify-between grid-cols-3 gap-5 mt-4 category-container"></div>
            </div>
        `
            this._categories = []
        }

        get categories() {
            return this._categories;
        }

        set categories(newValue) {
            this._categories = newValue;
            this.render()
            return this
        }

        connectedCallback() {
            this.render()
        }

        render() {
            if (!this.isConnected) return
            this.innerHTML = this.template
            const categoryContainer = this.querySelector(".category-container")
            this.categories.forEach(category => {
                let categoryItemHtml = `
            <div class="flex flex-col items-center m-auto item">
                <img src="__category-image__">
                <p class="capitalize">__category-name__</p>
            </div>
            `
                const categoryItem = document.createElement("button")
                categoryItem.classList.add(..."flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-main".split(" "))
                categoryItemHtml = categoryItemHtml.replaceAll("__category-name__", category.name)
                categoryItemHtml = categoryItemHtml.replaceAll("__category-image__", category.image)
                categoryItem.innerHTML = categoryItemHtml
                categoryContainer.appendChild(categoryItem)
                categoryItem.addEventListener("click", () => {
                    fireCustomEventTo({ eventName: "show-by-category", eventDetail: { currentCategory: category }, targetElement: document.querySelector(".menu-content") })
                    Swal.close()
                })
            })
        }
    }

    customElements.define("modal-category", ModalCategory)
}