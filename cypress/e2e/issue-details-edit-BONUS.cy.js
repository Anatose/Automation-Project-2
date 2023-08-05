describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should(
        'contain',
        'Baby Yoda'
      );
      cy.get('[data-testid="select:assignees"]').should(
        'contain',
        'Lord Gaben'
      );

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should(
        'have.text',
        'Pickle Rick'
      );

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should(
        'have.text',
        'Medium'
      );
    });
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow').click().should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save').click().should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });







  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

  const expectedLength = 5;
  const selectedPriorityArray = [];
  const selectPriority = '[data-testid="select:priority"]';

  it.only('should validate values in issue priorities', () => {
    const expectedLength = 5;
    let selectedPriorityArray = [];
  
    // Access the first element from the initially selected priority value
    cy.get('[data-testid="select:priority"] span').invoke('text').then((selectedPriority) => {
      selectedPriorityArray.push(selectedPriority);
    });
  
    // Access the list of all priority options
    cy.get('[data-testid="select:priority"] [data-testid="select-option"]').each((option) => {
      const priorityValue = option.text().trim();
      selectedPriorityArray.push(priorityValue);
    }).then(() => {
      // Assert that the array has the same length as the predefined number
      expect(selectedPriorityArray.length).to.equal(expectedLength);
  
      // Validate the content of the array
      const expectedPriorities = ["Lowest", "Low", "Medium", "High", "Highest"];
      expect(selectedPriorityArray).to.deep.equal(expectedPriorities);
    });
  });
  


  //Sprint2 A3 Task 2



  it('should validate that reporter name contains only characters', () => {
    cy.get('[data-testid="select:reporter"]').invoke('text').then((reporterName) => {
      expect(reporterName.trim()).to.match(/^[A-Za-z\s]*$/);
    });
  });
  




  //Sprint2 A3 Task 3

  const title = ' Go to Hell ';
  const trimmedTitle = title.trim();

  it('should validate that issue title on the board does not have leading and trailing spaces', () => {
    cy.get('[data-testid="icon:close"]').first().click();
    cy.get('[data-testid="icon:plus"]').click();

    cy.get('input[name="title"]').type(title);
    cy.get('button[type="submit"]').click();
    cy.wait(25000);

    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(trimmedTitle).then((issueTitleElement) => {
        const issueTitle = issueTitleElement.text().trim();
        expect(issueTitle).to.equal(trimmedTitle);
      });
    });
  });

});