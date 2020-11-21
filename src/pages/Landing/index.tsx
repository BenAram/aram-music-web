import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { User, AtSign, Lock, X, Check } from 'react-feather'

import {
    LoadingContainer,
    LoadingImage,
    Container,
    Logo,
    Interface,
    InputLabel,
    InputContainer,
    TextInput,
    LoginContainer,
    CheckboxLabel,
    CheckboxInput,
    UncheckedDiv,
    CheckedDiv,
    CheckboxP,
    LoginButton,
    LoginText,
    ErrorContainer,
    ErrorMessage,
    CreateAccountButton
} from './styles'

import Header from '../../components/Header'
import Divider from '../../components/Divider'

import api from '../../services/api'

import logo from '../../images/logo.png'

function Landing(): JSX.Element {

    const { desktop } = window as any

    const history = useHistory()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [createAccount, setCreateAccount] = useState<boolean>(false)
    const [rememberMe, setRememberMe] = useState<boolean>(true)

    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)

    const [didMount, setDidMount] = useState<boolean>(false)

    function handleToggleRememberMe(): void {
        setRememberMe(!rememberMe)
    }

    function handleToggleCreateAccount(): void {
        setCreateAccount(!createAccount)
    }

    async function handleLogin() {
        setLoading(true)
        try {
            if (createAccount) {
                const { data } = await api.post('/user', {
                    name,
                    email,
                    password,
                    confirmPassword
                })
                if (data.error) {
                    setError(true)
                    setErrorMessage(data.message)
                } else {
                    localStorage.setItem('email', email)
                    localStorage.setItem('token', data.token)
                    if (rememberMe) {
                        localStorage.setItem('rememberme', 'true')
                    }
                    history.push('/app')
                }
            } else {
                const { data } = await api.post('/login', {
                    email,
                    password
                })
                if (data.error) {
                    setError(true)
                    setErrorMessage(data.message)
                } else {
                    localStorage.setItem('email', email)
                    localStorage.setItem('token', data.token)
                    if (rememberMe) {
                        localStorage.setItem('rememberme', 'true')
                    }
                    history.push('/app')
                }
            }
        } catch(err) {
            setError(true)
            setErrorMessage('Um erro ocorreu.')
        }
        setLoading(false)
    }

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberme')
        if (rememberMe) {
            if (history) {
                history.push('/app')
            }
        } else {
            localStorage.removeItem('email')
            localStorage.removeItem('token')
        }
        setDidMount(true)
    }, [])

    if (!didMount) {
        return <LoadingContainer>
            <LoadingImage src={logo} />
        </LoadingContainer>
    }

    return <Container>
        {desktop ? <Header /> : null}
        <Logo
            src={logo}
        />
        <Interface>
            {createAccount ? <>
                <InputLabel>Seu nome</InputLabel>
                <InputContainer>
                    <User
                        size={26}
                        color="#4c43df"
                    />
                    <TextInput
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </InputContainer>
            </> : null}
            <InputLabel>Seu e-mail</InputLabel>
            <InputContainer>
                <AtSign
                    size={26}
                    color="#4c43df"
                />
                <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </InputContainer>
            <InputLabel>Sua senha</InputLabel>
            <InputContainer>
                <Lock
                    size={26}
                    color="#4c43df"
                />
                <TextInput
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </InputContainer>
            {createAccount ? <>
                <InputLabel>Confirme sua senha</InputLabel>
                <InputContainer>
                    <Lock
                        size={26}
                        color="#4c43df"
                    />
                    <TextInput
                        type="password"
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </InputContainer>
            </> : null}
            {error ? <ErrorContainer>
                <X
                    size={26}
                    color="#c82333"
                />
                <ErrorMessage>
                    {errorMessage}
                </ErrorMessage>
            </ErrorContainer> : null}
        </Interface>
        <LoginContainer>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleToggleRememberMe}
                        disabled={loading}
                    />
                    {rememberMe ? <CheckedDiv>
                        <Check
                            color="#d9dadc"
                            size={20}
                        />
                    </CheckedDiv> : <UncheckedDiv/>}
                    <CheckboxP>Lembrar de mim</CheckboxP>
                </CheckboxLabel>
                <LoginButton
                    disabled={loading}
                    onClick={handleLogin}
                >
                    <LoginText>{createAccount ? 'Criar conta' : 'Logar'}</LoginText>
                </LoginButton>
        </LoginContainer>
        <Divider customWidth="30%" />
        <CreateAccountButton onClick={handleToggleCreateAccount}>
            <p>{createAccount ? 'Entrar em uma conta' : 'Criar conta'}</p>
        </CreateAccountButton>
    </Container>
}

export default Landing