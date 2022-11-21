class HomePage{

    acessaHomePage(){
        cy.visit('')
    }

    acessaCreatAnAccount(linkCreateAnAccount){
        cy.get(linkCreateAnAccount).click()
    }
}

export default HomePage