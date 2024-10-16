import { faker } from "@faker-js/faker";
function createList(){
    return{
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        image: '/pexels-mikebirdy-100656.jpg',
        miles: 1000,
        gearType: "Automatic",
        price: faker.finance.amount({min:1000 ,max:20000})
    }
}
const carList = faker.helpers.multiple(createList,{
    count:8
})

export default{
    carList
}
