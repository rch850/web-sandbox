window.customElements.define("open-time",
    class OpenTimeElement extends HTMLElement {
        constructor() {
            super()
            const shadowRoot = this.attachShadow({ mode: "closed" })

            const elem = document.createElement("span")
            const openTime = new Date()
            // openTime.setHours(Number(this.getAttribute("open")))
            openTime.setHours(Math.floor(Math.random() * 24))
            const closeTime = new Date()
            // closeTime.setHours(Number(this.getAttribute("close")))
            closeTime.setHours(Math.floor(Math.random() * 24))

            // Feature: Add dayPeriod option for Intl.DateTimeFormat
            // https://www.chromestatus.com/feature/6520669959356416
            const dtf = Intl.DateTimeFormat("ja", { hour: "numeric", hour12: true, dayPeriod: "short" })
            elem.innerText = `${dtf.format(openTime)}から${dtf.format(closeTime)}まで営業`

            shadowRoot.appendChild(elem);
        }
    })
