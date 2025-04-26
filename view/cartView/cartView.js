import { ContainerView } from "../containerView";

export class CartView {
    constructor(data) {
        this.data = data;
    }

    cartRendering(data) {
        console.log("Rendering cart with data:", data);
        const cartdiv = document.querySelector(".cartDiv");
        if (cartdiv) {
            document.body.removeChild(cartdiv);
        }

        const cartDiv = document.createElement("div");
        cartDiv.style.right = cartdiv ? cartdiv.style.right : "-342px";
        cartDiv.classList.add("cartDiv");
        
        this.totalshow(cartDiv, data);
        
        data.forEach(item => {
            if (item.quantity > 0) {
                cartDiv.innerHTML += `<div id="cartBlock" class="itemName">
                    <div class="image"><img src=${item.src}></div>
                    <div class="cartItemDetails">
                        <h3 id="${item.name}">${item.name}</h3>
                        <p style="color: white">${item.type}</p>
                        <div class="priceAndQuantity">
                            <div>${(1 - item.discount_price / 100) * item.price} ₹ /<span style="color: white">${item.unit}</span></div>
                            <div class="addClass quantityDiv" style="display: flex">
                                <div class="subtract" style="font-weight: bolder">-</div>
                                <div class="quantity">${item.quantity}</div>
                                <div class="add" style="font-weight: bolder">+</div>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        });

        this.cartSlide(cartDiv);
        document.body.appendChild(cartDiv);
        
        // Add event listeners for quantity buttons
        this.bindQuantityEvents(data);
    }

    bindQuantityEvents(data) {
        const quantityDivs = document.querySelectorAll('.cartDiv .quantityDiv');
        quantityDivs.forEach(quantityDiv => {
            const addButton = quantityDiv.querySelector('.add');
            const subButton = quantityDiv.querySelector('.subtract');
            const quantity = quantityDiv.querySelector('.quantity');
            const itemName = quantityDiv.closest('.itemName').querySelector('h3').textContent;
            const selectedItem = data.find(item => item.name === itemName);

            if (selectedItem) {
                addButton.addEventListener('click', () => {
                    selectedItem.quantity += 1;
                    quantity.textContent = selectedItem.quantity;
                    this.cartRendering(data);
                });

                subButton.addEventListener('click', () => {
                    if (selectedItem.quantity > 0) {
                        selectedItem.quantity -= 1;
                        quantity.textContent = selectedItem.quantity;
                        this.cartRendering(data);
                    }
                });
            }
        });
    }

    totalshow(cartDiv, data) {
        console.log("Calculating totals for data:", data);
        let MRP = 0;
        const total = document.createElement("div");
        total.classList.add("total");
        
        data.forEach((item) => {
            MRP += (1 - item.discount_price / 100) * item.price * item.quantity;
        });

        const totalAmount = parseFloat(MRP * 1.18).toFixed(2);
        
        total.innerHTML = `
            <div><p>Total MRP:</p><p>₹${MRP.toFixed(2)}</p></div>
            <div><p>GST (18%):</p><p>₹${parseFloat(MRP * 0.18).toFixed(2)}</p></div>
            <div><p>Total Amount:</p><p>₹${totalAmount}</p></div>
            <button class="payNow" style="margin-top: 10px; padding: 10px 20px; background-color: #61dafb; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Pay Now
            </button>
        `;

        cartDiv.appendChild(total);

        // Add click handler for the Pay Now button
        const payNowButton = total.querySelector('.payNow');
        payNowButton.addEventListener('click', () => {
            console.log('Pay Now clicked, amount:', totalAmount);
            this.initiatePayment(totalAmount);
        });
    }

    async initiatePayment(amount) {
        try {
            console.log('Initiating payment for amount:', amount);
            
            // Check if Razorpay is already loaded
            if (!window.Razorpay) {
                // Load Razorpay script
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                
                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }

            console.log('Razorpay script loaded successfully');

            const options = {
                key: 'rzp_test_YOUR_KEY_ID', // Replace with your test key
                amount: Math.round(amount * 100), // Amount in paise
                currency: 'INR',
                name: 'JBMart',
                description: 'Payment for your order',
                image: 'https://example.com/jbmart-logo.png', // Update with your logo
                handler: (response) => {
                    console.log('Payment successful:', response);
                    alert('Payment successful! Thank you for your purchase.');
                    // Clear the cart after successful payment
                    this.data.forEach(item => item.quantity = 0);
                    this.cartRendering(this.data);
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#61dafb'
                },
                modal: {
                    ondismiss: () => {
                        console.log('Payment modal dismissed');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', (response) => {
                console.error('Payment failed:', response.error);
                alert('Payment failed. Please try again.');
            });
            
            rzp.open();
        } catch (error) {
            console.error('Error in payment initialization:', error);
            alert('Error initializing payment. Please try again later.');
        }
    }

    cartSlide(cartDiv) {
        const hideCart = document.createElement("div");
        hideCart.classList.add("hideCart");
        hideCart.textContent = "Hide Cart";
        document.body.appendChild(hideCart);

        hideCart.addEventListener("click", () => {
            if (cartDiv.style.right === "10px") {
                cartDiv.style.right = "-342px";
                hideCart.style.right = "-14px";
                const itemList = document.querySelector(".item-list");
                if (itemList) {
                    itemList.style.gridTemplateColumns = "repeat(6,1fr)";
                }
                const container = document.querySelector(".container");
                if (container) {
                    container.style.width = "calc(100vw - 80px)";
                }
            } else if (cartDiv.style.right === "-342px") {
                cartDiv.style.right = "10px";
                hideCart.style.right = "338px";
                const itemList = document.querySelector(".item-list");
                if (itemList) {
                    itemList.style.gridTemplateColumns = "repeat(4,1fr)";
                }
                const container = document.querySelector(".container");
                if (container) {
                    container.style.width = "calc(100vw - 380px)";
                }
            }
        });
    }
}