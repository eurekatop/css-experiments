export class MyTile extends HTMLElement {
    constructor() {
      super();

      // Create a shadow DOM
      const shadowRoot = this.attachShadow({ mode: 'open' });

      // Define the HTML structure within the shadow DOM
      shadowRoot.innerHTML = `
        <style>
          .container {
            border: 1px solid #ccc;
            padding: 10px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        </style>
        <div class="container">
          <img src="${this.getAttribute('src')}" alt="Image">
          <p>${this.getAttribute('title')}</p>
        </div>
      `;
    }
  }

