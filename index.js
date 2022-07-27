import  express  from "express";
import   statuscodes from "http-status-codes";

//Criando Servidor de API
const app = express();
const PORT = process.env.PORT || 3000;

let usuarios = [
    {id:1 , nome:'Luis' , idade:60},
    {id:2 , nome:'Joao' , idade:40},    
    {id:3 , nome:'Pedro' , idade:30},
    {id:4 , nome:'Maria' , idade:20}
];
app.use(express.json());

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
})

app.get('/',(request,response)=>{
    return response.send('<h2>Trabalhando com servidor express</h2>')
})

//Retornando uma lista de Usuários
app.get('/usuarios',(req,res) => {
    return res.send(usuarios);
})

//Retornando um Usuário específico
app.get('/usuarios/:Id',(req,res) => {
    const usuarioId = req.params.Id;
    const usuario = usuarios.find(user => {
        return (user.id === Number(usuarioId));
    });
    return res.send(usuario);
})

//Acrescentando um Novo Usuário
app.post('/usuarios',(req,res) => {
    const novoUsuario = req.body;
    usuarios.push(novoUsuario);
    return (res.status(statuscodes.CREATED).send(novoUsuario));
})

//Alterando dados de um Usuário específico
app.put('/usuarios/:Id',(req,res) => {
    const usuarioId = req.params.Id;
    const usuarioAtualizado =req.body;

    usuarios = usuarios.map(user => {
        if (user.id === Number(usuarioId)) {
            return usuarioAtualizado
        }
        return user
    });
    return res.send(usuarioAtualizado);
})

//Apagando um Usuário específico
app.delete('/usuarios/:Id',(req,res) => {
    const usuarioId = req.params.Id;

    usuarios = usuarios.filter(user => 
        (user.id !== Number(usuarioId))
        
    );
return (res.status(statuscodes.NO_CONTENT).send(usuarios));
})
