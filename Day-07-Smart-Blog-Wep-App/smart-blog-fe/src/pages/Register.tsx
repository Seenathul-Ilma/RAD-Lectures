//import axios from 'axios';
import { useState, type FormEvent } from 'react'
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [role, setRole] = useState("USER");

    const handleRegister = async (e: FormEvent) => {   // FormEvent - type definition
      e.preventDefault()   // to ignore page refresh

      if(!firstName || !lastName || !email || !password || !conPassword) {
        alert("Oooppsss.. All fields are required..!")
        return
      }

      if(password !== conPassword) {
        alert("Oooppsss.. Password do not match..!")
        return
      }

      try {
      
        // 1st way (before use axiosConfig.ts (to handle root api intergration) and auth.ts (to handle authentication related api intergrations))
        /* const response = await axios.post("http://localhost:5000/api/v1/auth/register", 
          {
            firstName,  // firstName: firstName
            lastName,
            email,
            password,
            role
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )  // 1st URL, data, headers

        //alert("Registration successful..!")
        //console.log(response) */

          const obj = {
            firstName,
            lastName,
            email,
            password,
            role
          }

          const res: any = await register(obj)
          console.log(res.data)
          console.log(res.message)
          alert(`Registration succeful..! Email: ${res?.data?.email}`)

          //localStorage.setItem("accessToken")
          navigate("/login")

      } catch (err: any) {
          console.error(err?.response?.data)
      }

    }


    return (
      <div>
        <h1>Register as a User or An Author.</h1>
        <input
          type="text"
          placeholder="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="********"
          value={conPassword}
          onChange={(e) => setConPassword(e.target.value)}
        ></input>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="AUTHOR">AUTHOR</option>
        </select>
        <button onClick={handleRegister}>Register</button>
      </div>
    );
}
