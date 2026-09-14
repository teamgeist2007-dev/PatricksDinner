const dishes = [
  {
    name: "Pizza Margherita",
    description: "Mit Basilikum und Tomaten",
    price: 9.90,
    image: "./assets/img/Pizza Margherita.png"
  },
  {
    name: "Pizza Salami",
    description: "Mit Salami, Chiliflocken und Parmesan",
    price: 11.90,
    image: "./assets/img/Pizza Salami.png"
  },
  {
    name: "Pizza Funghi",
    description: "Mit frischen Champignons",
    price: 9.90,
    image: "./assets/img/Pizza Funghi.png"
  },
  {
    name: "Pizza Diavola",
    description: "Mit Chili und Jalapeños",
    price: 12.90,
    image: "./assets/img/Pizza Diavola.png"
  },
  {
    name: "Pizza Quattro Formaggi",
    description: "Mit Gorgonzola und geriebenem Käse",
    price: 10.90,
    image: "./assets/img/Pizza Quattro Formaggi.png"
  }
];

function renderDishes() {
  const dishList = document.getElementById("dishes-list");
  dishList.innerHTML = "";

  for (let i = 0; i < dishes.length; i++) {
    dishList.innerHTML += getDishTemplate(dishes[i]);
  }
}

function getDishTemplate(dish) {
  return `
    <div class="dishCard">
      <img src="${dish.image}" alt="${dish.name}">

      <div class="dishInfo">
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <strong>${dish.price.toFixed(2).replace(".", ",")} €</strong>
      </div>

      <button class="addButton">Add to basket</button>
    </div>
  `;
}

renderDishes();