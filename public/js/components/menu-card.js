class MenuCard extends HTMLElement {
    constructor() {
        super();
        this.menuJson = {};
        this.cardTemplate = `
            <div class="card shadow-xl w-[142px] bg-white rounded-[10px] z-[0] min-h-[184px]">
                <figure>
                    <img
                        src="__menu-image__"
                        alt="__menu-name__"
                        class="aspect-[142/107]"
                    />
                </figure>
                <div class="card-body p-2 gap-1">
                    <div class="flex">
                        <div class="grow">
                            <h2 class="card-title">__menu-name__</h2>
                            <p class="menu-price">__menu-price__</p>
                        </div>
                        <div class="menu-rating text-[7px] text-black flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-star-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                                />
                            </svg>
                            <div class="text-black">
                                <span>&nbsp;10</span>
                                <span>&nbsp;poin</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-actions justify-end">
                        <button
                            class="bg-black flex rounded-md items-center gap-x-2 px-3 py-1 text-white min-h-0 h-auto hover:bg-opacity-85"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-cart4 w-[15px]"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
                                />
                            </svg>
                            <span class="text-[9px] mt-[2px]">Add</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.menuJson = JSON.parse(this.getAttribute("data-menu"))
        this.removeAttribute("data-menu")
        this.cardTemplate = this.cardTemplate.replaceAll("__menu-name__", this.menuJson.nama)
        this.cardTemplate = this.cardTemplate.replace("__menu-price__", (+this.menuJson.price_menu).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }))
        this.cardTemplate = this.cardTemplate.replace("__menu-image__", this.menuJson.image || "/assets/img/no-image.png")
        this.innerHTML = this.cardTemplate;
        this.addEvent();
    }

    addEvent() {
        this.querySelector(".card-actions button").addEventListener(
            "click",
            () => {
                Swal.fire({
                    showConfirmButton: false,
                    html: `<modal-add-cart data-menu='${JSON.stringify(this.menuJson)}'></modal-add-cart>`
                });
            }
        );
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define("menu-card", MenuCard);
