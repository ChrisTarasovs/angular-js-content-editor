import { DragNdropNg2Page } from './app.po';

describe('drag-ndrop-ng2 App', () => {
  let page: DragNdropNg2Page;

  beforeEach(() => {
    page = new DragNdropNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
