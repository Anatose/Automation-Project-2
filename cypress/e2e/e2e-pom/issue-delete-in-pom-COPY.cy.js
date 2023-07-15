
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
      cy.visit(url + '/board');
      cy.get('[data-testid="board-list:backlog"]').children().eq(0).click();
    });
    cy.get('[placeholder="Short summary"]').invoke('text').then((title) => {
      deletedIssue = title;
      cy.log(`Deleting issue: "${deletedIssue}"`)
  })
  });

  let deletedIssue 

  it('Should delete issue successfully', () => {

    const expectedAmountIssues = '3';
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(expectedAmountIssues, deletedIssue);
  });


  it('Should cancel deletion process successfully', () => {

    const expectedAmountIssues = '4';
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(expectedAmountIssues, deletedIssue);
  });
});
