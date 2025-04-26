import { ContainerView } from "./containerView";
import { Controller } from "../controller/controller";
import { Model } from "../model/model";
import { CartView } from "./cartView/cartView";

export class HeaderView {
    constructor(data) {
        this.data = data;
        this.header = document.querySelector(".header");
        this.controller = new Controller(this.data);
        this.containerView = new ContainerView(this.data);
        this.cartView = new CartView(this.data);
        this.container = document.querySelector(".container");
        
        this.initialize();
    }

    initialize() {
        this.headerMainContent();
        this.logo = document.getElementById("logo");
        this.loginButton = document.getElementById("logIn");
        this.logInPopUp();
        this.bindEventOnLogo();
        this.loginPopUp = document.querySelector(".popUp");
        this.bindEventOnLogIn();
        this.submitButton = document.querySelector("button[type='submit']");
        this.searchInput = document.querySelector('input');
        this.searchedItems();
        this.cartButton();
    }

    headerMainContent() {
        this.header.innerHTML = `
            <div id="logo" style="font-size: 24px; font-weight: bold; color: white;">JBMart</div>
            <div class="inputSection">
                <div><i class="fa fa-search"></i></div>
                <input type="text" class="inputName" placeholder="Search for products">
            </div>
            <button id="logIn">Login</button>
            <button id="cartButton" class="cart">Cart</button>
        `;
    }

    logInPopUp() {
        const logInPopUp = document.createElement("div");
        logInPopUp.classList.add("popUp");
        logInPopUp.innerHTML = `
            <div class="loginPopUp">
                <h3>Login</h3>
                <div id="loginMessage" class="error-message" style="display: none;"></div>
                <div>
                    <form id="loginForm">
                        <div>
                            <label for="email">Email:</label>
                            <input type="email" id="email" required placeholder="Enter your Mail ID">
                        </div>
                        <div>
                            <label for="password">Password:</label>
                            <input type="password" id="password" required placeholder="Password">
                        </div>
                        <button id="submit" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        `;
        this.header.appendChild(logInPopUp);
    }

    bindEventOnLogIn() {
        if (this.loginButton) {
            this.loginButton.addEventListener("click", () => {
                this.loginPopUp.style.display = "flex";
                // Reset form and message when opening popup
                const form = document.getElementById('loginForm');
                const message = document.getElementById('loginMessage');
                if (form) form.reset();
                if (message) message.style.display = 'none';
            });
        }

        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const message = document.getElementById('loginMessage');

                // Basic validation
                if (!email || !password) {
                    message.textContent = 'Please fill in all fields';
                    message.style.display = 'block';
                    return;
                }

                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    message.textContent = 'Please enter a valid email address';
                    message.style.display = 'block';
                    return;
                }

                // Password length check
                if (password.length < 6) {
                    message.textContent = 'Password must be at least 6 characters long';
                    message.style.display = 'block';
                    return;
                }

                // Simulate authentication (replace with actual backend call later)
                this.authenticateUser(email, password);
            });
        }
    }

    authenticateUser(email, password) {
        const message = document.getElementById('loginMessage');
        
        // Simulate API call delay
        setTimeout(() => {
            // For demo purposes, accept any valid email and password
            if (email && password) {
                message.textContent = 'Login successful!';
                message.classList.remove('error-message');
                message.classList.add('success-message');
                message.style.display = 'block';
                
                // Update UI to show logged in state
                this.loginButton.textContent = 'Logout';
                this.loginButton.onclick = () => this.logout();
                
                // Hide popup after successful login
                setTimeout(() => {
                    this.loginPopUp.style.display = "none";
                }, 1500);
            } else {
                message.textContent = 'Invalid credentials';
                message.style.display = 'block';
            }
        }, 1000);
    }

    logout() {
        this.loginButton.textContent = 'Login';
        this.loginButton.onclick = () => {
            this.loginPopUp.style.display = "flex";
        };
    }

    bindEventOnLogo() {
        if (this.logo) {
            this.logo.addEventListener("click", () => {
                window.location.reload();
            });
        }
    }

    searchedItems() {
        if (this.searchInput) {
            this.searchInput.addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {
                    const searchTerm = event.target.value;
                    const searchitem = this.controller.dataOfSearchedItems(searchTerm);
                    this.containerView.renderItems(searchitem);
                }
            });
        }
    }

    cartButton() {
        const cartbutton = this.header.querySelector("#cartButton");
        if (cartbutton && this.container) {
            cartbutton.addEventListener("click", () => {
                const itemList = this.container.querySelector(".item-list");
                if (itemList) {
                    itemList.style.gridTemplateColumns = "repeat(4,1fr)";
                    this.container.style.width = 'calc(100vw - 380px)';
                    this.cartView.cartRendering(this.data);
                    const cartDiv = document.querySelector(".cartDiv");
                    if (cartDiv) {
                        cartDiv.style.right = "10px";
                        cartDiv.style.display = "block";
                    }
                }
            });
        }
    }
}