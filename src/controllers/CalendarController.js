const mongoose = require("mongoose");
const moment = require("moment")

require("../models/Calender");
const Calender = mongoose.model("Calender");

moment.locale("pt-br")

class CalendarController {
	

	static isAvailable(dtStart, dtStartExiste, dtEndExiste) {
		// Verifica se o horário pretendido está dentro do intervalo do horário existente
		if (new Date(dtStart) >= new Date(dtStartExiste) && new Date(dtStart) < new Date(dtEndExiste))
		  return false;
		else
		  return true;
	  }

	//Calendário

	async Get(req, res) {
		await Calender.find()
			.then((Calenders = []) => {
				res.status(200).json(Calenders);
			})
			.catch(() => {
				res.status(200).json({ erro: "Nenhum agendamento encontrado" });
			});
	}
	
	async Post(req, res) {

		const {uuid_customer,title,description,dt_start,dt_end} = req.body;
		
		const calender = {
			uuid_customer: uuid_customer,
			title: title,
			description: description,	
            dt_start:dt_start,
            dt_end:dt_end
		};

		const auxCalender = await Calender.findOne({title});

		if(auxCalender) 
		{
			console.log(dt_start,dt_end,auxCalender.dt_start)
            
			const available = CustomerController.isAvailable(
				dt_start,
				auxCalender.dt_start,
				auxCalender.dt_end
			  );
			  
			if(!available)
			{
				return 	res.status(200).json({
					message: "Horário indisponível!",
					error: true
				});
			}
		}
		
		await new Calender(calender)
			.save()
			.then(() => {
				return res.status(200).json({
					message: "Seu serviço foi agendado!",
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
		const calender = await Calender.findOne({uuid_customer: uuid});
	  
		if (!calender) {
		  return res.status(200).json({ 
			message: "Nenhum agendamento encontrado!", 
			error: true
		});
		}
	  
		Object.assign(calender, req.body);
		await calender.save();

		return res
		.status(200)
		.json({ 
			message: "O serviço foi atualizado!", 
			error: false 
		});
	  }

	  async searchRegister(req,res){
		
		const {uuid} = req.params;

		if (!req.body) {
			return res
			  .status(200).json({ 
					message: "Id não informado!",
					error: true
				});
		  }

		console.log(uuid);
		const calender = await Calender.findOne({uuid_customer: uuid});
	  
		if (!calender) {
		  return res.status(200).json({ 
			message: "Registro não encontrado!", 
			error: true
		});
		}

		return res
		  .status(200).json({
				calender,  
				error: false 
			});
	  }

}
module.exports = new CalendarController();