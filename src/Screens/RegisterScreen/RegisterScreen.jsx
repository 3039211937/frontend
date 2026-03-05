import React from 'react'
import { Link } from 'react-router'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useRequest from '../../hooks/useRequest'
import useRegister from '../../hooks/userRegister'
import "./RegisterScreen.css"

const RegisterScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useRegister()
    return (
        <div className="register-container">
            <h1>Registrate en la aplicacion</h1>

            <form onSubmit={onSubmitForm} className="register-form">

                <div className="form-group">
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form_state.username}
                        onChange={onChangeFieldValue}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form_state.password}
                        onChange={onChangeFieldValue}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form_state.email}
                        onChange={onChangeFieldValue}
                    />
                </div>

                {error && <span className="error-message">{error.message}</span>}

                {response && response.ok && (
                    <span className="success-message">
                        Usuario registrado exitosamente, te enviaremos un mail con instrucciones.
                    </span>
                )}

                <button
                    type="submit"
                    className="register-button"
                    disabled={loading}
                >
                    Registrarse
                </button>
            </form>

            <span className="login-text">
                Ya tienes una cuenta? <Link to="/login">Iniciar sesion</Link>
            </span>
        </div>
    )
}

export default RegisterScreen