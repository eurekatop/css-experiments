import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

declare global {
    interface HTMLElementTagNameMap {
      "my-element": MyElement;
    }
}

@customElement('my-element')
export class MyElement extends LitElement {
  @property({type: Boolean, reflect: true})
  active: boolean = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    :host([active]) {
      border: 1px solid red;
    }`;

    constructor(){
        super()
    }

  render() {
    return html`
      <span>Active: ${this.active}</span>
      <button @click="${() => this.active = !this.active}">Toggle active</button>
    `;
  }
}



