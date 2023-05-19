describe('RepoList', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    // clear local storage
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  const clickFavourite = (index: number) => {
    cy.get('[aria-label="Favourite"]').eq(index).click();
  };

  it('should display a list of repos', () => {
    // TODO: better semantic selector
    cy.get('ul > li').should('have.length.greaterThan', 0);
  });

  it('should allow a repo to be favourited', () => {
    const rowIndex = 3;
    clickFavourite(rowIndex);
    cy.get('[aria-label="Favourite"]')
      .eq(rowIndex)
      .should('have.attr', 'aria-checked', 'true');

    // TODO: check colour of cell has changed
  });

  it('should allow the same repo to be unfavourited', () => {
    const rowIndex = 2;

    // Favourite
    clickFavourite(rowIndex);

    // Unfavourite
    clickFavourite(rowIndex);
    cy.get('[aria-label="Favourite"]')
      .eq(rowIndex)
      .should('have.attr', 'aria-checked', 'false');

    // TODO: check if colour of cell has toggled accordingly
  });

  it('should filter the list of repos by favourited', () => {
    const filterLabel = 'Favourites';

    [0, 1, 6].forEach((index) => {
      clickFavourite(index);
    });

    cy.get(`[aria-label="Show ${filterLabel}"]`).click();

    // TODO: better semantic selector
    cy.get('ul > li').should('have.length', 3);
  });

  it('should show all repos again', () => {
    const allLabel = 'All';
    const favLabel = 'Favourites';

    cy.get(`[aria-label="Show ${favLabel}"]`).click();

    // TODO: better semantic selector
    cy.get('ul > li').should('have.length', 0);

    cy.get(`[aria-label="Show ${allLabel}"]`).click();
    // TODO: better semantic selector
    cy.get('ul > li').should('have.length.greaterThan', 0);
  });
});
