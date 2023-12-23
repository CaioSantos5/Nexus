const Sequelize = require("sequelize");
const sequelize = new Sequelize("curso2", "root", "rover", {
  host: "localhost",
  dialect: "mysql",
  //port: 3307 //--> caso a port 3306 estiver ocupada
});
sequelize
  .authenticate()
  .then(function () {
    console.log("Conectado!!");
  })
  .catch(function (erro) {
    console.log("Erro ao conectar: " + erro);
  });

const Admin = sequelize.define('admin', {
    login: {
      type: Sequelize.STRING,
    },
    senha: {
      type: Sequelize.STRING,
    }
  });

//Admin.sync()
//Usuario.sync({alter: true})

module.exports = Admin