import { useAuth } from "../context/authContext"

export default function Home() {
  const {user} = useAuth()
  return (
    <div>
      <h1>Home Page</h1>
      <h3>{user?.email}</h3>
    </div>
  )
}
