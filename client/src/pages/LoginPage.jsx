import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import './RegisterStyle.css'

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signin, errors: signinErrors } = useAuth()
  const onSubmit = handleSubmit((data) => {
    signin(data)
    console.log(data)
  })

  return (
    <div className="div">
      {signinErrors.map((error, i) => (
        <div className="div" key={i}>
          {error}
        </div>
      ))}
      <form className="form" onSubmit={onSubmit}>
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
          Login
        </button>
        <p className="p">
          No tienes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
  )
}
