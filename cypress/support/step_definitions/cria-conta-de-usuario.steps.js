import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { faker } from '@faker-js/faker'
import HomePage from "../../pages/home-page"
import CreateAnAccount from "../../pages/create-an-account"
import MyAccountPage from "../../pages/my-account"
import AddNewAddress from "../../pages/add-new-address"
import homePageFixtures from '../../fixtures/homePage.json'
import createAnAccountFixture from '../../fixtures/createAnAccount.json'
import myAccountFixture from '../../fixtures/myAccount.json'
import AddNewAddressFixture from '../../fixtures/addNewAddress.json'

const homePage = new HomePage()
const createAnAccount = new CreateAnAccount()
const myAccountPage = new MyAccountPage()
const addNewAddress = new AddNewAddress()

Given("que um usuário sem cadastro tenha acessado a página inicial do site", () => {
    homePage.acessaHomePage()
})

When("ele se cadastrar como novo usuário através do link: Create An Account", () => {
    homePage.acessaCreatAnAccount(homePageFixtures.seletores.linkCreateAnAccount)
    
    let randomFirstName = faker.name.firstName()
    let randomLastName = faker.name.lastName()
    let randomEmail = faker.internet.email(randomFirstName, randomLastName)
    let randomPassword = faker.internet.password(10, false, /\w/, 'a9')
    let randomConfirmPassword = randomPassword

    createAnAccount.preencheFormularioCreateAnAccount(
        randomFirstName,
        randomLastName,
        randomEmail,
        randomPassword,
        randomConfirmPassword
    )
    createAnAccount.enviaFormulario(createAnAccountFixture.seletores.buttonCreateAccount)
    cy.get(createAnAccountFixture.seletores.linkMensagemSucesso)
        .should('have.text', createAnAccountFixture.assertions.mensagemSucesso)
})

Then("ele consiguirá adicionar um endereço padrão em: Default Billing Address", () => {
    myAccountPage.accessaEditAddress(myAccountFixture.seletores.linkEditAddress)
    addNewAddress.preencheFormularioDeEndereco(
        AddNewAddressFixture.dadosValidos.phoneNum,
        AddNewAddressFixture.dadosValidos.streetAddress,
        AddNewAddressFixture.dadosValidos.cityName,
        AddNewAddressFixture.dadosValidos.postalCode,
        AddNewAddressFixture.dadosValidos.countryName,
        AddNewAddressFixture.dadosValidos.stateName
    )
    addNewAddress.enviaFormularioDeEndereco(AddNewAddressFixture.seletores.buttonSaveAddress)
    cy.get(AddNewAddressFixture.seletores.linkMensagemSucesso)
        .should('have.text', AddNewAddressFixture.assertions.mensagemSucesso)

    myAccountPage.acessaMyAccount(myAccountFixture.seletores.linkMyAccount)
    cy.get(myAccountFixture.seletores.linkMyAccountTitle)
        .should('have.text', 'My Account')
})
