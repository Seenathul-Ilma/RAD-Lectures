import React from 'react'
import { useParams } from 'react-router-dom'

export default function Contact() {
    // const {id} = useParams()
    
    // useParams() returns an object containing all dynamic parameters from URL
    //     Example: for /contact/123 → { id: "123" }
    const param = useParams()
    console.log(param)

    return (
        // Access the exact name of the param (:id)
        //     Must match the one used in the route path → /contact/:id
        <div>Contact: {param.id}</div>
    )
}
