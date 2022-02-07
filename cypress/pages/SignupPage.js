// representa a pág de cadastro
class SingupPage {
    //função vai acessar a página do formulário de cadastro
    go (){
        /*define o tamanho da janela*/
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()

        /*checkpoint*/
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
    }

    //função que vai preencher todo o formulário de cadastro
    fillForm(deliver){
        
        /*dados pessoais*/
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsApp)
        
        /*endereco*/
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)
        
        /*validar o end*/
        cy.get('input[name="address"]').should('have.value',deliver.address.street)
        cy.get('input[name="district"]').should('have.value',deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value',deliver.address.city_state)
        
        cy.contains('.delivery-method li', deliver.delivery_method).click()
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)

    }

    submit(){
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(msg){
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', msg)
    }

    alertMessageShouldBe(msg){
        //cy.get('.alert-error').should('have.text',msg)
        cy.contains('.alert-error', msg).should('be.visible')
    }
}

export default new SingupPage;