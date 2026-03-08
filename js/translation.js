const translations = {

  pt: {
    home: "Início",
    products: "Produtos",
    contact: "Contato",
    myAccount: "Minha Conta",
    heroTitle: "As Melhores Camisas de Futebol",
    heroSubtitle: "Coleção completa dos principais times brasileiros e internacionais.",
    shopNow: "Comprar Agora",
    seePromos: "Ver Promoções",
    featuredTitle: "Camisas em Destaque",
    teamsTitle: "Times Brasileiros",
    teamsSubtitle: "Clique no escudo para ver as camisas do seu time",
    deliveryTitle: "Entregas Internacionais",
    deliverySubtitle: "Enviamos para estas regiões destacadas",
    testimonialsTitle: "O que Nossos Clientes Dizem",
    newsletterTitle: "Receba Ofertas Exclusivas",
    newsletterDesc: "Cadastre-se e ganhe 10% de desconto na primeira compra!",
    subscribe: "Inscrever",
    cartTitle: "Carrinho",
    total: "Total",
    checkoutWhatsApp: "Finalizar no WhatsApp"
  },

  en: {
    home: "Home",
    products: "Products",
    contact: "Contact",
    myAccount: "My Account",
    heroTitle: "The Best Football Shirts",
    heroSubtitle: "Complete collection of Brazilian and international teams.",
    shopNow: "Shop Now",
    seePromos: "See Promotions",
    featuredTitle: "Featured Shirts",
    teamsTitle: "Brazilian Teams",
    teamsSubtitle: "Click the badge to see the team shirts",
    deliveryTitle: "International Delivery",
    deliverySubtitle: "We ship to the highlighted regions",
    testimonialsTitle: "What Our Customers Say",
    newsletterTitle: "Receive Exclusive Offers",
    newsletterDesc: "Subscribe and get 10% off your first purchase!",
    subscribe: "Subscribe",
    cartTitle: "Cart",
    total: "Total",
    checkoutWhatsApp: "Checkout on WhatsApp"
  }

}

let currentLang = "pt"

function translatePage(lang){

  const elements = document.querySelectorAll("[data-i18n]")

  elements.forEach(el => {

    const key = el.getAttribute("data-i18n")

    if(translations[lang][key]){
      el.textContent = translations[lang][key]
    }

  })

}

const langToggle = document.getElementById("langToggle")

langToggle.addEventListener("click", () => {

  currentLang = currentLang === "pt" ? "en" : "pt"

  translatePage(currentLang)

  document.querySelector(".lang-text").textContent = currentLang.toUpperCase()

})

translatePage(currentLang)