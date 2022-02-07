var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {
    deliver : function(){

        var firstName = faker.name.firstName()

        var data =
        {
            name : `${firstName}`,
            cpf  : cpf.generate(),
            email : faker.internet.email(firstName),
            whatsApp : '14997828222',
            address :{
                postalcode : '17025771',
                street : 'Rua Affonso Formenti',
                number : '444',
                details : 'Antiga 26',
                district : 'Núcleo Habitacional Mary Dota',
                city_state :'Bauru/SP'
            },
            delivery_method : 'Moto',
            cnh : 'cnh-digital.jpg'
    
        }
        return data
    }
}