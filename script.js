const dishes = [
  {
    name: "Pizza Margherita",
    description: "Mit Tomatensoße, Morzarella, und Basilikum",
    price: 9.90,
    image: "./assets/img/Pizza Margherita.png"
  },
  {
    name: "Pizza Salami",
    description: "Mit Tomatensoße, Salami und geriebenen Käse",
    price: 11.90,
    image: "./assets/img/Pizza Salami.png"
  },
  {
    name: "Pizza Funghi",
    description: "Mit Tomatensoße, frischen Champignons und geriebenen Käse",
    price: 10.90,
    image: "./assets/img/Pizza Funghi.png"
  },
  {
    name: "Pizza Diavola",
    description: "Mit Tomatensoße, Salami, Chili und Jalapeños",
    price: 12.90,
    image: "./assets/img/Pizza Diavola.png"
  },
  {
    name: "Pizza Quattro Formaggi",
    description: "Mit Tomatensoße, Mozzarella, Gorgonzola, Parmesan und Fontina ",
    price: 11.90,
    image: "./assets/img/Pizza Quattro Formaggi.png"
  }
];

let basket = [];

function renderDishes() {
  let dishList = document.getElementById("dishes-list");

  dishList.innerHTML = "";

  for (let i = 0; i < dishes.length; i++) {
    dishList.innerHTML += `
      <div class="dishCard">
        <img class="dishImage"
          src="${dishes[i].image}"
          alt="${dishes[i].name}">

        <div class="dishInfo">
          <h3>${dishes[i].name}</h3>
          <p>${dishes[i].description}</p>
          <strong class="dishPrice">
            ${formatPrice(dishes[i].price)}
          </strong>
        </div>

        <button class="addButton" onclick="addToBasket(${i})">
          Add to basket
        </button>
      </div>
    `;
  }
}

function addToBasket(dishIndex) {
  let dishAlreadyInBasket = false;

  for (let i = 0; i < basket.length; i++) {
    if (basket[i].dishIndex === dishIndex) {
      basket[i].amount++;
      dishAlreadyInBasket = true;
    }
  }

  if (dishAlreadyInBasket === false) {
    basket.push({
      dishIndex: dishIndex,
      amount: 1
    });
  }

  renderBasket();
}

function renderBasket() {
  let basketItems = document.getElementById("basket-items");
  let basketCalculation = document.getElementById("basket-calculation");

  basketItems.innerHTML = "";
  basketCalculation.innerHTML = "";

  if (basket.length === 0) {
    basketItems.innerHTML = `
      <div class="emptyBasket">
        Dein Warenkorb ist noch leer.
      </div>
    `;

    return;
  }

  for (let i = 0; i < basket.length; i++) {
    let dish = dishes[basket[i].dishIndex];
    let itemPrice = dish.price * basket[i].amount;

    basketItems.innerHTML += `
      <div class="basketItem">
        <h3 class="basketItemName">
          ${basket[i].amount} x ${dish.name}
        </h3>

        <div class="basketItemBottom">
          <div class="amountButtons">
            <button class="amountButton"
              onclick="decreaseAmount(${i})">
              -
            </button>

            <span>${basket[i].amount}</span>

            <button class="amountButton"
              onclick="increaseAmount(${i})">
              +
            </button>

            <button class="deleteButton"
              onclick="deleteDish(${i})">
              Löschen
            </button>
          </div>

          <span class="basketPrice">
            ${formatPrice(itemPrice)}
          </span>
        </div>
      </div>
    `;
  }

  let subtotal = calculateSubtotal();
  let deliveryFee = 4.99;
  let total = subtotal + deliveryFee;

  basketCalculation.innerHTML = `
    <div class="basketCalculation">

      <div class="calculationRow">
        <span>Subtotal</span>
        <span>${formatPrice(subtotal)}</span>
      </div>

      <div class="calculationRow">
        <span>Delivery fee</span>
        <span>${formatPrice(deliveryFee)}</span>
      </div>

      <div class="calculationRow totalRow">
        <span>Total</span>
        <span>${formatPrice(total)}</span>
      </div>

      <button class="buyButton">
        Buy now (${formatPrice(total)})
      </button>

    </div>
  `;
}

function increaseAmount(basketIndex) {
  basket[basketIndex].amount++;
  renderBasket();
}

function decreaseAmount(basketIndex) {
  basket[basketIndex].amount--;

  if (basket[basketIndex].amount === 0) {
    basket.splice(basketIndex, 1);
  }

  renderBasket();
}

function deleteDish(basketIndex) {
  basket.splice(basketIndex, 1);
  renderBasket();
}

function calculateSubtotal() {
  let subtotal = 0;

  for (let i = 0; i < basket.length; i++) {
    let dish = dishes[basket[i].dishIndex];

    subtotal = subtotal + dish.price * basket[i].amount;
  }

  return subtotal;
}

function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}

renderDishes();
renderBasket();