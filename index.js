const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const uuid = require("uuid");
const session = require("express-session");
const bcrypt = require("bcrypt");

app.use(
  session({
    secret: "2C44-1T58-WFpQ350",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000 * 2,
    },
  })
);

const PORT = 3000;

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/admin", (req, res) => {
  res.render("loginAdmin.ejs");
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ATALHOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ATALHOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ATALHOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ATALHOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get("/atalho", (req, res) => {
  //BLOQUEAR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  if(!req.session.userid){
    res.status(401).send("Você não tem permissão. Faça login para continuar: <a href='/'>Fazer login</a>" );
    }else{
      res.render('home2',{nome:req.session.name});
    }
  //res.render("home2");
});

app.get("/atalhoAdmin", (req, res) => {
  //BLOQUEAR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  if(!req.session.userid){
    res.status(401).send("Você não tem permissão. Faça login para continuar: <a href='/'>Fazer login</a>" );
    }else{
      res.render('homeAdmin',{nome:req.session.name});
    }
  //res.render("home2");
});


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMADO C >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMADO C >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMADO C >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMADO C >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get('/cadastraUsuario', (req, res) => {
  res.render('cadastraUsuario.ejs');
});

app.get('/cadastraProduto', (req,res) => {
  if(!req.session.userid){
    res.status(401).send("Você não tem permissão. Faça login para continuar: <a href='/'>Fazer login</a>" );
    }else{
      res.render('cadastraProduto',{nome:req.session.name});
    }
  
  //           >>>>>>>>>>>>>> ATENÇÃO <<<<<<<<<<<<<<<
  //           >>>>>>>>>>>>>> ATENÇÃO <<<<<<<<<<<<<<<
  //            USAR O CABEÇALHO ACIMA NA PÁGINAS QUE 
  //            NECESSITAM DE LOGIN
  //
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMADO R >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMADO R >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMADO R >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMADO R >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get("/busca", (req, res) => {
  //BLOQUEAR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  if(!req.session.userid){
    res.status(401).send("Você não tem permissão. Faça login para continuar: <a href='/'>Fazer login</a>" );
    }else{
      res.render('buscaProdutos',{nome:req.session.name});
    }
  //res.render("buscaProdutos");
});
app.get("/buscaUser", (req, res) => {
  //BLOQUEAR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  if(!req.session.userid){
    res.status(401).send("Você não tem permissão. Faça login para continuar: <a href='/'>Fazer login</a>" );
    }else{
      res.render('buscaUsuario',{nome:req.session.name});
    }
  //res.render("buscaUsuario");
});

const { Op } = require("sequelize"); //parametro de busca
const Produto = require("./model/produto");
const Usuario = require("./model/usuario");
const Admin = require("./model/admin");

//Inserção de dados ... primeiro produto

/*var gerente = Admin.create({
  login: "Admin2",
  senha: "$2b$10$luIMFVLjbX5F9wpJRy61I.rv97aYAGBl5akoyLUYTkG666qHofKmC",
})
  .then(function () {
    console.log("Usuario cadastrado com sucesso!" + gerente);
  })
  .catch(function (erro) {
    console.log("Erro ao cadastrar usuario: " + erro);
  });*/

