const Users = require("../models/users");

let users_controller = {};

users_controller.getUsers = async (req, res, next) => {
	try {
		let limit = !isNaN(req.query.per_page) ? parseInt(req.query.per_page) : null;
		let page = !isNaN(req.query.page) ? parseInt(req.query.page) : null;

		if(!limit || !page) {
			return res.status(400).send({message: 'Query params for page missing'});
		}

		let users = Users.find({active: true}).lean().limit(limit).skip((page - 1)*limit).select({
			_id: 0,
			id: 1,
			employee_name: 1,
			employee_salary: 1,
			employee_age: 1,
			profile_image: 1
		});
		
		let count = Users.count({active: true});

		let promises = await Promise.all([users, count]);

		return res.status(200).send({data: promises[0], total: promises[1]});

	} catch (error) {
		console.log(error);
		next(error);
	}
}

users_controller.updateUser = async (req, res, next) => {
	try {
		let updation_data = {}, user_id = req.params.id;

		if(!user_id)
			return res.status(400).send({message: 'User ID missing'});

		if(isNaN(user_id))
			return res.status(400).send({message: 'Invalid user ID supplied'});

		if(!req.body.employee_name && !req.body.profile_image &&
			 !req.body.employee_age && !req.body.employee_salary)
			return res.status(400).send({message: 'No valid updation data sent'});
		
		if((req.body.employee_salary && isNaN(req.body.employee_salary)) || 
			(req.body.employee_age && isNaN(req.body.employee_age))) {
				return res.status(400).send({message: 'Please enter a valid age/salary'});
		}
		if(req.body.employee_name && req.body.employee_name.length)
			updation_data['employee_name'] = req.body.employee_name;
		
		if(req.body.employee_salary)
			updation_data['employee_salary'] = req.body.employee_salary;
		
		if(req.body.employee_age)
			updation_data['employee_age'] = req.body.employee_age;

		if(req.body.profile_image && req.body.profile_image.length)
			updation_data['profile_image'] = req.body.profile_image;

		let upd = await Users.findOneAndUpdate({id: user_id}, {$set: updation_data});
		
		if(upd)
			return res.status(204).send();
		else
			return res.status(400).send({message: 'Cannot find user with specified id'});
		
	} catch (error) {
		console.log(error);
		next(error);
	}
}

users_controller.deleteUser = async (req, res, next) => {
	try {
		let user_id = req.params.id;
		
		if(!user_id)
			return res.status(400).send({message: 'User ID missing'});
		
		if(isNaN(user_id))
			return res.status(400).send({message: 'Invalid user ID supplied'});

		await Users.findOneAndUpdate({id: user_id}, {$set: {active: false}});
		return res.status(204).send();
	} catch (error) {
		console.log(error);
		next(error);
	}
}

module.exports = users_controller;