
import { useState, React } from "react";
import axios from 'axios';
// import Buffer from 'buffer';
import { Form } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import Library from './Library';
import './login.css';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [userObject, setUserObject] = useState({});
  const [userActive, setUserActive] = useState(false);
  const [joke, setJoke] = useState('');
  const [affirm, setAffirm] = useState([]);
  const [library, setLibrary] = useState([]);

  const handleSignUp = async () => {
    console.log('hello sign up function');
    try {
      // console.log(process.env.DATABASE_URL);
      let response = await axios.post(`http://localhost:3001/signup`, {
        username,
        password,
        role,
      });
      console.log(response.data);
      setUserObject(response.data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  const handleSignIn = async () => {
    console.log('hello sign in function');
    try {
      // const token = `${username}:${password}`;
      // const encodedToken = Buffer.from(token).toString('base64');
      // const headers = { 'Authorization': 'Basic '+ encodedToken };
      let response = await axios.post(`http://localhost:3001/signin`,{},
        {
            auth: {username, password},   
        });
      setUserActive(true);
      setUserObject(response.data);
      console.log(response.data.token);

    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  const getJoke = async () => {
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/Programming,Dark,Pun,Spooky?type=twopart`,
      {
        headers: {
          Authorization: `Bearer ${userObject.token}`,
        }
      });
      console.log(response);
      setJoke(response.data)
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  const addJoke = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/jokes`,{
        setup: joke.setup,
        delivery: joke.delivery,
      },
      {
        headers: {
          Authorization: `Bearer ${userObject.token}`,
        }
      });
      console.log(response);
      setJoke(response.data)
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  const getAllJokes = async () => {
    try {
      console.log(userObject.token);
      const response = await axios.get(`http://localhost:3001/jokes`,
      {
        headers: {
          Authorization: `Bearer ${userObject.token}`,
        }
      });
      console.log(response);
      setLibrary(response.data)
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  const getAffirm = async () => {
    try {
      const response = await axios.get(`https://dulce-affirmations-api.herokuapp.com/affirmation`, {},
      {
        headers: {
          // "access-control-allow-origin" : "*",
          Authorization: `Bearer ${userObject.token}`,
        }
      });
      console.log(response.data[0]);
      setAffirm(response.data[0])
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  const addAffirm = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/affirmations`,{
        affirmation: affirm.phrase,
      },
      {
        headers: {
          Authorization: `Bearer ${userObject.token}`,
        }
      });
      console.log(response);
      setJoke(response.data)
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  const getAllAffirms = async () => {
    try {
      console.log(userObject.token);
      const response = await axios.get(`http://localhost:3001/affirmations`,
      {
        headers: {
          Authorization: `Bearer ${userObject.token}`,
        }
      });
      console.log(response);
      setLibrary(response.data)
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }


  return (
    <>
      {userActive
        ?
        <div className="catergory-cont">
          {/* two big buttons | smile(affirmations) or laugh(jokes) */}
          <div onClick={getJoke} className="catergory">
            Laugh
            {
              joke 
                ? <>
                    <div>
                      <p>{joke.setup}</p>
                      <p>{joke.delivery}</p>
                      <button onClick={getJoke}>new joke</button>
                      <button onClick={addJoke}>Add to library</button>
                      <button onClick={getAllJokes}>View Library</button>
                    </div>
                  </> 
                : ''
            }
          </div>
          <div onClick={getAffirm} className="catergory">
            Smile
            {
              affirm.length 
                ? <>
                    <div>
                      <p>{affirm.phrase}</p>
                      <button onClick={getAffirm}>new Affirmation</button>
                      <button onClick={addAffirm}>Add to library</button>
                      <button onClick={getAllAffirms}>View Library</button>
                    </div>
                  </> 
                : ''
            }
          </div>
        </div>
        :
        <>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={(e) => setUsername(e.target.value)} placeholder="Type your Username" />
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} placeholder="Type your password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select onChange={(e) => setRole(e.target.value)}>
              <option>user</option>
              <option>writer</option>
              <option>editor</option>
              <option>admin</option>
            </Form.Select>
          </Form.Group>
          <Button onClick={handleSignUp}>Sign Up</Button>
          <Button onClick={handleSignIn}>Sign In</Button>
        </>
      }
      {library.length !== 0 
        ? <Library 
            data={library}
          /> 
        : ''}
    </>
  )
}
