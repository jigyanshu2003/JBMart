import { Model } from './model/model'
import { ContainerView } from './view/containerView'
import { HeaderView } from './view/headerView'
import './style.css'
import { CartView } from './view/cartView/cartView'

// Initialize your application
const model = new Model();
const data = model.getData();

// Initialize views with the same data instance
const headerView = new HeaderView(data);
const containerView = new ContainerView(data);
const cartView = new CartView(data);

// Initialize the application
containerView.init();

// Initialize cart button
const cartButton = document.querySelector('#cartButton');
if (cartButton) {
    cartButton.addEventListener('click', () => {
        const cartDiv = document.querySelector('.cartDiv');
        if (cartDiv) {
            cartDiv.style.right = '10px';
            cartDiv.style.display = 'block';
            cartView.cartRendering(data);
        }
    });
}

// Initialize cart slide
const hideCart = document.querySelector('.hideCart');
if (hideCart) {
    hideCart.addEventListener('click', () => {
        const cartDiv = document.querySelector('.cartDiv');
        if (cartDiv) {
            if (cartDiv.style.right === '10px') {
                cartDiv.style.right = '-342px';
                hideCart.style.right = '-14px';
                const itemList = document.querySelector('.item-list');
                if (itemList) {
                    itemList.style.gridTemplateColumns = 'repeat(6,1fr)';
                }
                const container = document.querySelector('.container');
                if (container) {
                    container.style.width = 'calc(100vw - 80px)';
                }
            } else if (cartDiv.style.right === '-342px') {
                cartDiv.style.right = '10px';
                hideCart.style.right = '338px';
                const itemList = document.querySelector('.item-list');
                if (itemList) {
                    itemList.style.gridTemplateColumns = 'repeat(4,1fr)';
                }
                const container = document.querySelector('.container');
                if (container) {
                    container.style.width = 'calc(100vw - 380px)';
                }
                cartView.cartRendering(data);
            }
        }
    });
}

// Initialize cart quantity manager
const quantityManager = (data) => {
    const quantityDivList = document.querySelectorAll('.quantityDiv');
    quantityDivList.forEach((quantityDiv) => {
        const addButton = quantityDiv.querySelector('.add');
        const subButton = quantityDiv.querySelector('.subtract');
        const quantity = quantityDiv.querySelector('.quantity');
        const itemName = quantityDiv.closest('.itemName').querySelector('h3').textContent;
        const selectedItem = data.find(item => item.name === itemName);
        if (selectedItem) {
            addButton.addEventListener('click', () => {
                selectedItem.quantity += 1;
                quantity.textContent = selectedItem.quantity;
                cartView.cartRendering(data);
            });
            subButton.addEventListener('click', () => {
                if (selectedItem.quantity > 0) {
                    selectedItem.quantity -= 1;
                    quantity.textContent = selectedItem.quantity;
                    cartView.cartRendering(data);
                }
                if (selectedItem.quantity < 1) {
                    containerView.renderItems(data);
                }
            });
        }
    });
};

// Payment component will be rendered dynamically in cartView

// Payment component will be rendered dynamically in cartView 