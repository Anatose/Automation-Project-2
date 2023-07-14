describe('Issue delete', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            backlogList().children().eq(0).click();
            getIssueDetailsModal().should('exist');
        });
        //extracting text from issue title for variable
        cy.get('[placeholder="Short summary"]').invoke('text').then((title) => {
            deletedIssue = title;
            cy.log(`Deleting issue: "${deletedIssue}"`)
        })
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const backlogList = () => cy.get('[data-testid="board-list:backlog"]');
    let deletedIssue


    it('Should delete the first issue successfully', () => {


        getIssueDetailsModal()
        //deleting
        cy.get('[data-testid="icon:trash"]').click()

        //comfirmation
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete issue')
            .click()
            .should('not.exist');

        //deleted issue not present in the list
        cy.reload();
        backlogList().children().should('not.contain', deletedIssue)

        backlogList()
            .children()
            .should('have.length', 3);
    });

    it('Should be able to abort deleting in confirmation window', () => {

        getIssueDetailsModal()
        //start deleting
        cy.get('[data-testid="icon:trash"]').click()

        //cancel deletion process
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Cancel')
            .click()
            .should('not.exist');

        //the issue is still presenting in the list
        cy.reload();
        backlogList().children().should('contain', deletedIssue)

        backlogList()
            .children()
            .should('have.length', 4);
    });

});

