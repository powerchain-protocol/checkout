export class PowerPay {
    config;
    constructor(config) {
        this.config = config;
    }
    async open(session) {
        const modal = document.createElement("div");
        modal.innerHTML = `<div style="position:fixed;inset:0;background:#0008;display:grid;place-items:center">
   <div style="background:white;padding:24px;border-radius:16px;font-family:sans-serif">
   <h2>PowerPay Checkout</h2>
   <p>${session.merchant}</p>
   <p>${session.currency} ${(session.amount / 100).toFixed(2)}</p>
   <button id="pp-pay">Pay</button></div></div>`;
        document.body.appendChild(modal);
        return new Promise(resolve => {
            modal.querySelector("#pp-pay").addEventListener("click", () => {
                modal.remove();
                resolve({ status: "paid", reference: session.reference });
            });
        });
    }
}
