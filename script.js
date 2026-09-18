let basket = [];


// Diese Funktion zeigt alle Gerichte auf der Webseite an.
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

    dishList.innerHTML += getDishTemplate(
      dishes[i],
      i,
      buttonText,
      buttonClass
    );
  }
}


// Diese Funktion gibt zurück, wie oft ein Gericht im Warenkorb liegt.
function getDishAmount(dishIndex) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].dishIndex === dishIndex) {
      return basket[i].amount;
    }
  }

  return 0;
}


// Diese Funktion fügt ein Gericht zum Warenkorb hinzu.
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


// Diese Funktion zeigt den aktuellen Inhalt des Warenkorbs an.
function renderBasket() {
  let basketItems = document.getElementById("basket-items");
  let basketCalculation = document.getElementById("basket-calculation");

  basketItems.innerHTML = "";
  basketCalculation.innerHTML = "";

  updateBasketCount();

  if (basket.length === 0) {
    basketItems.innerHTML = getEmptyBasketTemplate();
    return;
  }

  renderBasketItems();
  renderBasketCalculation();
}


// Diese Funktion zeigt alle Gerichte im Warenkorb an.
function renderBasketItems() {
  let basketItems = document.getElementById("basket-items");

  for (let i = 0; i < basket.length; i++) {
    let dish = dishes[basket[i].dishIndex];
    let amount = basket[i].amount;
    let itemPrice = dish.price * amount;

    basketItems.innerHTML += getBasketItemTemplate(
      dish,
      i,
      amount,
      itemPrice
    );
  }
}


// Diese Funktion zeigt die Berechnung im Warenkorb an.
function renderBasketCalculation() {
  let basketCalculation = document.getElementById("basket-calculation");
  let subtotal = calculateSubtotal();
  let deliveryFee = 4.99;
  let total = subtotal + deliveryFee;

  basketCalculation.innerHTML =
    getBasketCalculationTemplate(
      subtotal,
      deliveryFee,
      total
    );
}


// Diese Funktion erhöht die Anzahl eines Gerichts.
function increaseAmount(basketIndex) {
  basket[basketIndex].amount++;

  renderDishes();
  renderBasket();
}


// Diese Funktion verringert die Anzahl eines Gerichts.
function decreaseAmount(basketIndex) {
  basket[basketIndex].amount--;

  if (basket[basketIndex].amount === 0) {
    basket.splice(basketIndex, 1);
  }

  renderDishes();
  renderBasket();
}


// Diese Funktion entfernt ein Gericht aus dem Warenkorb.
function deleteDish(basketIndex) {
  basket.splice(basketIndex, 1);

  renderDishes();
  renderBasket();
}


// Diese Funktion berechnet die Zwischensumme.
function calculateSubtotal() {
  let subtotal = 0;

  for (let i = 0; i < basket.length; i++) {
    let dish = dishes[basket[i].dishIndex];
    let amount = basket[i].amount;

    subtotal = subtotal + dish.price * amount;
  }

  return subtotal;
}


// Diese Funktion zeigt die Anzahl am Warenkorb-Symbol.
function updateBasketCount() {
  let basketCount = document.getElementById("basket-count");
  let totalAmount = 0;

  for (let i = 0; i < basket.length; i++) {
    totalAmount = totalAmount + basket[i].amount;
  }

  basketCount.innerHTML = totalAmount;

  if (totalAmount > 0) {
    basketCount.classList.add("showBasketCount");
  } else {
    basketCount.classList.remove("showBasketCount");
  }
}


// Diese Funktion formatiert einen Preis.
function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}


// Diese Funktion öffnet oder schließt den mobilen Warenkorb.
function toggleBasket() {
  let basketElement = document.getElementById("basket");

  basketElement.classList.toggle("showBasket");
}


// Diese Funktion schließt den mobilen Warenkorb.
function closeBasket() {
  let basketElement = document.getElementById("basket");

  basketElement.classList.remove("showBasket");
}


// Diese Funktion öffnet die Bestellbestätigung.
function openOrderDialog() {
  let orderDialog = document.getElementById("orderDialog");

  closeBasket();
  orderDialog.showModal();

  basket = [];

  renderDishes();
  renderBasket();
}


// Diese Funktion schließt die Bestellbestätigung.
function closeOrderDialog() {
  let orderDialog = document.getElementById("orderDialog");

  orderDialog.close();
}


// Diese Funktionen werden beim Laden der Seite ausgeführt.
renderDishes();
renderBasket();