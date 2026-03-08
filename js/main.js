/**
 * BRAZUCA STORE - Single Page Application
 * Vanilla JS - Carrinho, Modal, Carousel, WhatsApp Checkout
 */

let cart = JSON.parse(localStorage.getItem('brazuca_cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('brazuca_favs') || '[]');

let selectedSize = null;
let modalProductId = null;
let carouselOffset = 0;

const WHATSAPP = "447544180397";


// ==============================
// FIND PRODUCT (resolve carrinho)
// ==============================

function findProduct(id){

    let p = products.find(x => x.id === id)

    if(p) return p

    if(typeof teamShirts !== "undefined"){

        for(const team in teamShirts){

            const found = teamShirts[team].find(x => x.id === id)

            if(found) return found

        }

    }

    return null
}


// ==============================
// UTIL
// ==============================

function showToast(msg){

    const container = document.getElementById("toastContainer")

    const toast = document.createElement("div")
    toast.className = "toast"
    toast.textContent = msg

    container.appendChild(toast)

    setTimeout(()=> toast.remove(),3000)

}

function saveCart(){

    localStorage.setItem("brazuca_cart", JSON.stringify(cart))
    updateCartBadge()

}

function saveFavs(){

    localStorage.setItem("brazuca_favs", JSON.stringify(favorites))
    updateFavBadge()

}

function updateCartBadge(){

    const b = document.getElementById("cartCount")

    const count = cart.reduce((s,i)=> s + i.qty,0)

    if(b){

        b.textContent = count
        b.style.display = count > 0 ? "flex":"none"

    }

}

function updateFavBadge(){

    const b = document.getElementById("favCount")

    if(b){

        b.textContent = favorites.length
        b.style.display = favorites.length > 0 ? "flex":"none"

    }

}


// ==============================
// CAROUSEL
// ==============================

function renderCarousel(list = products){

    const track = document.getElementById("carouselTrack")

    if(!track) return

    track.innerHTML = list.map(p => `

        <div class="product-card">

            <div class="product-image">

                <img src="${p.image}" alt="${p.name}" class="product-img">

                <button class="product-favorite ${favorites.includes(p.id) ? "active":""}"
                    onclick="toggleFavorite(${p.id})">

                    ${favorites.includes(p.id) ? "♥":"♡"}

                </button>

            </div>

            <div class="product-info">

                <h3 class="product-name">${p.name}</h3>

                <p class="product-team">${p.description}</p>

                <p class="product-price">£${p.price}</p>

                <button class="view-product-btn"
                    onclick="openModal(${p.id})">

                    Ver Produto

                </button>

            </div>

        </div>

    `).join("")

}

function carouselPrev(){

    if(carouselOffset > 0){
        carouselOffset--
        updateCarouselPosition()
    }

}

function carouselNext(){

    if(carouselOffset < products.length - 4){
        carouselOffset++
        updateCarouselPosition()
    }

}

function updateCarouselPosition(){

    const track = document.getElementById("carouselTrack")

    const shift = carouselOffset * 280

    track.style.transform = `translateX(-${shift}px)`

}


// ==============================
// TEAMS
// ==============================

function renderTeams(){

    const grid = document.getElementById("teamsGrid")

    grid.innerHTML = brazilianTeams.map(team => `

        <div class="team-badge"
             onclick="showTeamProducts('${team.id}')">

            <div class="team-logo">
                <img src="${team.badge}" alt="${team.name}">
            </div>

            <span class="team-name">${team.name}</span>

        </div>

    `).join("")

}


// ==============================
// TEAM PRODUCTS
// ==============================

function showTeamProducts(teamId){

    if(typeof teamShirts === "undefined"){
        showToast("Camisas deste time em breve!")
        return
    }

    const shirts = teamShirts[teamId]

    if(!shirts){
        showToast("Camisas deste time em breve!")
        return
    }

    const grid = document.getElementById("teamProductsGrid")

    grid.innerHTML = shirts.map(p => `

        <div class="product-card">

            <div class="product-image">
                <img src="${p.image}" class="product-img">
            </div>

            <div class="product-info">

                <h3 class="product-name">${p.name}</h3>

                <p class="product-team">${p.description}</p>

                <p class="product-price">£${p.price}</p>

                <button class="view-product-btn"
                    onclick="openModal(${p.id})">

                    Ver Produto

                </button>

            </div>

        </div>

    `).join("")

    const team = brazilianTeams.find(t => t.id === teamId)

    document.getElementById("teamTitle").textContent = team.name

    document.getElementById("teamProducts").style.display = "block"

    document.getElementById("teamProducts")
        .scrollIntoView({behavior:"smooth"})

}


// ==============================
// FAVORITES
// ==============================

function toggleFavorite(id){

    const idx = favorites.indexOf(id)

    if(idx > -1){

        favorites.splice(idx,1)
        showToast("Removido dos favoritos")

    }else{

        favorites.push(id)
        showToast("Adicionado aos favoritos")

    }

    saveFavs()
    renderCarousel()

}


// ==============================
// MODAL
// ==============================

function openModal(id){

    const p = findProduct(id)

    if(!p) return

    modalProductId = id
    selectedSize = null

    document.getElementById("modalName").textContent = p.name
    document.getElementById("modalDesc").textContent = p.description
    document.getElementById("modalPrice").textContent = "£"+p.price

    document.getElementById("modalImage").innerHTML =
        `<img src="${p.image}" class="modal-img">`

    document.getElementById("modalSizes").innerHTML =
        p.sizes.map(size => `
            <button class="size-btn"
                onclick="selectSize('${size}',this)">
                ${size}
            </button>
        `).join("")

    document.getElementById("productModal").classList.add("active")

    document.body.style.overflow = "hidden"

}

function closeModal(){

    document.getElementById("productModal").classList.remove("active")
    document.body.style.overflow = ""

}

function selectSize(size,btn){

    selectedSize = size

    document.querySelectorAll(".size-btn")
        .forEach(b => b.classList.remove("selected"))

    btn.classList.add("selected")

}


// ==============================
// ADD TO CART
// ==============================

function addToCartFromModal(){

    if(!selectedSize){

        showToast("Selecione um tamanho")
        return

    }

    const existing = cart.find(i =>
        i.id === modalProductId &&
        i.size === selectedSize
    )

    if(existing){

        existing.qty++

    }else{

        cart.push({
            id: modalProductId,
            size: selectedSize,
            qty:1
        })

    }

    saveCart()

    showToast("Adicionado ao carrinho")

    closeModal()

}


// ==============================
// CART
// ==============================

function openCart(){

    renderCartItems()

    document.getElementById("cartSidebar").classList.add("active")
    document.getElementById("cartOverlay").classList.add("active")

}

function closeCart(){

    document.getElementById("cartSidebar").classList.remove("active")
    document.getElementById("cartOverlay").classList.remove("active")

}

function renderCartItems(){

    const container = document.getElementById("cartItems")
    const totalElement = document.getElementById("cartTotal")

    if(cart.length === 0){
        container.innerHTML = "<p>Seu carrinho está vazio</p>"
        totalElement.textContent = "£0"
        return
    }

    let total = 0

    container.innerHTML = cart.map((item, index) => {

        const p = findProduct(item.id)

        if(!p) return ""

        const subtotal = p.price * item.qty
        total += subtotal

        return `
        <div class="cart-item">

            <div class="cart-item-info">
                <strong>${p.name}</strong>
                <span>Tamanho: ${item.size}</span>
                <span>Qtd: ${item.qty}</span>
            </div>

            <div class="cart-item-price">
                £${subtotal}
            </div>

            <button class="cart-remove" onclick="removeFromCart(${index})">
                Remover
            </button>

        </div>
        `
    }).join("")

    totalElement.textContent = "£" + total
}
function removeFromCart(index){

    cart.splice(index,1)

    saveCart()

    renderCartItems()

    showToast("Item removido")

}


// ==============================
// WHATSAPP
// ==============================

function checkoutWhatsApp(){

    if(cart.length === 0){
        showToast("Carrinho vazio")
        return
    }

    let total = 0
    let msg = "Olá, quero comprar:%0A%0A"

    cart.forEach(item => {

        const p = findProduct(item.id)
        if(!p) return

        const subtotal = p.price * item.qty
        total += subtotal

        msg += `${p.name} | Tamanho ${item.size} | Qtd ${item.qty} | £${subtotal}%0A`

    })

    msg += `%0ATotal: £${total}`

    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank")

}

// ==============================
// MENU
// ==============================

const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("nav")

menuToggle.addEventListener("click",()=>{
    nav.classList.toggle("active")
})


// ==============================
// INIT
// ==============================

document.addEventListener("DOMContentLoaded",()=>{

    renderCarousel()
    renderTeams()

    updateCartBadge()
    updateFavBadge()

    document.getElementById("cartBtn")
        ?.addEventListener("click",openCart)

    document.getElementById("cartClose")
        ?.addEventListener("click",closeCart)

    document.getElementById("cartOverlay")
        ?.addEventListener("click",closeCart)

    document.getElementById("modalClose")
        ?.addEventListener("click",closeModal)

    document.getElementById("modalAddToCart")
        ?.addEventListener("click",addToCartFromModal)

    document.getElementById("carouselPrev")
        ?.addEventListener("click",carouselPrev)

    document.getElementById("carouselNext")
        ?.addEventListener("click",carouselNext)

    document.getElementById("checkoutBtn")
        ?.addEventListener("click",checkoutWhatsApp)

})