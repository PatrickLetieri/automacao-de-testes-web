class MyAccountPage{

    accessaEditAddress(linkEditAddress){
        cy.get(linkEditAddress).click()
    }

    acessaMyAccount(linkMyAccount){
        cy.get(linkMyAccount).click()
    }
}

export default MyAccountPage