describe('Cadastro', ()=>{
    it('Cadastro de entregador',()=>{
        /*define o tamanho da janela*/
        cy.viewport(1920, 1080)
        cy.visit('http://buger-eats.vercel.app')

        cy.get('a[href="/deliver"]').click()

        /*checkpoint*/
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')

        var deliver ={
            name : 'Fernanda',
            cpf  : '00000000191',
            email : 'fernanda@gmail.com',
            whatsApp : '14997828222',
            address :{
                postalcode : '17025771',
                street : 'Rua Affonso Formenti',
                number : '444',
                details : 'Antiga 26',
                district : 'Núcleo Habitacional Mary Dota',
                city_state :'Bauru/SP'
            },
            delivery_method : "Moto",
            cnh : "cnh-digital.jpg"
        }

        /*dados pessoais*/
        cy.get('input[name="name"').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"').type(deliver.email)
        cy.get('input[name="whatsapp"').type(deliver.whatsApp)
        
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


        cy.get('form button[type="submit"]').click()

        const msg = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', msg)

        
    })

    it('CPF Inválido',()=>{
        /*define o tamanho da janela*/
        cy.viewport(1920, 1080)
        cy.visit('http://buger-eats.vercel.app')

        cy.get('a[href="/deliver"]').click()

        /*checkpoint*/
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')

        var deliver ={
            name : 'Fernanda',
            cpf  : '00000000191aa',
            email : 'fernanda@gmail.com',
            whatsApp : '14997828222',
            address :{
                postalcode : '17025771',
                street : 'Rua Affonso Formenti',
                number : '444',
                details : 'Antiga 26',
                district : 'Núcleo Habitacional Mary Dota',
                city_state :'Bauru/SP'
            },
            delivery_method : "Moto",
            cnh : "cnh-digital.jpg"
        }
        /*dados pessoais*/
        cy.get('input[name="name"').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"').type(deliver.email)
        cy.get('input[name="whatsapp"').type(deliver.whatsApp)

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

        cy.get('form button[type="submit"]').click()

        cy.get('.alert-error').should('have.text','Oops! CPF inválido')
        
    })
})