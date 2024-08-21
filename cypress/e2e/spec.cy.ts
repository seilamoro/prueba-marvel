describe('Main spec', () => {
  
  const apiUrlEnd = "&ts=1&apikey=90a7b77cc2106af91554c2187db95471&hash=bc0e4e94c49ed17bcefd9ec428013cfd";

  beforeEach(() => {
    cy.intercept(
      'GET',
      "https://gateway.marvel.com/v1/public/characters?limit=50" + apiUrlEnd,
      { 
        statusCode: 200,
        fixture: "mockCharacters.json" 
      }
    );
    cy.intercept(
      'GET',
      "https://gateway.marvel.com/v1/public/characters/1017100?limit=50" + apiUrlEnd,
      { 
        statusCode: 200,
        fixture: "mockCharacterDetail.json" 
      }
    );
    cy.intercept(
      'GET',
      "http://gateway.marvel.com/v1/public/characters/1017100/comics?limit=20&orderBy=onsaleDate" + apiUrlEnd,
      { 
        statusCode: 200,
        fixture: "mockComics.json" 
      }
    );
    cy.visit('http://localhost:3000/');
  });

  it('Check texts', () => {
    cy.get('.div-favorites-count').contains("0");
    cy.contains("50 RESULTS");
    cy.get("input").invoke('attr', 'placeholder').should('contain', 'SEARCH A CHARACTER...');
    cy.contains("3-D Man");
    cy.contains("A-Bomb (HAS)");
  })

  it('Check add and remove favorites', () => {
    cy.get('.favorites').first().click();
    cy.get('.div-favorites-count').contains("1");
    cy.get('.favorites').eq(2).click();
    cy.get('.div-favorites-count').contains("2");
    cy.get('.favorites').eq(3).click();
    cy.get('.div-favorites-count').contains("3");
    cy.get('.favorites').eq(2).click();
    cy.get('.div-favorites-count').contains("2");
  })

  it('Check show favorites', () => {
    cy.get('.favorites').first().click();
    cy.get('.favorites').eq(2).click();
    cy.get('.favorites').eq(3).click();

    cy.get('.div-favorites img').click();

    cy.contains("FAVORITES");
    cy.contains("3 RESULTS");
    cy.contains("3-D Man");
    cy.contains("A.I.M.");
    cy.contains("Aaron Stack");
    cy.get('.favorites').first().click();
    cy.get('.div-favorites-count').contains("2");
    cy.contains("3-D Man").should('not.exist');
  })

  it('Check show favorites and return list', () => {
    cy.get('.favorites').first().click();
    cy.get('.favorites').eq(2).click();
    cy.get('.favorites').eq(3).click();

    cy.get('.div-favorites img').click();
    cy.get('.logo img').click();

    cy.contains("FAVORITES").should('not.exist');
    cy.contains("50 RESULTS");
    cy.contains("A-Bomb (HAS)");
  })

  it('Check search', () => {
    cy.get('#search').type("3");
    cy.contains("1 RESULTS");
    cy.contains("3-D Man");
  })

  it('Check superhero details', () => {
    cy.get('.superheroCardImage').eq(1).click();
    cy.contains("A-Bomb (HAS)");
    cy.contains("Rick Jones has been Hulk's best bud since day one");
    cy.contains("COMICS");
    cy.contains("Hulk (2008) #53");
    cy.get('.div-favorites-count').contains("0");
    cy.get('.favorites').first().click();
    cy.get('.div-favorites-count').contains("1");
    cy.get('.favorites').first().click();
    cy.get('.div-favorites-count').contains("0");
    cy.get('.favorites').first().click();
    cy.get('.div-favorites-count').contains("1");

    cy.get('.logo img').click();
    cy.contains("50 RESULTS");
    cy.get('.div-favorites-count').contains("1");

    cy.get('.superheroCardImage').eq(1).click();
    cy.get('.div-favorites-count').contains("1");
  })
})