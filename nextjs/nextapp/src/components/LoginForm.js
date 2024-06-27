"use client"
import {useState} from 'react'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try{
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method:POST,
                headers:{
                    'Content-Type': 'application/json',
                },
                body:{
                    username,
                    password
                }
            })
            const data = await res.json();
            const token = data.token
            localStorage.setItem('token', token)
            console.log(username, password)
        }catch(err){
            setPassword("")
            setUsername("")
            alert("Something went wrong")
        }
    }

  return (
      <div>
        <h2>Login</h2>
      <div>
        <div className='text-black'>
            <input type="text" placeholder="Enter your username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
        </div>
        <div className='text-black'>
            <input type="password" placeholder="Enter your password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
      </div>
    </div>
  )
}

export default LoginForm
