import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { login } from '../../services/authService'
import useLogin from '../../hooks/useLogin'
import "./LoginScreen.css"

const LoginScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useLogin()

    return (
        <div className="login-container">
            <h1>Inicia sesion</h1>

            <form onSubmit={onSubmitForm} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={onChangeFieldValue}
                        value={form_state.email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={onChangeFieldValue}
                        value={form_state.password}
                    />
                </div>

                {error && <span className="error-message">{error.message}</span>}

                {response && response.ok && (
                    <span className="success-message">
                        Te has logueado exitosamente
                    </span>
                )}

                <button
                    type="submit"
                    className="login-button"
                    disabled={loading || (response && response.ok)}
                >
                    Iniciar sesion
                </button>
            </form>

            <span className="register-text">
                Aun no tienes cuenta? <Link to="/register">Registrate</Link>
            </span>
        </div>
    )
}

export default LoginScreen