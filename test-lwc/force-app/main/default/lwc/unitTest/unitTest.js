import { LightningElement, api } from 'lwc';

export default class UnitTest extends LightningElement {
  @api unitNumber = 5; // acessível e modificável via testes

  handleChange(event) {
    this.unitNumber = event.target.value;
  }
}
