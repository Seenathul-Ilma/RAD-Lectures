import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav 
        style={{
            display: "flex",
            justifyContent: "space-around"
        }}
    >
        
        <Link to="/">Welcome</Link>
        <Link to="/home">Home</Link>
    </nav>
  )
}