//Produto.sync() --> Esta linha foi comentada após rodar corretamente o serviço e criar a tabela sincronizada com o model,
// foi comentada para não gerar nova tabela após rodar novamente o serviço
//
/*app.get('/produtos', (req, res) => {

    var nomeFiltro = req.query.nomeFiltro;
    var precoMaximo = req.query.precoMaximo;

    var resultadodaBusca = [];
    produtos.forEach(produto => {
        if (produto.nome.includes(nomeFiltro) &&
            produto.preco <= precoMaximo) {
            resultadodaBusca.push(produto);
        }
    })
    res.send(resultadodaBusca);

    var todosProdutos = '';
    for (var i = 0; i < produtos.length; i++) {
        todosProdutos += "Código: " + produtos[i].codigo;
        todosProdutos += "Nome: " + produtos[i].nome;
        todosProdutos += "Preço: " + produtos[i].preco;
        todosProdutos += "<br>";

    }
    res.send(todosProdutos) 
});*/


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CADASTRAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CADASTRAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CADASTRAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CADASTRAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.post("/cadastraProdutos", urlencodedParser, (req, res) => {//BLOQUEAR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  var codigoProduto = req.body.codigo;
  var nomeProduto = req.body.nome;
  var precoProduto = req.body.preco;
  var marcaProduto = req.body.marca;

  var produto = Produto.create({
    codigo: codigoProduto,
    nome: nomeProduto,
    preco: precoProduto,
    marca: marcaProduto,
  })
    .then(function () {
      //res.send("Produto inserido com sucesso!" + produto); //console.log > res.send
      res.render("c");
    })
    .catch(function (erro) {
      res.send("Erro ao inserir produto: " + erro);
    });

  //res.send(todosProdutos);
});

