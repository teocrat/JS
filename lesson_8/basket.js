"use strict";

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket')

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCard')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCard(id, name, price);
});

function addToCard(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        }
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc +
        product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket).reduce((acc, product) => acc +
        product.price * product.count, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl
        .querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id]
        .count * basket[id].price;
}

function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-productId="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price *
            basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}