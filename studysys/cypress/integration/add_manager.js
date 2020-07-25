describe("add manager", function () {
  it("manager mode → login → add a manger  (A) → logout → login as A → validate menu → delete A", function () {
    cy.visit("127.0.0.1:3000");
    cy.contains("Login").click();
    cy.contains("Curriculum Assistant")
      .should("be.visible")
      .then(() => {
        cy.get(".ant-select-selector").click();
        cy.contains("Manager").click();
        const manager = Cypress.env("manager");
        cy.get("[id=basic_username]").type(manager.email);
        cy.get("[id=basic_password]").type(manager.password);
        cy.contains("Login").click();
        // Login successful
        cy.contains("Admin")
          .should("be.visible")
          .then(() => {
            cy.get("[role=menuitem]").contains("Manager").click();
            cy.contains("Manager List").click();
            cy.contains("Add Manager")
              .should("be.visible")
              .then(() => {
                  cy.contains("Add Manager").click()
                  const manager = Cypress.env('newManager');
                  cy.get('[id=form_in_modal_nickname]').type(manager.nickName);
                  cy.get('[id=form_in_modal_email]').type(manager.email);
                  cy.get('[id=form_in_modal_password]').type(manager.password);
                  cy.get('[id=form_in_modal_role]').click()
                  cy.contains(manager.role).click()
                  cy.contains("Ok").click()
                  cy.contains("Cancel").click()
                  cy.get('[placeholder=search with Name...]').type(manager.nickName);
              });
          });
      });
  });
});
