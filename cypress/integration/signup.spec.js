import singup from "../pages/SignupPage"
import SignupFactory from "../factories/SignupFactory"

describe('Signup', () => {

    /*beforeEach(()=>{
    //obtem a massa de teste roda de forma assincrona
        cy.fixture('deliver').then(function (d){
            this.deliver= d

        })
    })*/

    it('User should be deliver', function () {

        var deliver = SignupFactory.deliver()

        singup.go()
        singup.fillForm(deliver)
        singup.submit()

        const msg = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        singup.modalContentShouldBe(msg)
    })

    it('Invalid CPF ', function () {

        var deliver = SignupFactory.deliver()
        deliver.cpf = '000001933dddd'

        singup.go()
        singup.fillForm(deliver)
        singup.submit()

        singup.alertMessageShouldBe('Oops! CPF inválido')

    })

    it('Invalid e-mail', function () {
        var deliver = SignupFactory.deliver()
        deliver.email = 'fer.com.br'

        singup.go()
        singup.fillForm(deliver)
        singup.submit()

        singup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {
        const message = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            singup.go()
            singup.submit()

        })

        message.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                singup.alertMessageShouldBe(msg.output)
            })
        })
    })
})