/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
import HomePage from '../../pages/home-page'
import CreateAnAccount from '../../pages/create-an-account'
import MyAccountPage from '../../pages/my-account'
import AddNewAddress from '../../pages/add-new-address'
import createAnAccountFixture from '../../fixtures/createAnAccount.json'
import myAccountFixture from '../../fixtures/myAccount.json'
import AddNewAddressFixture from '../../fixtures/addNewAddress.json'
import homePageFixtures from '../../fixtures/homePage.json'

const homePage = new HomePage()
const createAnAccount = new CreateAnAccount()
const myAccountPage = new MyAccountPage()
const addNewAddressPage = new AddNewAddress()

describe('Create an Account', () => {

    beforeEach('Acessa home page', () => {
        homePage.acessaHomePage()
    })

    it('Cria uma nova conta de usuário e edita endereço', () => {
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

        myAccountPage.accessaEditAddress(myAccountFixture.seletores.linkEditAddress)

        addNewAddressPage.preencheFormularioDeEndereco(
            AddNewAddressFixture.dadosValidos.phoneNum,
            AddNewAddressFixture.dadosValidos.streetAddress,
            AddNewAddressFixture.dadosValidos.cityName,
            AddNewAddressFixture.dadosValidos.postalCode,
            AddNewAddressFixture.dadosValidos.countryName,
            AddNewAddressFixture.dadosValidos.stateName
        )
        addNewAddressPage.enviaFormularioDeEndereco(AddNewAddressFixture.seletores.buttonSaveAddress)
        cy.get(AddNewAddressFixture.seletores.linkMensagemSucesso)
            .should('have.text', AddNewAddressFixture.assertions.mensagemSucesso)

        myAccountPage.acessaMyAccount(myAccountFixture.seletores.linkMyAccount)
        cy.get(myAccountFixture.seletores.linkMyAccountTitle)
            .should('have.text', 'My Account')
    })
})