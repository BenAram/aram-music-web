import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    Eye,
    Share,
    ArrowLeft,
    Edit,
    Play,
    ArrowUp,
    ArrowDown,
    Trash2,
    Plus
} from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'

import {
    Container,
    ReturnContainer,
    ReturnButton,
    PlayerContainer,
    InfoContainer,
    InfoImg,
    InfoMusicContainer,
    InfoName,
    InfoNameInput,
    ErrorContainer,
    ErrorMessage,
    InfoMusics,
    PlayButton,
    MusicsContainer,
    MusicItem,
    MusicConfig,
    MusicImage,
    MusicDrag
} from './styles'

import ContextMenuMusic from '../../components/ContextMenuMusic'

import api from '../../services/api'
import url from '../../services/url'

import logo from '../../images/logo.png'

const initialState: Music = {
    access: 0,
    description: '',
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
    id: 0,
    createdAt: '',
    editable: false
}

const initialStatePlaylist: Playlist = {
    id: 0,
    musics: [],
    name: '',
    public: false,
    editable: false
}

function Playlist(): JSX.Element {

    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const nameInput = useRef<any>()

    const history = useHistory()
    const { id } = useParams() as any

    const dispatch = useDispatch()
    const actualIndex: number = useSelector((store: any) => store.actualIndex)

    const [contextMenu, setContextMenu] = useState<boolean>(false)
    const [contextMenuCoordinates, setContextMenuCoordinates] = useState<CustomCoordinates>({
        x: -500,
        y: -500
    })
    const [contextMenuMusic, setContextMenuMusic] = useState<Music>(initialState)

    const [loaded, setLoaded] = useState<boolean>(false)

    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [playlist, setPlaylist] = useState<Playlist>(initialStatePlaylist)
    const [initialName, setInitialName] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [musics, setMusics] = useState<Array<Music>>([])
    const [owner, setOwner] = useState<string>('')

    function handleSeeMusic(id: number): Function {
        return function() {
            history.push(`/app/music/${id}`)
        }
    }

    function handleContextMenu(music: Music): Function {
        return function(evt: MouseEvent) {
            if (evt.button === 2) {
                setContextMenu(true)
                setContextMenuMusic(music)
            }
        }
    }

    function handleGoBack(): void {
        history.goBack()
    }

    function handleChangeName(evt: ChangeEvent<HTMLInputElement>) {
        setName(evt.target.value)
    }

    function handleKeyDown(evt: globalThis.KeyboardEvent) {
        if (evt.code === 'Enter') {
            nameInput.current.blur()
        }
    }

    async function saveName() {
        if (name !== initialName) {
            try {
                const { data } = await api.patch('/playlists/rename', {
                    name: initialName,
                    newName: name
                }, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    setError(true)
                    setErrorMessage(data.message)
                } else {
                    dispatch({ type: 'rename-playlists', payload: name, index: actualIndex })
                    setInitialName(name)
                }
            } catch(err) {
                setError(true)
                setErrorMessage('Ocorreu um erro ao renomear a playlist')
            }
        }
    }

    function handlePlayPlaylist(): Function {
        return function() {
            dispatch({ type: 'disactive-music-is-loaded' })
            setTimeout(() => {
                dispatch({ type: 'rename-playlist', payload: initialName })
                dispatch({ type: 'change-playlist', payload: musics })
                dispatch({ type: 'active-playlist' })
                dispatch({ type: 'active-music-is-loaded' })
            }, 1)
        }
    }

    function handleMoveMusic(index: number, type: 'up' | 'down'): Function {
        return async function() {
            const music: Music = musics[index]
            const newMusics = [...musics]
            switch (type) {
                case 'up':
                    try {
                        const { data } = await api.patch('/playlists/move', {
                            index,
                            newIndex: index - 1,
                            name: initialName
                        }, {
                            headers: {
                                email,
                                token
                            }
                        })
                        if (data.error) {
                            setError(true)
                            setErrorMessage(data.message)
                        } else {
                            newMusics.splice(index, 1)
                            newMusics.splice(index - 1, 0, music)
                            setMusics(newMusics)
                        }
                    } catch(err) {
                        setError(true)
                        setErrorMessage('Ocorreu um erro ao mover a musica')
                    }
                    break
                case 'down':
                    try {
                        const { data } = await api.patch('/playlists/move', {
                            index,
                            newIndex: index + 1,
                            name: initialName
                        }, {
                            headers: {
                                email,
                                token
                            }
                        })
                        if (data.error) {
                            setError(true)
                            setErrorMessage(data.message)
                        } else {
                            newMusics.splice(index, 1)
                            newMusics.splice(index + 1, 0, music)
                            setMusics(newMusics)
                        }
                    } catch(err) {
                        setError(true)
                        setErrorMessage('Ocorreu um erro ao mover a musica')
                    }
            }
        }
    }

    function handleDeleteMusic(index: number): Function {
        return async function() {
            try {
                const { data } = await api.patch('/playlists/delete', {
                    index,
                    name: initialName
                }, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    setError(true)
                    setErrorMessage(data.message)
                } else {
                    const newMusics: Array<Music> = [...musics]
                    newMusics.splice(index, 1)
                    setMusics(newMusics)
                    dispatch({ type: 'remove-playlists', index: actualIndex, payload: index })
                }
            } catch(err) {
                setError(true)
                setErrorMessage('Ocorreu um erro ao tentar deletar a música da playlist')
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        setLoaded(false)
        async function run() {
            const { data } = await api.get(`/playlists/${id}`, {
                headers: {
                    email,
                    token
                }
            })
            if (data.error) {
                setError(true)
                setErrorMessage(data.message)
            } else {
                setError(false)
                setErrorMessage('')
                setPlaylist(data)
                setInitialName(data.name)
                setName(data.name)
                setMusics(data.musics)
                setOwner(data.owner)
            }
        }

        function click() {
            setContextMenu(false)
            setContextMenuCoordinates({
                x: -500,
                y: -500
            })
        }
        function contextMenu(evt: MouseEvent) {
            const config: CustomCoordinates = {
                x: evt.x,
                y: 0
            }
            if (evt.y > (window.innerHeight / 100) * 80) {
                config.y = evt.y - 120
            } else {
                config.y = evt.y - 30
            }
            setContextMenuCoordinates(config)
        }
        document.addEventListener('click', click)
        document.addEventListener('contextmenu', contextMenu)
        
        run()
        setLoaded(true)
        return () => {
            document.removeEventListener('click', click)
            document.removeEventListener('contextmenu', contextMenu)
        }
    }, [id])

    if (!loaded) {
        return <Container/>
    }

    return <Container>
        <ContextMenuMusic
            visible={contextMenu}
            x={contextMenuCoordinates.x}
            y={contextMenuCoordinates.y}
            music={contextMenuMusic}
        />
        <ReturnContainer>
            <ReturnButton onClick={handleGoBack}>
                <ArrowLeft
                    color="#d9dadc"
                    size={20}
                />
            </ReturnButton>
        </ReturnContainer>
        <PlayerContainer>
            <InfoContainer>
                <InfoImg
                    hasImage={!!musics[0]}
                    src={musics[0] ? `${url}/music-bg/${musics[0].music_background}` : logo}
                />
                <InfoMusicContainer>
                    {playlist.editable ?
                        <InfoNameInput>
                            <input
                                ref={nameInput}
                                value={name}
                                maxLength={20}
                                onChange={handleChangeName}
                                onBlur={saveName}
                            />
                            <button onClick={() => nameInput.current.focus()}>
                                <Edit
                                    color="#d9dadc"
                                    size={20}
                                />
                            </button>
                        </InfoNameInput> : 
                        <InfoName>{name}</InfoName>}
                    <InfoMusics>{musics.length} Música{musics.length < 2 ? '' : 's'}</InfoMusics>
                    <InfoMusics>Feita por: {owner}</InfoMusics>
                </InfoMusicContainer>
                {error ? <ErrorContainer>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </ErrorContainer> : null}
            </InfoContainer>
            {musics.length > 0 ? <PlayButton onClick={handlePlayPlaylist() as any}>
                <Play
                    color="#d9dadc"
                    size={26}
                />
            </PlayButton> : null}
        </PlayerContainer>
        <MusicsContainer>
            {musics.map((music, index) => <MusicItem
                key={index}
                onMouseDown={handleContextMenu(music) as any}
            >
                <MusicConfig onClick={handleSeeMusic(music.id) as any}>
                    <MusicImage
                        src={`${url}/music-bg/${music.music_background}`}
                    />
                    <div style={{ textAlign: 'left' }}>
                        <strong>{music.name}</strong>
                        <p>Enviado por: {music.user_owner.name}</p>
                        <p>Acessos: {music.access}</p>
                    </div>
                </MusicConfig>
                <MusicDrag>
                    {(index > 0 && playlist.editable) ? <button
                        onClick={handleMoveMusic(index, 'up') as any}
                    >
                        <ArrowUp
                            size={20}
                            color="#d9dadc"
                        />
                    </button> : null}
                    {(index < musics.length - 1 && playlist.editable) ? <button
                        onClick={handleMoveMusic(index, 'down') as any}
                    >
                        <ArrowDown
                            size={20}
                            color="#d9dadc"
                        />
                    </button> : null}
                    {playlist.editable ? <button
                        onClick={handleDeleteMusic(index) as any}
                    >
                        <Trash2
                            size={20}
                            color="#d9dadc"
                        />
                    </button> : null}
                </MusicDrag>
            </MusicItem>)}
        </MusicsContainer>
    </Container>
}

export default Playlist