import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './RegisterStyle.css'

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signup, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })

  return (
    <div className="div">
      {registerErrors.map((error, i) => (
        <div className="div" key={i}>
          {error}
        </div>
      ))}
      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          {...register('username', { required: true })}
          placeholder="username"
        />
        {errors.username && <p className="p">Username is requiered</p>}
        <input
          className="input"
          type="email"
          {...register('email', { required: true })}
          placeholder="email"
        />
        {errors.email && <p className="p">Email is requiered</p>}
        <input
          className="input"
          type="password"
          {...register('password', { required: true })}
          placeholder="password"
        />
        {errors.password && <p className="p">Password is requiered</p>}
        <button className="button" type="submit">
          Register
        </button>
      </form>
      <p className="p">
        Ya tienes cuenta?{' '}
        <Link className="Link" to="/login">
          Inicia
        </Link>
      </p>
    </div>
  )
}
