export class OneTimeCodeElement extends HTMLInputElement {
    connectedCallback() {
        this.receive();
    }
    async receive() {
        console.log('lisning sms...')
        let { code, type } = await navigator.credentials.get({
            otp: {
                transport: ["sms"]
            }
        });
        console.log(`received sms! ${code}`)
        this.value = code
    }
}

window.customElements.define("one-time-code", OneTimeCodeElement, {
    extends: "input"
})