app.post("/cadastraUsuarios", urlencodedParser, async(req, res) => {
  const saltRounds = 10;
  var loginUsuario = req.body.login;
  var nomeUsuario = req.body.nome;
  var senhaUsuario = req.body.senha;

  const hashedPassword = await bcrypt.hash(senhaUsuario, saltRounds);

  var usuario = Usuario.create({
    login: loginUsuario,
    nome: nomeUsuario,
    senha: hashedPassword,
  })
    .then(function () {
      //res.send("Usuario cadastrado com sucesso!" + usuario); //console.log > res.send
      res.render("cAdmin");
    })
    .catch(function (erro) {
      res.send("Erro ao cadastra Usuario: " + erro);
    });

  //res.send(todosProdutos);
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CONSULTAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CONSULTAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CONSULTAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CONSULTAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.post("/usuarios", urlencodedParser, (req, res) => {
  var loginFiltro = req.body.loginUserFiltro;
  var todosProdutos =
    "<table><tr><th>Id</th><th>Código</th><th>Nome</th><th>Preço</th><th>Marca</th><th>Alterar</th></tr>";
    loginFiltro = "%" + loginFiltro + "%"; //transforma a variavel de texto exato para texto semelhante

  Usuario.findAll({
    where: {
      login: { [Op.like]: loginFiltro }, //pega qualquer nome digitado como parametro de busca por nome
      
    },
  })
    .then(function (usuarios) {
      console.log(usuarios);

      res.render("resultadoBuscaUser", { usuarios: usuarios });
    })
    .catch(function (erro) {
      console.log("Erro na consulta: " + erro);
  });
});
    
app.post("/produtos", urlencodedParser, (req, res) => {
  var nomeFiltro = req.body.nomeFiltro;
  var precoMaximo = req.body.precoMaximo;
  var todosProdutos =
    "<table><tr><th>Id</th><th>Código</th><th>Nome</th><th>Preço</th><th>Marca</th><th>Alterar</th></tr>";
  nomeFiltro = "%" + nomeFiltro + "%"; //transforma a variavel de texto exato para texto semelhante

  Produto.findAll({
    where: {
      nome: { [Op.like]: nomeFiltro }, //pega qualquer nome digitado como parametro de busca por nome
      preco: { [Op.lte]: precoMaximo }, //defina o valor máximo que será buscado
    },
  })
    .then(function (produtos) {
      console.log(produtos);

      res.render("resultadoBusca", { produtos: produtos });
    })
    .catch(function (erro) {
      console.log("Erro na consulta: " + erro);
    });

});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ALTERAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ALTERAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ALTERAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ALTERAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//                     ############### PARTE 1 ###############
app.get("/alteraProduto", (req, res) => {
    var idProduto = req.query.id;

    Produto.findOne({
      where: {
        id: idProduto,
      },
    })
      .then(function (produto) {
        console.log(produto);

        var formulario = "<form action='/updateProduto' method='post'>";
        formulario +=
          "<input type='hidden' name='id' value='" + produto.id + "'>";
        formulario +=
          "Código do Produto:<br> <input type='text' name='codigo' id='codigo' value='" +
          produto.codigo +
          "'><br>";
        formulario +=
          "Nome do Produto:<br> <input type='text' name='nome' id='nome' value='" +
          produto.nome +
          "'><br>";
        formulario +=
          "Preço:<br> <input type='text' name='preco' id='preco' value='" +
          produto.preco +
          "'><br>";
        formulario +=
          "Marca:<br> <input type='text' name='marca' id='marca' value='" +
          produto.marca +
          "'><br>";
        formulario += "<input type='submit' value='Salvar Alterações'><br>";
        formulario += "</form>";

        res.send("<h1><b>Alterar Produto</b></h1><br>" + formulario);
      })
      .catch(function (erro) {
        console.log("Erro na consulta: " + erro);
      });
  });

  app.get("/alteraUser", (req, res) => {
    var idUser = req.query.id;

    Usuario.findOne({
      where: {
        id: idUser,
      },
    })
      .then(function (usuario) {
        console.log(usuario);

        var formulario = "<form action='/updateUser' method='post'>";
        formulario +=
          "<input type='hidden' name='id' value='" + usuario.id + "'>";
        formulario +=
          "Nome do usuario:<br> <input type='text' name='nome' id='nome' value='" +
          usuario.nome +
          "'><br>";
        formulario +=
          "Login do usuario:<br> <input type='text' name='login' id='login' value='" +
          usuario.login +
          "'><br><br>";
        formulario += "<input type='submit' value='Salvar Alterações'><br>";
        formulario += "</form>";

        res.send("<h1><b>Alterar Produto</b></h1><br>" + formulario);
      })
      .catch(function (erro) {
        console.log("Erro na consulta: " + erro);
      });
  });

//                     ############### PARTE 2 ###############

  app.post("/updateProduto", urlencodedParser, (req, res) => {
    var idProduto = req.body.id;
    var codigoProduto = req.body.codigo;
    var nomeProduto = req.body.nome;
    var precoProduto = req.body.preco;
    var marcaProduto = req.body.marca;

    Produto.update(
      {
        codigo: codigoProduto,
        nome: nomeProduto,
        preco: precoProduto,
        marca: marcaProduto,
      },
      {
        where: {
          id: idProduto,
        },
      }
    )
      .then(function (produto) {
        //res.send("<b>Produto alterado com sucesso!!</b>");
        res.render("altera");
      })
      .catch(function (erro) {
        res.send("<b>Erro ao alterar produto!" + erro + "</b>");
      });
  });

  app.post("/updateUser", urlencodedParser, (req, res) => {
    var idUser = req.body.id;
    var loginUser = req.body.login;
    var nomeUser = req.body.nome;

    Usuario.update(
      {
        login: loginUser,
        nome: nomeUser,
      },
      {
        where: {
          id: idUser,
        },
      }
    )
      .then(function (usuario) {
        //res.send("<b>Produto alterado com sucesso!!</b>");
        res.render("alteraAdmin");
      })
      .catch(function (erro) {
        res.send("<b>Erro ao alterar produto!" + erro + "</b>");
      });
  });

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MANUTENÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MANUTENÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MANUTENÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MANUTENÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  /*
    app.post("/produtos", urlencodedParser, (req, res) => {
      var nomeFiltro = req.body.nomeFiltro;
      var precoMaximo = req.body.precoMaximo;
      var todosProdutos = "<table><tr><th>Id</th><th>Código</th><th>Nome</th><th></th></tr>";
      nomeFiltro = '%'+nomeFiltro+'%';//transforma a variavel de texto exato para texto semelhante
    
      Produto.findAll({
        where: {
          nome: { [Op.like]: nomeFiltro },//pega qualquer nome digitado como parametro de busca por nome
          preco: {[Op.lte]: precoMaximo}//defina o valor máximo que será buscado
        }
      })
        .then(function (produtos) {
          console.log(produtos);
    
          for (var i = 0; i < produtos.length; i++) {
            todosProdutos += "<tr>";
            todosProdutos += "<td>" + produtos[i].id; +"</td>"
            todosProdutos += "<td> " + produtos[i].codigo; +"</td>"
            todosProdutos += "<td> " + produtos[i].nome; +"</td>"
            todosProdutos += "<td> " + produtos[i].preco; +"</td>"
            todosProdutos += "<td> " + produtos[i].marca; +"</td>"
            todosProdutos += "<td><a href='/alteraProduto?id=" + produtos[i].id+ "'>Alterar</a></td>";
            todosProdutos += "</tr>";
          }
    
          todosProdutos +="</table>"
          res.send("<b>Veja nossos produtos</b><br>" + todosProdutos);
        })
        .catch(function (erro) {
          console.log("Erro na consulta: " + erro);
        });*/

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MANUTENÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MANUTENÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MANUTENÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MANUTENÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  /*//var precoMaximo = req.body.precoMaximo;
  //var resultadodaBusca = [];
   produtos.forEach((produto) => {
    if (produto.nome.includes(nomeFiltro) && produto.preco <= precoMaximo) {
      resultadodaBusca.push(produto);
    }
  });
  //res.send(todosProdutos);
  */


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXCLUIR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXCLUIR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXCLUIR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXCLUIR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get("/excluiProduto", (req, res) => {
  var idProduto = req.query.id;

  Produto.destroy({
    where: {
      id: idProduto,
    },
  })
    .then(function () {
      //res.send("<b>Produto excluído com sucesso!</b><br>");
      res.render("delete");
    })
    .catch(function (erro) {
      console.log("Erro na consulta: " + erro);
      res.send("Erro na exclusão: " + erro);
    });
});

app.get("/excluiUser", (req, res) => {
  var idProduto = req.query.id;

  Usuario.destroy({
    where: {
      id: idProduto,
    },
  })
    .then(function () {
      //res.send("<b>Produto excluído com sucesso!</b><br>");
      res.render("deleteAdmin");
    })
    .catch(function (erro) {
      console.log("Erro na consulta: " + erro);
      res.send("Erro na exclusão: " + erro);
    });
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.post("/sigin", urlencodedParser, async (req, res) => {
  var nomeUsuario = req.body.login;
  var senhaUsuario = req.body.senha;
  Usuario.findOne({
    attributes: ["id", "login", "senha", "nome"],
    where: {
      login: nomeUsuario
     // senha: senhaUsuario,
    },
  })
    .then(async function (usuario) {
      if (usuario != null) {
        const senha_valida = await
        bcrypt.compare(req.body.senha, usuario.senha);
        if (senha_valida) {
          req.session.userid = usuario.id;
          req.session.name = usuario.nome;
          req.session.login = usuario.login;
          res.render('home2');
         // res.redirect("./views/buscaProdutos.ejs");
        } else {
          res.send("Senha não corresponde!");
        }
      } else {
        res.send("Usuário não encontrado!");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao realizar login: " + erro);
    });
});

app.post("/siginAdmin", urlencodedParser, async (req, res) => {
  var nomeAdmin = req.body.login;
  var senhaUsuario = req.body.senha;
  Admin.findOne({
    attributes: ["id", "login", "senha"],
    where: {
      login: nomeAdmin
     // senha: senhaUsuario,
    },
  })
    .then(async function (admin) {
      if (admin != null) {
        const senha_valida = await
        bcrypt.compare(req.body.senha, admin.senha);
        if (senha_valida) {
          
          req.session.userid = admin.id;
          req.session.name = admin.nome;
          req.session.login = admin.login;
          res.render('homeAdmin');
         // res.redirect("./views/buscaProdutos.ejs");
        } else {
          res.send("Senha não corresponde!");
        }
      } else {
        res.send("Usuário não encontrado!");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao realizar login: " + erro);
    });
});

app.listen(PORT, () => {
  console.log("http://localhost:" + 3000);
});
