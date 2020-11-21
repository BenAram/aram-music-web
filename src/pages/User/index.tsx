import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
    User as UserIcon,
    AtSign,
    Lock,
    LogOut,
    Trash2
} from 'react-feather'
import { useDispatch } from 'react-redux'

import {
    Container,
    AvatarImageContainer,
    AvatarImage,
    AvatarInput,
    UserInput,
    SaveButton,
    ErrorContainer,
    ErrorMessage,
    OperationContainer,
    OperationLeave,
    OperationDelete
} from './styles'

import api from '../../services/api'
import url from '../../services/url'

import logo from '../../images/logo.png'

import Divider from '../../components/Divider'

interface Avatar {
    name: string
    uri: string
    type: string
}

function User(): JSX.Element {

    const history = useHistory()
    const dispatch = useDispatch()

    const avatarInput = useRef<any>()

    const [updates, setUpdates] = useState<number>(0)

    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [avatar, setAvatar] = useState<Avatar | null>()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')

    const [initialAvatar, setInitialAvatar] = useState<Avatar | null>()
    const [initialName, setInitialName] = useState<string>('')
    const [initialEmail, setInitialEmail] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)

    function handleChangeAvatar() {
        const file = avatarInput.current.files[0]
        const fileReader = new FileReader()

        fileReader.onloadend = () => {
            setAvatar({
                name: file.name,
                type: file.type,
                uri: fileReader.result as string
            })
        }
        fileReader.readAsDataURL(file)
    }

    async function handleSaveChanges() {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('password', password)
            if (name !== initialName) {
                formData.append('name', name)
            }
            if (email !== initialEmail) {
                formData.append('email', email)
            }
            if (avatar !== initialAvatar) {
                formData.append('avatar', avatarInput.current.files[0])
            }
            if (newPassword) {
                formData.append('newPassword', newPassword)
            }
            const { data } = await api.patch('/user', formData, {
                headers: {
                    'Content-Type': 'multipart/formdata',
                    email: localStorage.getItem('email'),
                    token: localStorage.getItem('token')
                }
            })
            if (data.error) {
                setError(true)
                setErrorMessage(data.message)
            } else {
                if (email !== initialEmail) {
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('token', data.token)
                }
                setPassword('')
                setUpdates(updates + 1)
            }
        } catch(err) {
            setError(true)
            setErrorMessage('Um erro ocorreu.')
        }
        setLoading(false)
    }

    function clean(): void {
        dispatch({ type: 'clean-audio' })
        dispatch({ type: 'clean-playlist' })
        dispatch({ type: 'disactive-music-is-loaded' })
        dispatch({ type: 'clean-music' })
    }

    function handleLeaveAccount(): void {
        clean()

        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('rememberme')
        history.push('/')
    }

    async function handleDeleteAccount() {
        try {
            const email = localStorage.getItem('email')
            const token = localStorage.getItem('token')
            const { data } = await api.delete('/user', {
                headers: {
                    email,
                    token
                }
            })
            if (data.error) {
                setError(true)
                setErrorMessage(data.message)
            } else {
                alert('Conta deletada com sucesso.')
                clean()
                
                localStorage.removeItem('email')
                localStorage.removeItem('token')
                localStorage.removeItem('rememberme')
                history.push('/')
            }
        } catch(err) {
            setError(true)
            setErrorMessage('Um erro ocorreu.')
        }
    }

    function verifyCanSave(): boolean {
        if (avatar !== initialAvatar) {
            return true
        }
        if (name !== initialName) {
            return true
        }
        if (email !== initialEmail) {
            return true
        }
        if (newPassword) {
            return true
        }
        return false
    }

    useEffect(() => {
        async function run() {
            const email = localStorage.getItem('email')
            const token = localStorage.getItem('token')

            try {
                const { data } = await api.get('/user', {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    setError(true)
                    setErrorMessage(data.message)
                } else {
                    let avatar: Avatar | null
                    if (data.avatar) {
                        avatar = {
                            name: data.avatar,
                            uri: `${url}/avatar/${data.avatar}`,
                            type: 'image/png'
                        }
                        setInitialAvatar(avatar)
                        setAvatar(avatar)
                    } else {
                        setInitialAvatar(null)
                        setAvatar(null)
                    }

                    setName(data.name)
                    setInitialName(data.name)

                    setEmail(data.email)
                    setInitialEmail(data.email)
                }
            } catch(err) {
                setError(true)
                setErrorMessage('Um erro ocorreu.')
            }
        }
        run()
    }, [updates])

    return <Container>
        <label>
            <AvatarImageContainer>
                <AvatarImage
                    src={avatar ? avatar.uri : logo}
                />
            </AvatarImageContainer>
            <AvatarInput
                ref={avatarInput}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleChangeAvatar}
            />
        </label>
        <label>
            <UserIcon
                color="#d9dadc"
                size={26}
            />
            <UserInput
                disabled={loading}
                type="text"
                placeholder="Nome"
                value={name}
                onChange={({ target }) => setName(target.value)}
            />
        </label>
        <label>
            <AtSign
                color="#d9dadc"
                size={26}
            />
            <UserInput
                disabled={loading}
                type="text"
                placeholder="Email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
            />
        </label>
        <label>
            <Lock
                color="#d9dadc"
                size={26}
            />
            <UserInput
                disabled={loading}
                type="password"
                placeholder="Nova senha (opcional)"
                value={newPassword}
                onChange={({ target }) => setNewPassword(target.value)}
            />
        </label>
        <Divider
            customWidth="30%"
        />
        <label>
            <Lock
                color="#d9dadc"
                size={26}
            />
            <UserInput
                disabled={loading}
                type="password"
                placeholder="Senha para confirmar alterações"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
        </label>
        {error ? <ErrorContainer>
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </ErrorContainer> : null}
        {(verifyCanSave()) ? <SaveButton onClick={handleSaveChanges} disabled={loading}>
            <span>Salvar alterações</span>
        </SaveButton> : null}
        <OperationContainer>
            <OperationLeave onClick={handleLeaveAccount}>
                <LogOut
                    color="#d9dadc"
                    size={26}
                />
                <span>Sair da conta</span>
            </OperationLeave>
            <OperationDelete onClick={handleDeleteAccount}>
                <Trash2
                    color="#d9dadc"
                    size={26}
                />
                <span>Deletar conta</span>
            </OperationDelete>
        </OperationContainer>
    </Container>
}

export default User