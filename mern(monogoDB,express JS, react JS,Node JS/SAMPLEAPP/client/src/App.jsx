import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState()
  const [age, setAge] = useState()

  useEffect(() => {
    axios.get('http://localhost:30012/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit =()=> {
    axios.post('http://localhost:30012/createUsers',{name,age})
      .then((users) => {
        console.log(users)
      })
      .catch((err) => console.log(err));

  }
  return (
    <div class name='center'>
      <h2>first MREN(Mongo,Express,React,Node) app</h2>
      {users.map((user, index) => (
        <div key={index}>
          <h3>{user.name}</h3>
          <h3>{user.age}</h3>
        </div>
      ))}
      <br/>
      <input type="text" onChange={(e)=> setName(e.target.value)}/>
      <input type="text" onChange={(e)=> setAge(e.target.value)}/>
      <button onClick={submit}>Create user</button>

    </div>
  );
}

export default App;
