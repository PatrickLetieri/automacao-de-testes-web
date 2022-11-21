
Cypress.Commands.add('preencheFormulario', function(seletores, dados){
    for(i = 0; i < seletores.length; i++){
        cy.get(seletores[i]).type(dados[i])
    }
})