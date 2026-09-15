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
    let amount = getDishAmount(i);
    let buttonText = "Add to basket";
    let buttonClass = "addButton";

    if (amount > 0) {
      buttonText = "Added " + amount;
      buttonClass = "addButton addedButton";
    }

    dishList.innerHTML += `
      <div class="dishCard">
        <img
          class="dishImage"
          src="${dishes[i].image}"
          alt="${dishes[i].name}"
        >

        <div class="dishInfo">
          <h3>${dishes[i].name}</h3>
          <p>${dishes[i].description}</p>

          <strong class="dishPrice">
            ${formatPrice(dishes[i].price)}
          </strong>
        </div>

        <button
          class="${buttonClass}"
          type="button"
          onclick="addToBasket(${i})"
        >
          ${buttonText}
        </button>
      </div>
    `;
  }
}

function getDishAmount(dishIndex) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].dishIndex === dishIndex) {
      return basket[i].amount;
    }
  }

  return 0;
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

  renderDishes();
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
        <div class="basketItemContent">

          <h3 class="basketItemName">
            ${basket[i].amount} x ${dish.name}
          </h3>

          <div class="basketItemBottom">

            <div class="amountButtons">
              <button
                class="amountButton"
                type="button"
                onclick="decreaseAmount(${i})"
              >
                -
              </button>

              <span>${basket[i].amount}</span>

              <button
                class="amountButton"
                type="button"
                onclick="increaseAmount(${i})"
              >
                +
              </button>

              <button
                class="deleteButton"
                type="button"
                onclick="deleteDish(${i})"
              >
                Löschen
              </button>
            </div>

            <span class="basketPrice">
              ${formatPrice(itemPrice)}
            </span>

          </div>
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

      <button
        class="buyButton"
        type="button"
        onclick="openOrderDialog()"
      >
        Buy now (${formatPrice(total)})
      </button>

    </div>
  `;
}

function increaseAmount(basketIndex) {
  basket[basketIndex].amount++;

  renderDishes();
  renderBasket();
}

function decreaseAmount(basketIndex) {
  basket[basketIndex].amount--;

  if (basket[basketIndex].amount === 0) {
    basket.splice(basketIndex, 1);
  }

  renderDishes();
  renderBasket();
}

function deleteDish(basketIndex) {
  basket.splice(basketIndex, 1);

  renderDishes();
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

function toggleBasket() {
  let basketElement = document.getElementById("basket");

  basketElement.classList.toggle("showBasket");
}

function openOrderDialog() {
  let orderDialog = document.getElementById("orderDialog");
  let basketElement = document.getElementById("basket");

  basketElement.classList.remove("showBasket");
  orderDialog.showModal();

  basket = [];

  renderDishes();
  renderBasket();
}

function closeOrderDialog() {
  let orderDialog = document.getElementById("orderDialog");

  orderDialog.close();
}

renderDishes();
renderBasket();