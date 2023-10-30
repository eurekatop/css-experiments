import { LitElement, html, css} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';


export type MyTileEventData = {
  tileId:number | undefined,
  src:string,
  title: string
}

declare global {
  interface HTMLElementTagNameMap {
    "my-tile": MyTile;
  }
}

@customElement('my-tile')
export class MyTile extends LitElement {
  @property({ type: Number }) tileId:number|undefined;
  @property({ type: String }) src = '';
  @property({ type: String }) title = '';

  eventData = ():MyTileEventData => {
    return {
      tileId: this.tileId,
      src: this.src,
      title: this.title,
    }
  };

  static styles = css`
    :host {
      display: flex;
      border: 10px solid #00ff22;
      flex-wrap: nowrap;
      justify-content: flex-start;
      flex-direction: column;
      width: 127px;
    }

    div {
      position: absolute;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    p.id {
      position: absolute;
      border: 1px solid black;
      color: black;
      background-color: white;
      margin-right: 1rem;
      padding: 0 0.5rem 0;
      top: -1em;
      color: black;
    }
  `;

  render() {
    return html`
      <div>
        <p class="id">${this.tileId}</p>
      </div>
      <img src="${this.src}" alt="Image">
      <sl-badge>${this.title}</sl-badge>
      <button id="but01" @click="${this.buttonRelationsOnClick}" type="button" class="btn">Add relations</button>
      <button id="deleteButton" 
        @click="${this.buttonDeleteClick}" 
        type="button" class="btn">Delete</button>
    `;
  }

  buttonRelationsOnClick(event: Event) {
    //TODO; TO CORE
    this.dispatchEvent(
      new CustomEvent('buttonRelationsOnClick', 
      { detail: 
          { 
            message: 'Button add relations clicked' ,
            data: this.eventData()
        },
    bubbles: true,
    composed: true, 
  }))
}

  buttonDeleteClick(event: Event) {
    //TODO; TO CORE
    this.dispatchEvent(
        new CustomEvent('buttonDeleteOnClick', 
        { detail: 
            { 
              message: 'Button delete clicked' ,
              data: this.eventData()
          },
      bubbles: true,
      composed: true, 
    }))
  }
}

