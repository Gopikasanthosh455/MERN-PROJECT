import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;