import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {
    ArrowLeft,
    Play,
    Edit
} from 'react-feather'
import { useDispatch } from 'react-redux'

import {
    Container,
    InputContainer,
    Input,
    Header,
    Main,
    MainImg,
    MainInfoContainer,
    MainInfo,
    MainInfoAvatarContainer,
    MainInfoAvatar,
    MainInfoName,
    MainPlayContainer,
    MainPlayType,
    MainPlayButton,
    Footer,
    FooterItem
} from './styles'

import api from '../../services/api'
import url from '../../services/url'

import logo from '../../images/logo.png'

interface Error {
    error: boolean
    message: string
}

const initialState: Music = {
    access: 0,
    description: '',
    id: 0,
    keywords: [],
    music_background: '',
    name: '',
    name_upload: '',
    type: '',
    user_owner: {
        avatar: '',
        name: '',
        id: 0
    },
    createdAt: '',
    editable: false
}

function Music(): JSX.Element {

    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const { id } = useParams() as any
    const history = useHistory()

    const dispatch = useDispatch()

    const nameInput = useRef<any>()
    const descriptionInput = useRef<any>()
    const keywordsInput = useRef<any>()

    const [loaded, setLoaded] = useState<boolean>(false)

    const [music, setMusic] = useState<Music>(initialState)
    const [error, setError] = useState<Error>()

    const [initialName, setInitialName] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [initialDescription, setInitialDescription] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [initialKeywords, setInitialKeywords] = useState<string>('')
    const [keywords, setKeywords] = useState<string>('')

    function treatType() {
        const { type } = music
        const letter = type[0]
        return letter.toUpperCase() + type.slice(1, type.length)
    }

    function treatTime(time: number): string {
        if (time > 9) {
            return `${time}`
        } else {
            return `0${time}`
        }
    }

    function getDate(): string {
        const createdAt = new Date(music.createdAt)

        const day = treatTime(createdAt.getDate())
        const month = treatTime(createdAt.getMonth())
        const year = createdAt.getFullYear()

        const hours = treatTime(createdAt.getHours())
        const minutes = treatTime(createdAt.getMinutes())
        return `${hours}:${minutes} - ${day}/${month}/${year}`
    }

    function goBack() {
        history.goBack()
    }

    async function handleSaveName() {
        if (name !== initialName) {
            try {
                const config: any = {}
                config.name_upload = music.name_upload
                config.name = name
    
                const { data } = await api.patch('/audio', config, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    alert(data.message)
                } else {
                    document.title = `${name} - Aram Music`
                    setInitialName(name)
                }
            } catch(err) {
                alert('Ocorreu um erro')
            }
        }
    }

    async function handleSaveDescription() {
        if (description !== initialDescription) {
            try {
                const config: any = {}
                config.name_upload = music.name_upload
                config.description = description
    
                const { data } = await api.patch('/audio', config, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    alert(data.message)
                } else {
                    setInitialDescription(description)
                }
            } catch(err) {
                alert('Ocorreu um erro')
            }
        }
    }

    async function handleSaveKeywords() {
        if (keywords !== initialKeywords) {
            try {
                const config: any = {}
                config.name_upload = music.name_upload
                config.keywords = keywords
    
                const { data } = await api.patch('/audio', config, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    alert(data.message)
                } else {
                    setInitialKeywords(keywords)
                }
            } catch(err) {
                alert('Ocorreu um erro')
            }
        }
    }

    function handlePlayMusic() {
        dispatch({ type: 'disactive-music-is-loaded' })
        setTimeout(() => {
            dispatch({ type: 'change-music', payload: music })
            dispatch({ type: 'active-music-is-loaded' })
        }, 1)
    }

    function handleOpenUserPage(id: number) {
        history.push(`/app/user/${id}`)
    }

    useEffect(() => {
        async function run() {
            try {
                const { data } = await api.get(`/music/${id}`, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    setError(data)
                } else {
                    document.title = `${data.name} - Aram Music`
                    setMusic(data)
                    setInitialName(data.name)
                    setName(data.name)
                    setInitialDescription(data.description)
                    setDescription(data.description)
                    setInitialKeywords(data.keywords.join(', '))
                    setKeywords(data.keywords.join(', '))
                }
                setLoaded(true)
            } catch(err) {
                alert('Ocorreu um erro ao carregar a música')
            }
        }
        run()
    }, [id])

    useEffect(() => {
        function keydown(evt: KeyboardEvent) {
            if (evt.code === 'Enter') {
                if (nameInput.current) {
                    nameInput.current.blur()
                }
                if (descriptionInput.current) {
                    descriptionInput.current.blur()
                }
                if (keywordsInput.current) {
                    keywordsInput.current.blur()
                }
            }
        }
        document.addEventListener('keydown', keydown)
        return () => {
            document.removeEventListener('keydown', keydown)
        }
    }, [])

    if (!loaded) {
        return <Container/>
    }

    if (error) {
        if (error.error) {
            return <Container
                style={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <img
                    src={logo}
                    style={{ width: 80, height: 80 }}
                />
                <h2
                    style={{
                        color: '#4c43df'
                    }}
                >{error.message}</h2>
            </Container>
        }
    }

    return <Container>
        <Header>
            <button onClick={goBack}>
                <ArrowLeft
                    size={20}
                    color="#d9dadc"
                />
            </button>
        </Header>
        <Main>
            <MainInfoContainer>
                <MainImg
                    src={`${url}/music-bg/${music.music_background}`}
                />
                <MainInfo>
                    <div>
                        {music.editable ? <InputContainer cwidth={'225px'}>
                            <Input
                                ref={nameInput}
                                maxLength={30}
                                onBlur={handleSaveName}
                                onChange={(e: any) => setName(e.target.value)}
                                value={name}
                                placeholder="Nome"
                            />
                            <Edit
                                size={16}
                                color="#d9dadc"
                            />
                        </InputContainer> :
                        <p>{music.name}</p>}
                    </div>
                    <MainInfoAvatarContainer
                        onClick={() => handleOpenUserPage(music.user_owner.id)}
                    >
                        <MainInfoAvatar
                            src={music.user_owner.avatar ? `${url}/avatar/${music.user_owner.avatar}` : logo}
                        />
                        <div>
                            <MainInfoName>Enviado por:</MainInfoName>
                            <MainInfoName><strong>{music.user_owner.name}</strong></MainInfoName>
                        </div>
                    </MainInfoAvatarContainer>
                </MainInfo>
            </MainInfoContainer>
            <MainPlayContainer>
                <MainPlayType>{treatType()}</MainPlayType>
                <MainPlayButton onClick={handlePlayMusic}>
                    <Play
                        size={20}
                        color="#d9dadc"
                    />
                </MainPlayButton>
            </MainPlayContainer>
        </Main>
        <Footer>
            <FooterItem>
                <strong>Descrição:</strong>
                {music.editable ? <InputContainer cwidth={'80%'}>
                    <Input
                        ref={descriptionInput}
                        cwidth={'95%'}
                        maxLength={100}
                        onBlur={handleSaveDescription}
                        onChange={(e: any) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Descrição"
                    />
                    <Edit
                        size={16}
                        color="#d9dadc"
                    />
                </InputContainer> : <p>{music.description}</p>}
            </FooterItem>
            <FooterItem>
                <strong>Palavras-chaves:</strong>
                {music.editable ? <InputContainer cwidth={'100%'}>
                    <Input
                        ref={keywordsInput}
                        cwidth={'95%'}
                        maxLength={400}
                        onBlur={handleSaveKeywords}
                        onChange={(e: any) => setKeywords(e.target.value)}
                        value={keywords}
                        placeholder="Palavras-chaves"
                    />
                    <Edit
                        size={16}
                        color="#d9dadc"
                    />
                </InputContainer> : <p>{music.keywords.join(', ')}</p>}
            </FooterItem>
            <FooterItem>
                <p><strong>Acessos: </strong>{music.access}</p>
            </FooterItem>
            <FooterItem>
                <strong>Data de envio:</strong>
                <p>{getDate()}</p>
            </FooterItem>
        </Footer>
    </Container>
}

export default Music