import { createElement } from '@lwc/engine-dom';
import WireLDS from 'c/wireLDS';
import { getRecord } from 'lightning/uiRecordApi';
// Mock realistic data
const mockGetRecord = require('./data/getRecord.json');
describe('c-wire-l-d-s', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });
  describe('getRecord @wire data', () => {
    describe('getRecord @wire error', () => {
        it('shows error message', () => {
        const element = createElement('c-wire-l-d-s', {
            is: WireLDS
        });
        document.body.appendChild(element);
        // Emit error from @wire
        getRecord.error();
        return Promise.resolve().then(() => {
            const errorElement = element.shadowRoot.querySelector('p');
            expect(errorElement).not.toBeNull();
            expect(errorElement.textContent).toBe('No account found.');
        });
        });
    });
    it('renders contact details', () => {
      const element = createElement('c-wire-l-d-s', {
        is: WireLDS
      });
      document.body.appendChild(element);
      // Emit data from @wire
      getRecord.emit(mockGetRecord);
      return Promise.resolve().then(() => {
        // Select elements for validation
        const nameElement = element.shadowRoot.querySelector('p.accountName');
        expect(nameElement.textContent).toBe(
          'Account Name: ' + mockGetRecord.fields.Name.value
        );
        const industryElement = element.shadowRoot.querySelector('p.accountIndustry');
        expect(industryElement.textContent).toBe(
          'Industry: ' + mockGetRecord.fields.Industry.value
        );
        const phoneElement = element.shadowRoot.querySelector('p.accountPhone');
        expect(phoneElement.textContent).toBe(
          'Phone: ' + mockGetRecord.fields.Phone.value
        );
        const ownerElement = element.shadowRoot.querySelector('p.accountOwner');
        expect(ownerElement.textContent).toBe(
          'Owner: ' + mockGetRecord.fields.Owner.displayValue
        );
      });
    });
  });
});