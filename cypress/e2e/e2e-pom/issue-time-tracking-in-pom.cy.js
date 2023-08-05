
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
      cy.visit(url + '/board');
      cy.get('[data-testid="board-list:backlog"]').children().eq(0).click();
    });
    cy.get('[placeholder="Short summary"]').invoke('text').then((title) => {
      firstIssue = title;
      cy.log(`Deleting issue: "${firstIssue}"`)
    })
  });

  let firstIssue

  it('Should remove, add and change time estimation', () => {

    //remove estimated and logged time from the first issue

    IssueModal.clearEstimation();
    IssueModal.closeDetailModal();
    cy.contains(firstIssue).click();
    IssueModal.ensureEstimationClear();
    IssueModal.openTameTrackingModal();
    IssueModal.ensureTimeTrackingModalIsVisible()
    IssueModal.clearTimeLeft();
    IssueModal.clearTimeSpent();
    IssueModal.confirmTimeLogging();
    IssueModal.ensureNoTimeLogged();

    //add 10 hours of estimated time to the first issue

    IssueModal.enterOriginalEstimateHours(10);
    IssueModal.closeDetailModal();
    cy.contains(firstIssue).click();
    IssueModal.ensureEstimationIsVisible('10');

    //update 10 hours to 20 in the first issue

    IssueModal.clearEstimation();
    IssueModal.enterOriginalEstimateHours(20);
    IssueModal.closeDetailModal();
    cy.contains(firstIssue).click();
    IssueModal.ensureEstimationIsVisible('20');
    IssueModal.closeDetailModal();

  });



  it('Should log time and remove logging successfully', () => {

    //add spent time to the first issue

    //cy.contains(firstIssue).click();
    IssueModal.clearEstimation();
    IssueModal.ensureEstimationClear();
    IssueModal.enterOriginalEstimateHours(20);
    IssueModal.openTameTrackingModal();
    IssueModal.ensureTimeTrackingModalIsVisible()
    IssueModal.clearTimeLeft();
    IssueModal.clearTimeSpent();
    IssueModal.enterTimeLeftHours(5);
    IssueModal.enterTimeSpentHours(2);
    IssueModal.confirmTimeLogging();
    IssueModal.ensureNoTimeLoggedNotVisible();
    IssueModal.ensureSpentTimeVisible('2');
    IssueModal.ensureTimeRemainingVisible('5');


    //remove logged time from the first issue

    IssueModal.openTameTrackingModal();
    IssueModal.ensureTimeTrackingModalIsVisible();
    IssueModal.clearTimeLeft();
    IssueModal.clearTimeSpent();
    IssueModal.confirmTimeLogging();
    //IssueModal.ensureNoTimeLogged();
    IssueModal.closeDetailModal();
    cy.contains(firstIssue).click();
    //IssueModal.ensureNoTimeLogged();
    IssueModal.ensureEstimationIsVisible('20');

  });

});