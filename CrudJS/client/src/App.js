import "./App.css";
import {useState} from "react"; 
//Utilizaremos a biblioteca Axios para fazer requisições a API
import Axios from "axios"
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

//Ideas: add country and im more than 18y camp


function App() {
  //Using states to store the values on the (and create the)variables
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");

  //Variáveis pra guardar valores a serem atualizados
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newAddress, setNewAddress] = useState("");

  //Lista para guardar valores após a requisição
  const[userList, setUserList] = useState([]);

  //Utilizando o axios, podemos enviar a informação do front-end pro back-end:
  const addUser = () => {
    //O que será enviado ao back end é um objeto do body da página:
    //Sendo as propriedades a serem enviadas os atributos
    Axios.post("http://localhost:3001/create", {
      //O objeto body
      Name: Name,
      Email: Email, 
      Username: Username, 
      Address: Address, 
      Password: Password
    }).then(() => {
      setUserList([
        ...userList,
        {
          Name: Name,
          Email: Email,
          Username: Username,
          Address: Address,
          Password: Password,
        },
      ]);
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      //response funciona como um objeto que tem os dados da lista de usuarios
      setUserList(response.data);
    });
  };

  //Nesse caso recebemos o id do usuario pra identificar qual dado de qual usuario deve ser
  //atualizado
  const updateUserName = (ID) => {
    //Irá funcionar assim como a função acima
    Axios.put("http://localhost:3001/update/name", {Name: newName, ID: ID}).then(
      (response) => {
        alert("update");
        setUserList(userList.map((val)=>{
          return val.ID === ID 
          ? {
            ID: val.ID, 
            Name: newName, 
            Email: val.Email,
            Username: val.Username, 
            Address: val.Address, 
            Password: val.Password,
            } 
            : val;
        }));
      }
    );
  };

  const updateUserEmail = (ID) => {
    //Irá funcionar assim como a função acima
    Axios.put("http://localhost:3001/update/email", {Email: newEmail, ID: ID}).then(
      (response) => {
        alert("update");
        setUserList(userList.map((val)=>{
          return val.ID === ID 
          ? {
            ID: val.ID, 
            Name: val.Name, 
            Email: newEmail,
            Username: val.Username, 
            Address: val.Address, 
            Password: val.Password,
            } 
            : val;
        }));
      }
    );
  };

  const updateUserUsername = (ID) => {
    //Irá funcionar assim como a função acima
    Axios.put("http://localhost:3001/update/username", {Username: newUsername, ID: ID}).then(
      (response) => {
        alert("update");
        setUserList(userList.map((val)=>{
          return val.ID === ID 
          ? {
            ID: val.ID, 
            Name: val.Name, 
            Email: val.Email,
            Username: newUsername, 
            Address: val.Address, 
            Password: val.Password,
            } 
            : val;
        }));
      }
    );
  };

  const updateUserAddress = (ID) => {
    //Irá funcionar assim como a função acima
    Axios.put("http://localhost:3001/update/address", {Address: newAddress, ID: ID}).then(
      (response) => {
        alert("update");
        setUserList(userList.map((val)=>{
          return val.ID === ID 
          ? {
            ID: val.ID, 
            Name: val.Name, 
            Email: val.Email,
            Username: val.Username, 
            Address: newAddress, 
            Password: val.Password,
            } 
            : val;
        }));
      }
    );
  };

  const deleteUser = (ID) => {
    Axios.delete(`http://localhost:3001/delete/${ID}`).then((response)=> {
      setUserList(userList.filter((val)=>{
        return val.ID != ID
      }))
    });
  }

  return (
    <div className="App">
      <div className="information">

        <div id="register_title"><h2> Registration </h2></div>
        
        <div id="Name">
          <input 
            type="text" 
            placeholder="Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        
        <div id="Email">
          <input 
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          />
        </div>

        <div id="Username">
          <input 
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          />
        </div>

        <div id="Address">
          <input 
          type="text"
          placeholder="Address"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
          />
        </div>

        <div id="Password">
          <input 
          type="password"
          placeholder="Password"          
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          />
        </div>

        <div className="buttons">
          <button id="register_btn" onClick={addUser}>Register User</button>
          <button id="show_btn" onClick={getUsers}>Show users</button>
        </div>
        
      </div>

      <div className="show_users">
        {userList.map((val, key) =>{
          return (
            <div className="user_table">
              <div>
                <Table className="table" striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Address</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{val.ID}</td>
                      <td>
                        <div>{val.Name}</div>
                        <input 
                        id="update_input"
                        type="text"
                        placeholder="Edit name"
                        onChange={(event) => {
                          setNewName(event.target.value);
                        }}/>
                        <button id="update_btn" onClick={() => {updateUserName(val.ID)}}> Update </button>
                        </td>
                      <td>
                        <div>{val.Email}</div>
                        <input 
                        id="update_input"
                        type="text"
                        placeholder="Edit email"
                        onChange={(event) => {
                          setNewEmail(event.target.value);
                        }}/>
                        <button id="update_btn" onClick={() => {updateUserEmail(val.ID)}}> Update </button>
                      </td>
                      <td>
                        <div>{val.Username}</div>
                        <input 
                        id="update_input"
                        type="text"
                        placeholder="Edit username"
                        onChange={(event) => {
                          setNewUsername(event.target.value);
                        }}/>
                        <button id="update_btn" onClick={() => {updateUserUsername(val.ID)}}> Update </button>
                      </td>
                      <td>
                        <div>{val.Address}</div>
                        <input 
                        id="update_input"
                        type="text"
                        placeholder="Edit Address"
                        onChange={(event) => {
                          setNewAddress(event.target.value);
                        }}/>
                        <button id="update_btn" onClick={() => {updateUserAddress(val.ID)}}> Update </button>
                      </td>
                      <td id="delete_column">
                        <button id="delete_btn" onClick={() => {deleteUser(val.ID)}}>Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
