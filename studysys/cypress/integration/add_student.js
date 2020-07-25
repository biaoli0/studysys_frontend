describe("add student",function () {
    it('teacher mode → add a student → validate student list contains the student',function () {
        cy.visit('127.0.0.1:3000')
        cy.contains('Login').click()
        cy.contains('Curriculum Assistant')
            .should('be.visible').then(()=>{
            cy.get('.ant-select-selector').click()
            cy.contains('Teacher').click()
            const teacher = Cypress.env('teacher');
            cy.get('[id=basic_username]').type(teacher.email);
            cy.get('[id=basic_password]').type(teacher.password);
            cy.contains("Login").click()
        })
    })
})