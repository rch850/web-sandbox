// CSS module scripts
// https://www.chromestatus.com/feature/5948572598009856
import styles from './cute-badge.css' assert { type: 'css' }

export class CuteBadge extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "closed" })

        // インポートした CSS をこのように使える。
        shadowRoot.adoptedStyleSheets = [styles]

        const elem = document.createElement("span")
        elem.innerText = this.getAttribute("text")

        shadowRoot.appendChild(elem);
    }
}

window.customElements.define("cute-badge", CuteBadge);
