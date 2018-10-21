import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `capiteccomponent-element`
 * This element will get the latest Capitec share price from a public finacial data service provider and prompt the user to enter an amount whereby it&#39;ll display the calculated number of shares
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class CapiteccomponentElement extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      font-family: flamaLight, Century Gothic, Helvetica, sans-serif;          
    }  
    h3 {
      color: #abb3b6;
    }
    h2 {
      color: #009de0;
    }
    h2.alt {
      color: #526065;
    }
    img {
      width: 30%;          
    }
    p {
      font-family : Arial;
      color : #526065;
    }
    p.alt {
      font-family : Arial;
      color : #526065;
      font-weight : bold;
    }
    span {
      font-family : Arial;
      color : #526065;
    } 
    b {
      font-family : Arial;
      color : #526065;
      font-weight : bold;
    }  
    button {
      background-color: #526065;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      width: 100%;
  }  
  input {
    width: 100%;
    font-size: 16px;
  } 
  </style> 
  <img src="https://vbank.capitecbank.co.za/Web/Content/images/logo_215x33.svg">     
 
  <h3>The current share price for Capitec:</h3>       
  <p class="alt"> [[Symbol]] </p> <b>R</b><span>[[Price]]</span>
  <p>How much money would you like to invest?</p> 
  <input value="{{amount::change}}" />
  <button on-click="clicked">Calculate</button>
  <template is="dom-if" if="{{Quantity}}">
  <p>This is how many shares you will get:</p>
  <h2> [[Quantity]] </h2>
  <p>Capitec shares for <b>R</b>{{amount}}</p>
  </template>
    `;
  }
  static get properties() {
    return {
      User: {
        type: String,
        value: 'Capitec User',
      }, 
      Symbol : {
        type: String
      },     
      Price : {
        type: Number,
      },      
      Units : {
        type: Number,
      },
      Quantity : {
        type: Number
      },    
    };
  }

  constructor() {
    super(); 
    this.getLatestMarketPrice();   
  }

  clicked(){    
    this.calculateQuantity();    
}

getLatestMarketPrice(){
  const Http = new XMLHttpRequest();
  const url='https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=CPI.JOH&apikey=L2UAWJUU254LBSQS';
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange=(e)=>{
  let jsonResponse = JSON.parse(Http.responseText); 
  this.Symbol = jsonResponse['Global Quote']['01. symbol'];  
  this.Price = Math.round(jsonResponse['Global Quote']['05. price'] * 100) / 100;  
  console.log(Http.responseText); 
  console.log(this.Price)
  console.log('Amount: ' + this.getAttribute('amount'))
}
}

calculateQuantity(){
  let quantity = (this.amount/this.Price);
  this.Quantity = quantity;
  console.log("Quantity: " + this.amount);
}

}

window.customElements.define('capiteccomponent-element', CapiteccomponentElement);
