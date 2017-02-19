import { BritaFiltersForGmailPage } from './app.po';

describe('brita-filters-for-gmail App', function() {
  let page: BritaFiltersForGmailPage;

  beforeEach(() => {
    page = new BritaFiltersForGmailPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
