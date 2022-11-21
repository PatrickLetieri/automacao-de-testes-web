import createAnAccountFixture from '../fixtures/createAnAccount.json'

class CreateAnAccount {

    preencheFormularioCreateAnAccount(FirstName, LastName, Email, Password, ConfirmPassword) {
        cy.preencheFormulario([
            createAnAccountFixture.seletores.linkFirstName,
            createAnAccountFixture.seletores.linkLastName,
            createAnAccountFixture.seletores.linkEmail,
            createAnAccountFixture.seletores.linkPassword,
            createAnAccountFixture.seletores.linkConfirmPassword
        ], [
            FirstName,
            LastName,
            Email,
            Password,
            ConfirmPassword
        ])
    }

    enviaFormulario(seletorBtn) {
        cy.get(seletorBtn).click()
    }

}

export default CreateAnAccount