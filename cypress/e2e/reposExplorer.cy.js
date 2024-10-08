describe('Repos explorer', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173')
  });

  it('should show a list of repos on search', () => {
    // Wait until data is loaded
    cy.get('[data-cy="searchQuery"]').should('be.visible')
    // Input a query for search
    cy.get('[data-cy="searchQuery"] input').type('sample')
    // Accordion with users should be visible
    cy.get('[data-cy="user0"]').should('be.visible')
    // Open first accordion
    cy.get('[data-cy="user0"] h3 div[tabindex="0"]').click()
    // Check that repos are visible
    cy.get('[data-cy="user0repo0"]').should('be.visible')
  });
});
