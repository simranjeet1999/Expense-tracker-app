// your-test.e2e-spec.ts
import { browser, by, element } from 'protractor';

describe('Your Angular App', () => {
  it('should display a welcome message', () => {
    browser.get('/');
    const welcomeMessage = element(by.css('h1')).getText();
    // expect(welcomeMessage).toEqual('ed');
  });
});
