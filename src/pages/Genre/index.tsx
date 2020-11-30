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
        name: ''
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

    const history = useHistory()
    const params = useParams() as any

    const dispatch = useDispatch()

    const [contextMenu, setContextMenu] = useState<boolean>(false)
    const [contextMenuCoordinates, setContextMenuCoordinates] = useState<CustomCoordinates>({
        x: -500,
        y: -500
    })
    const [contextMenuMusic, setContextMenuMusic] = useState<Music>(initialState)

    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [hasImg, setHasImg] = useState<boolean>(false)
    const [musics, setMusics] = useState<Array<Music>>([])

    function treatTypeName(): string {
        const treated: string = params.type[0].toUpperCase()
        return treated + params.type.slice(1, params.type.length)
    }

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

    function handlePlayPlaylist(): Function {
        return function() {
            dispatch({ type: 'disactive-music-is-loaded' })
            setTimeout(() => {
                dispatch({ type: 'rename-playlist', payload: treatTypeName() })
                dispatch({ type: 'change-playlist', payload: musics })
                dispatch({ type: 'active-playlist' })
                dispatch({ type: 'active-music-is-loaded' })
            }, 1)
        }
    }

    useEffect(() => {
        async function run() {
            try {
                const { data } = await api.get(`/audio/type/${params.type}`)
                if (data.error) {
                    setError(true)
                    setErrorMessage(data.message)
                } else {
                    setMusics(data)
                }
            } catch(err) {
                setError(true)
                setErrorMessage('Ocorreu um erro')
            }
        }
        async function getImg() {
            try {
                const { data } = await api.get(`${url}/types-img/${params.type}.jpeg`)
                if (!data || data.error) {
                    setHasImg(false)
                } else {
                    setHasImg(true)
                }
            } catch(err) {
                setHasImg(false)
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
            if (evt.y > (window.innerHeight / 100) * 85) {
                config.y = evt.y - 100
            } else {
                config.y = evt.y - 30
            }
            setContextMenuCoordinates(config)
        }
        document.addEventListener('click', click)
        document.addEventListener('contextmenu', contextMenu)
        
        run()
        getImg()
        return () => {
            document.removeEventListener('click', click)
            document.removeEventListener('contextmenu', contextMenu)
        }
    }, [params])

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
                    src={hasImg ? `${url}/types-img/${params.type}.jpeg` : logo}
                />
                <InfoMusicContainer>
                    <InfoName>{treatTypeName()}</InfoName>
                    <InfoMusics>{musics.length} Música{musics.length < 2 ? '' : 's'}</InfoMusics>
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
            </MusicItem>)}
        </MusicsContainer>
    </Container>
}

export default Playlist