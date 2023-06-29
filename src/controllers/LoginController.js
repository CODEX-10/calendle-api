const mongoose = require("mongoose");

require("../models/User");
const User = mongoose.model("users");


class LoginController{


  async User(req, res) {
    const { emailPhone,password } = req.body;

    try {
      console.log(emailPhone, password);
      const user = await User.findOne({ emailPhone });
  
      if (!user) {
        console.log("Usuário não encontrado");
        return res.status(200).json({ error: true , message: "Usuário não encontrado!" });
      }

        if(password === user.password )
          return res.status(200).json({ error: false, message: "Usuário logado com sucesso!", user});
        else 
          return res.status(200).json({ error: true , message: "Senha incorreta!"});
    
    } catch (error) {
      console.error(error);
      return res.status(200).json({ error: true , message: "Erro ao verificar o usuário!" });
    }
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
		const user = await User.findOne({uuid: uuid});
	  
		if (!user) {
		  return res.status(200).json({ 
			message: "Registro não encontrado!", 
			error: true
		});
		}

		return res
		  .status(200).json({
				user, 
				message: "Registro encontrado!", 
				error: false 
			});
	  }


    async Post(req, res) {
      const { name, emailPhone, password } = req.body;
  
      const user = new User({
        name,
        emailPhone,
        password,
      });
  
      const auxUser = await User.findOne({
        $or: [
          { name: user.name },
          { emailPhone: user.emailPhone },
        ],
      });
  
      if (auxUser) {
        if (auxUser.name === user.name) {
          return res.status(200).json({
            message: "Já existe um cliente com este nome!",
            error: true,
          });
        } else if (auxUser.emailPhone === user.emailPhone) {
          return res.status(200).json({
            message: "Já existe um cliente com este email!",
            error: true,
          });
        }
      }
  
      try {
        await user.save();
        return res.status(200).json({
          message: "Usuário cadastrado!",
          error: false,
        });
      } catch (error) {
        return res.status(200).json({
          message: "Erro ao cadastrar usuário!",
          error: true,
        });
      }
    }

  
}

module.exports = new LoginController();