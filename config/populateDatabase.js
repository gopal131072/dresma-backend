const axios = require('axios');
const users = require('../models/users');

let populate_data = async () => {
    try {
        let response = await axios.get('http://dummy.restapiexample.com/api/v1/employees');
        if(response && response.data) {
            for(let item of response.data) {
                item.active = true;
            }
            await users.create(response.data);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = populate_data;