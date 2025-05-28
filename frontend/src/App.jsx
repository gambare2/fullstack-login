import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Link} from 'react-router-dom'
import { FormControl, OutlinedInput, InputLabel, Button } from '@mui/material'


  function App() {
  const [form, setForm] = useState({username: '', password: '' })

  const handleChange= (e) =>setForm({
    ...form, [e.default.name]: [e.target.value]
  });
  
  const handlelogin = async(provider) => {
      window.location.href = `http://localhost:5000/auth/${provider}`
  }

const handleForm = async(e) => {
  e.preventDefault()
  try {
    const res = await axios.post('', form);
    alert(res.data.message)
  } catch (error) {
    alert("Username/Email or Password is wrong")
  }
}
  return (
    <>
      <form onSubmit={handleForm}>


        <div className='container md-auto flex justify-center '>
          <div className='border border-slate-500 bg-slate-200 w-2/5'>

          <h1 className='font-bold font1 text-center md:mx-4 text-4xl text-teal-400 '>
            Login
          </h1>
          <div className='flex flex-wrap justify-center items-center md:py-10 flex-col'>

            <FormControl
            sx={{ my: 4 }}>
              <InputLabel htmlFor="component-outlined">Username</InputLabel>
              <OutlinedInput
                id="component-outlined"
                defaultValue=""
                placeholder='Username / E-mail'
                label="username"
                name='username'
                aria-describedby="component-error-text"
                onChange={handleChange}
                />
            </FormControl>
            <FormControl sx={{ my: 4 }}>
              <InputLabel htmlFor="component-outlined">Password</InputLabel>
              <OutlinedInput
                id="component-outlined"
                defaultValue=""
                placeholder='pass12@'
                label="Password"
                name='password'
                aria-describedby="component-error-text"
                onChange={handleChange}
                />
            </FormControl>
            <Button 
            type='submit'
            variant='outlined'>
                Login
            </Button>
            <span>Not Register || 
              <Link 
            className='text-blue-600 md:mx-3'>
            Create account
            </Link>
            </span>
            <span className='border-2 border-slate-600 w-3/12 md:my-3 '></span>
           <Button
            sx={{
              backgroundColor: 'white',
              margin: 2
            }}
            variant='outlined'
            onClick={handlelogin}
            >
           Login with Google
           <img src="icons8-google.svg" alt="" 
           className='size-5 md:ml-1'/>
           </Button>
           <Button
           sx={{
             backgroundColor: 'white',
             
            }}
            variant='outlined'
            onClick={handlelogin}
            >
            Login with Github 
            <img src="icons8-github.svg" alt="" 
            className='md:ml-1'/>
           </Button>

          </div>

             </div>
        </div>
      </form>
    </>
  )
}
   
export default App
