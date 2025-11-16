import { useState, type FormEvent } from 'react'
import { getMyProfile, login } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function Login() {

  const navigate = useNavigate()

  //const {user, setUser} = useAuth()   // authContext eke values vala dhapu eke copy and paste -> {user, setUser} // only required eka gnnath puluvan
  const {setUser} = useAuth() 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if(!email || !password) {
      alert("Oooppsss.. All fields are required..!")
      return
    }

    try {
      
      const res: any = await login(email, password)
      console.log(res.data)
      console.log(res.message)
      console.log(res.data.accessToken)

      if(!res.data.accessToken) {
        alert("Failed to login..!")
        return
      }

      await localStorage.setItem("accessToken", res.data.accessToken)
      await localStorage.setItem("role", res.data.role)

      alert(`Login succeful..! Email: ${res?.data?.email}`)

      // login eke indan app eke ethule inna ona thenakin user data access krnna puluvan venna one.
      const profile = await getMyProfile()
      console.log("MyProfile..")
      // use redux to save userdata
      // or, use auth context (more speed to get user details)
      //console.log(profile.data)   // before add const {user, setUser} = useAuth()
      setUser(profile.data)

      navigate("/home")

    } catch (err: any) {
      console.error(err?.response?.data)
    }

  }

  return (
    <div>
        <h1>Login to your account.</h1>
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
        <button onClick={handleLogin}>Log In</button>
      </div>
  )
}
