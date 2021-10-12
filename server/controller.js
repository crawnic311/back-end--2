const houses = require('./db.json')

let houseID = 4



module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        const {id} = req.params
        let index = houses.findIndex((elem) => +elem.id === +id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const newHouse = {
            id: houseID,
            address: req.body.address,
            price: +req.body.price,
            imageURL: req.body.imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        houseID++

    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body

        let index = houses.findIndex((elem) => +elem.id === +id)

        if(houses[index].price === 0 && type === 'minus') {
            res.status(400).send('Cannot go below 0')
        } else if (houses[index].price >= 0 && type === 'plus') {
            houses[index].price += 10000 
            res.status(200).send(houses)
        } else if (houses[index].price > 0 && type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        }
        
    }
}