describe('validate login', function () {
    it('validate login', function () {
        cy.visit('127.0.0.1:3000')
        cy.contains('Login').click()
        cy.contains('Curriculum Assistant')
            .should('be.visible').then(()=>{
            cy.get('.ant-select-selector').click()
            cy.contains('Manager').click()
            const manager = Cypress.env('manager');
            cy.get('[id=basic_username]').type(manager.email);
            cy.get('[id=basic_password]').type(manager.password);
            cy.contains("Login").click()

            // confirm we have logged in successfully
            cy.contains('Admin')
                .should('be.visible')
                .then(()=>{
                    cy.location('pathname').should('equal','/home/home/dashboard')
                    const userString = window.localStorage.getItem('info')
                    expect(userString).to.be.a('string');
                    const userInfo = JSON.parse(userString);
                    expect(userInfo).to.be.a('object');
                    expect(userInfo).to.have.keys([
                        'role_id',
                        'id',
                        'email',
                        'role',
                    ])
                })
        })
    })
});