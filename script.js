let cartItems = 0;

document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

const cart = document.querySelector(".cart-items");
const checkoutBtn = document.getElementById("checkout-btn");

cart.addEventListener("dragover", dragOver);
cart.addEventListener("drop", drop);

function dragStart(event) {
  console.log("Началось перетаскивание", event.target);
  event.dataTransfer.setData(
    "text/plain",
    event.target.closest(".item").dataset.id
  );
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const draggedItem = document.querySelector(`.item[data-id='${id}']`);
  console.log(draggedItem);

  if (!cart.querySelector(`.item[data-id='${id}']`)) {
    const clonedItem = draggedItem.cloneNode(true);
    clonedItem.classList.add("in-cart");

    clonedItem.style.right = `${Math.random() * 136}px`;
    draggedItem.style.visibility = "hidden";
    cart.appendChild(clonedItem);
    cartItems++;

    if (cartItems === 3) {
      showCheckoutButton();
    }
  }
}
