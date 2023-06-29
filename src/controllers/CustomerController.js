const mongoose = require("mongoose");

require("../models/Customer");
const Customer = mongoose.model("Customer");

class CustomerController {
	
	//Clientes registrados
	async Get(req, res) {
		const params = req.query

		await Customer.find()
			.then((Customers) => {
				res.status(200).json(Customers);
			})
			.catch(() => {
				res.status(200).json({ erro: "Nenhum cliente encontrado" });
			});
	}

	async Post(req, res) {

		const {name,phone,cpf,email} = req.body;
		
		const customer = {
			name: name,
			phone: phone,
			cpf:cpf,
			email: email,		
		};

		const auxCustomer = await Customer.findOne({
			$or: [
			  { email: customer.email},
			  { phone: customer.phone},
			  { cpf: customer.cpf},
			]
		  });

		if(auxCustomer) 
		{
			if(customer.email && auxCustomer.email === customer.email)
				{
					return 	res.status(200).json({
					message: "Já existe um cliente com este email!",
					error: true
				})
			}else if(customer.phone && auxCustomer.phone === customer.phone)
				{
					return 	res.status(200).json({
					message: "Já existe um cliente com este número de telefone !",
					error: true
				})
			}else if(customer.cpf && auxCustomer.cpf === customer.cpf)
			{
				return 	res.status(200).json({
				message: "Já existe um cliente com este número de telefone !",
				error: true
			})
			}
		}

		await new Customer(customer)
			.save()
			.then(() => {
				return res.status(200).json({
					message: "Cliente cadastrado!",
					error: false,
				});
			})
			.catch(() => {
				return res.status(200).json({
					message: "Erro ao cadastrar o usuário!",
					error: true,
				});
			});
	}

	async Put(req, res) {
		const { uuid } = req.params;
	  
		if (!req.body) {
			return res
			  .status(200).json({ 
					message: "Nenhum dado informado!",
					error: true
				});
		  }

		console.log(uuid);
		const customer = await Customer.findOne({uuid: uuid});
	  
		if (!customer) {
		  return res.status(200).json({ 
			message: "cliente não encontrado!", 
			error: true
		});
		}
	  
		Object.assign(customer, req.body);
		await customer.save();
	  
		return res
		  .status(200).json({ 
				message: "Cliente atualizado!", 
				error: false 
			});
	  }

	  async searchRegister(req,res){
		
		const {uuid} = req.params;
		const {cpf} = req.query;

		let customer

		if (uuid !== "undefined") customer = await Customer.findOne({uuid});
		if (cpf) customer = await Customer.findOne({cpf});
	  
		if (!customer) {
		  return res.status(200).json({ 
			message: "Registro não encontrado!", 
			error: true
		});
		}

		return res
		  .status(200).json({
				customer, 
				message: "Registro encontrado!", 
				error: false 
			});
	  }
}
module.exports = new CustomerController();