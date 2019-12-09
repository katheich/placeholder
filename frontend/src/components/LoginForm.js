import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/authMethods'

const initialData = {
  username: '',
  password: ''
}



const LoginForm = ({ props }) => {

  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', data)
      .then(resp => {
        console.log(resp.data.token)
        Auth.setToken(resp.data.token)
        // localStorage.setItem('token', resp.data.token)
        props.history.push('/map')
      })
      .catch((errors) => setErrors(errors)
      )
  }

  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value }
    const newErrors = ''
    setData(newData)
    setErrors(newErrors)
    console.log(data)
  }

  return <section className="section">
    <div className="container">
      <div className="title">Login </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Username
          </label>
          <div className="control">
            <input
              type="text"
              name="username"
              className="input"
              onChange={handleChange}
            />
            {errors && <small className="help is-danger">{errors}</small>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Password
          </label>
          <div className="control">
            <input
              type="text"
              name="password"
              className="input"
              onChange={handleChange}
            />
            {errors && <small className="help is-danger">{errors}</small>}
          </div>
        </div>
        <button className="button is-info">
          Login
        </button>
      </form>
    </div>
  </section>
}

export default LoginForm 