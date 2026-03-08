/**
 * Brazuca Store - Product Data
 * Mock data for products and teams
 */

// Products data
const products = [
    {
        id: 1,
        name: 'Flamengo',
        description: 'Camisa Home 2024',
        price: 35,
        image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=400&h=400&fit=crop',
        team: 'flamengo',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 2,
        name: 'Palmeiras',
        description: 'Camisa Home 2024',
        price: 35,
        image: 'https://images.unsplash.com/photo-1629042335905-afce90477927?w=400&h=400&fit=crop',
        team: 'palmeiras',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 3,
        name: 'Corinthians',
        description: 'Camisa Home 2024',
        price: 35,
        image: 'https://images.unsplash.com/photo-1552066379-e7bfd22155c5?w=400&h=400&fit=crop',
        team: 'corinthians',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 4,
        name: 'São Paulo',
        description: 'Camisa Home 2024',
        price: 35,
        image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=400&h=400&fit=crop',
        team: 'saopaulo',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 5,
        name: 'Brasil',
        description: 'Seleção Brasileira 2024',
        price: 35,
        image: 'https://images.unsplash.com/photo-1552066379-e7bfd22155c5?w=400&h=400&fit=crop',
        team: 'brasil',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 6,
        name: 'Grêmio',
        description: 'Camisa Home 2024',
        price: 35,
        image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=400&h=400&fit=crop',
        team: 'gremio',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 7,
        name: 'Internacional',
        description: 'Camisa Home 2024',
        price: 35,
        image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=400&h=400&fit=crop',
        team: 'internacional',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 8,
        name: 'Santos',
        description: 'Camisa Home 2024',
        price: 35,
        image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=400&h=400&fit=crop',
        team: 'santos',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    }
];

/* ============================================
   CAMISAS POR TIME
============================================ */

const teamShirts = {

flamengo:[
{
id:101,
name:"Flamengo Home",
description:"Camisa titular 2024",
price:35,
image:"https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=400&h=400&fit=crop",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
},
{
id:102,
name:"Flamengo Away",
description:"Camisa visitante 2024",
price:35,
image:"assets/images/shirts/flamengo-away.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

palmeiras:[
{
id:201,
name:"Palmeiras Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/palmeiras-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
},
{
id:202,
name:"Palmeiras Away",
description:"Camisa visitante 2024",
price:35,
image:"assets/images/shirts/palmeiras-away.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

corinthians:[
{
id:301,
name:"Corinthians Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/corinthians-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
},
{
id:302,
name:"Corinthians Away",
description:"Camisa visitante 2024",
price:35,
image:"assets/images/shirts/corinthians-away.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

saopaulo:[
{
id:401,
name:"São Paulo Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/saopaulo-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

santos:[
{
id:501,
name:"Santos Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/santos-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

gremio:[
{
id:601,
name:"Grêmio Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/gremio-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

internacional:[
{
id:701,
name:"Internacional Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/inter-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

vasco:[
{
id:801,
name:"Vasco Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/vasco-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

fluminense:[
{
id:901,
name:"Fluminense Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/fluminense-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

botafogo:[
{
id:1001,
name:"Botafogo Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/botafogo-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

cruzeiro:[
{
id:1101,
name:"Cruzeiro Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/cruzeiro-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
],

"atletico-mg":[
{
id:1201,
name:"Atlético Mineiro Home",
description:"Camisa titular 2024",
price:35,
image:"assets/images/shirts/atletico-home.png",
sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
]

}




// Brazilian teams data
const brazilianTeams = [
  { id: 'flamengo', name: 'Flamengo', badge: 'assets/badges/flamengo.svg' },
  { id: 'palmeiras', name: 'Palmeiras', badge: 'assets/badges/palmeiras.svg' },
  { id: 'corinthians', name: 'Corinthians', badge: 'assets/badges/corinthians.svg' },
  { id: 'saopaulo', name: 'São Paulo', badge: 'assets/badges/saopaulo.png' },
  { id: 'santos', name: 'Santos', badge: 'assets/badges/santos.svg' },
  { id: 'gremio', name: 'Grêmio', badge: 'assets/badges/gremio.svg' },
  { id: 'internacional', name: 'Internacional', badge: 'assets/badges/internacional.svg' },
  { id: 'atletico-mg', name: 'Atlético-MG', badge: 'assets/badges/atletico.svg' },
  { id: 'cruzeiro', name: 'Cruzeiro', badge: 'assets/badges/cruzeiro.png' },
  { id: 'fluminense', name: 'Fluminense', badge: 'assets/badges/fluminense.svg' },
  { id: 'vasco', name: 'Vasco', badge: 'assets/badges/vasco.svg' },
  { id: 'botafogo', name: 'Botafogo', badge: 'assets/badges/botafogo.svg' }
];


