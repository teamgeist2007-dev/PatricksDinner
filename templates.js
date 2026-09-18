// Diese Funktion erstellt das HTML für ein Gericht.
function getDishTemplate(dish, dishIndex, buttonText, buttonClass) {
  return `
    <div class="dishCard">
      <img
        class="dishImage"
        src="${dish.image}"
        alt="${dish.name}"
      >

      <div class="dishInfo">
        <h3>${dish.name}</h3>

        <p>${dish.description}</p>

        <strong class="dishPrice">
          ${formatPrice(dish.price)}
        </strong>
      </div>

      <button
        class="${buttonClass}"
        type="button"
        onclick="addToBasket(${dishIndex})"
      >
        ${buttonText}
      </button>
    </div>
  `;
}


// Diese Funktion erstellt den Text für einen leeren Warenkorb.
function getEmptyBasketTemplate() {
  return `
    <div class="emptyBasket">
      Dein Warenkorb ist noch leer.
    </div>
  `;
}


// Diese Funktion erstellt das HTML für ein Gericht im Warenkorb.
function getBasketItemTemplate(
  dish,
  basketIndex,
  amount,
  itemPrice
) {
  return `
    <div class="basketItem">
      <div class="basketItemContent">

        <h3 class="basketItemName">
          ${amount} x ${dish.name}
        </h3>

        <div class="basketItemBottom">

          <div class="amountButtons">
            <button
              class="amountButton"
              type="button"
              onclick="decreaseAmount(${basketIndex})"
            >
              -
            </button>

            <span>${amount}</span>

            <button
              class="amountButton"
              type="button"
              onclick="increaseAmount(${basketIndex})"
            >
              +
            </button>

            <button
              class="deleteButton"
              type="button"
              onclick="deleteDish(${basketIndex})"
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


// Diese Funktion erstellt die Berechnung und den Bestellbutton.
function getBasketCalculationTemplate(
  subtotal,
  deliveryFee,
  total
) {
  return `
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