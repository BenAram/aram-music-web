import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import {
    Edit,
    Globe,
    Lock,
    Home,
    Search,
    Upload,
    Music,
    User as UserIcon,
    Trash2,
    Download,
    PlusCircle
} from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'

import AudioController from '../../components/AudioController'
import Header from '../../components/Header'
import {
    ContextMenuContainer,
    ContextMenuItem,
    ContextMenuTextContainer,
    ContextMenuDivider,
    ContextMenuText
} from '../../components/ContextMenu'

import Genre from '../Genre'
import HomePage from '../Home'
import MusicPage from '../Music'
import MyMusics from '../MyMusics'
import Playlist from '../Playlist'
import SearchPage from '../Search'
import User from '../Me'
import UploadPage from '../Upload'
import NotFound from '../NotFound'

import {
    Container,
    AppContainer,
    NavContainer,
    NavButtonContainer,
    NavButton,
    NavButtonText,
    NavSubtitleContainer,
    NavSubtitle,
    NavPlaylistItem,
    NavPlaylistImage,
    NavPlaylistImageDiv,
    NavPlaylistInfoContainer,
    NavPlaylistInput,
    NavPlaylistName,
    NavPlaylistInfo,
    DownloadButton,
    ContentContainer
} from './styles'

import api from '../../services/api'
import url from '../../services/url'

function App(): JSX.Element {

    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const { desktop } = window as any

    const history = useHistory()
    const location = useLocation()
    
    const dispatch = useDispatch()
    const musicIsLoaded = useSelector((store: any) => store.musicIsLoaded)
    const updates = useSelector((store: any) => store.updates)
    const playlistsStore: Array<Playlist> = useSelector((store: any) => store.playlists)

    const [contextMenu, setContextMenu] = useState<boolean>(false)
    const [contextMenuCoordinates, setContextMenuCoordinates] = useState<CustomCoordinates>()

    const nameInput = useRef<any>()
    const [initialName, setInitialName] = useState<string>('')
    const [playlistName, setPlaylistName] = useState<string>('')
    const [indexSelected, setIndexSelected] = useState<number>(0)

    const [playlists, setPlaylists] = useState<Array<Playlist>>([])

    const createPlaylistInput = useRef<any>()
    const [createPlaylist, setCreatePlaylist] = useState<boolean>(false)
    const [createPlaylistName, setCreatePlaylistName] = useState<string>('')

    const path = location.pathname.replace('/app', '')

    function navigate(pageName: string): Function {
        return function(): void {
            if (pageName === '') {
                history.push('/app')
            } else {
                history.push(`/app/${pageName}`)
            }
        }
    }

    function renamePlaylist(index: number): Function {
        return async function() {
            function clean(newName?: string) {
                dispatch({ type: 'rename-playlists', index, payload: newName })
            }
            if (playlistName !== initialName) {
                try {
                    const { data } = await api.patch('/playlists/rename', {
                        name: playlists[index].name,
                        newName: playlistName
                    }, {
                        headers: {
                            email,
                            token
                        }
                    })
                    if (data.error) {
                        alert(data.message)
                    } else {
                        clean(playlistName)
                        setPlaylistName('')
                        setInitialName('')
                    }
                } catch(err) {
                    alert('Um erro ocorreu ao renomear a playlist')
                }
            } else {
                clean()
            }
        }
    }

    function handleGoPlaylist(playlist: Playlist, index: number): Function {
        return function() {
            dispatch({ type: 'change-actual-index', payload: index })
            history.push(`/app/playlist/${playlist.id}`)
        }
    }

    function handleContextMenuPlaylist(index: number): Function {
        return function() {
            setIndexSelected(index)
            setContextMenu(true)
        }
    }

    function handleRenamePlaylist() {
        const newPlaylists: Array<Playlist> = [...playlists]
        newPlaylists[indexSelected].editable = true
        setInitialName(newPlaylists[indexSelected].name)
        setPlaylistName(newPlaylists[indexSelected].name)
        setPlaylists(newPlaylists)
        setTimeout(() => {
            nameInput.current.focus()
        }, 1)
    }

    async function handleTogglePublic() {
        try {
            const { data } = await api.patch('/playlists/change-public', {
                public_playlist: !playlists[indexSelected].public,
                name: playlists[indexSelected].name
            }, {
                headers: {
                    email,
                    token
                }
            })
            if (data.error) {
                alert(data.message)
            } else {
                dispatch({ type: 'toggle-public-playlists', index: indexSelected })
            }
        } catch(err) {
            alert('Um erro ocorreu.')
        }
    }

    async function handleDeletePlaylist() {
        try {
            const { data } = await api.delete('/playlists', {
                headers: {
                    email,
                    token,
                    name: playlists[indexSelected].name
                }
            })
            if (data.error) {
                alert(data.message)
            } else {
                dispatch({ type: 'delete-playlists', index: indexSelected })
            }
        } catch(err) {
            alert('Um erro ocorreu ao deletar a playlist')
        }
    }

    async function handleCreatePlaylist() {
        try {
            if (createPlaylistName) {
                const { data } = await api.post('/playlists', {
                    name: createPlaylistName,
                    public_playlist: false
                }, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    alert(data.message)
                } else {
                    dispatch({ type: 'insert-new-playlists', payload: createPlaylistName, id: data.id })

                    setCreatePlaylist(false)
                    setCreatePlaylistName('')
                }
            } else {
                setCreatePlaylist(false)
                setCreatePlaylistName('')
            }
        } catch(err) {
            alert('Não foi possível criar a playlist')
        }
    }

    useEffect(() => {
        if (!email || !token) {
            sessionStorage.setItem('url', location.pathname)
            history.push('/')
            return
        }
        async function run() {
            try {
                const { data } = await api.get('/playlists', {
                    headers: {
                        email,
                        token
                    }
                })
                const newPlaylists = []
                for (let playlist of data) {
                    newPlaylists.push({
                        ...playlist,
                        editable: false
                    })
                }
                setPlaylists(newPlaylists)

                dispatch({ type: 'change-playlists', payload: data })
            } catch(err) {
                alert('Um erro ocorreu ao carregar suas playlists.')
            }
        }
        run()
    }, [updates])

    useEffect(() => {
        const newPlaylists = []
        for (let playlist of playlistsStore) {
            newPlaylists.push({
                ...playlist,
                editable: false
            })
        }
        setPlaylists(newPlaylists)
    }, [playlistsStore])

    useEffect(() => {
        function contextMenu(evt: MouseEvent) {
            evt.preventDefault()
            setContextMenuCoordinates({
                x: evt.x,
                y: evt.y - 15
            })
        }
        function click() {
            setContextMenu(false)
            setContextMenuCoordinates({
                x: -500,
                y: -500
            })
        }
        function keyDown(evt: KeyboardEvent) {
            if (evt.code === 'Enter') {
                if (nameInput.current) {
                    nameInput.current.blur()
                }
                if (createPlaylistInput.current) {
                    createPlaylistInput.current.blur()
                }
            }
        }
        document.addEventListener('contextmenu', contextMenu)
        document.addEventListener('click', click)
        document.addEventListener('keydown', keyDown)

        return () => {
            document.removeEventListener('contextmenu', contextMenu)
            document.removeEventListener('click', click)
            document.removeEventListener('keydown', keyDown)
        }
    }, [])

    return <Container>
        {contextMenu ? <ContextMenuContainer {...contextMenuCoordinates}>
            <ContextMenuItem onClick={handleRenamePlaylist}>
                <ContextMenuTextContainer>
                    <Edit
                        color="#d9dadc"
                        size={16}
                    />
                    <ContextMenuDivider/>
                    <ContextMenuText>Renomear</ContextMenuText>
                </ContextMenuTextContainer>
            </ContextMenuItem>
            <ContextMenuItem onClick={handleTogglePublic}>
                <ContextMenuTextContainer>
                    {playlists[indexSelected].public ?
                        <Lock
                            color="#d9dadc"
                            size={16}
                        /> :
                        <Globe
                            color="#d9dadc"
                            size={16}
                        />}
                    <ContextMenuDivider/>
                    <ContextMenuText>Deixar {playlists[indexSelected].public ? 'privado' : 'público'}</ContextMenuText>
                </ContextMenuTextContainer>
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDeletePlaylist}>
                <ContextMenuTextContainer>
                    <Trash2
                        color="#d9dadc"
                        size={16}
                    />
                    <ContextMenuDivider/>
                    <ContextMenuText>Excluir</ContextMenuText>
                </ContextMenuTextContainer>
            </ContextMenuItem>
        </ContextMenuContainer> : null}
        {desktop ? <Header /> : null}
        <AppContainer>
            <NavContainer>
                <NavButtonContainer>
                    <NavButton onClick={navigate('') as any}>
                        <Home
                            color={path === '' ? '#4c43df' : '#d9dadc'}
                            size={26}
                        />
                        <NavButtonText selected={path === ''}>
                            Início
                        </NavButtonText>
                    </NavButton>
                    <NavButton onClick={navigate('search') as any}>
                        <Search
                            color={path === '/search' ? '#4c43df' : '#d9dadc'}
                            size={26}
                        />
                        <NavButtonText selected={path === '/search'}>
                            Pesquisar
                        </NavButtonText>
                    </NavButton>
                    <NavButton onClick={navigate('upload') as any}>
                        <Upload
                            color={path === '/upload' ? '#4c43df' : '#d9dadc'}
                            size={26}
                        />
                        <NavButtonText selected={path === '/upload'}>
                            Enviar música
                        </NavButtonText>
                    </NavButton>
                    <NavButton onClick={navigate('my-musics') as any}>
                        <Music
                            color={path === '/my-musics' ? '#4c43df' : '#d9dadc'}
                            size={26}
                        />
                        <NavButtonText selected={path === '/my-musics'}>
                            Minhas músicas
                        </NavButtonText>
                    </NavButton>
                    <NavButton onClick={navigate('me') as any}>
                        <UserIcon
                            color={path === '/me' ? '#4c43df' : '#d9dadc'}
                            size={26}
                        />
                        <NavButtonText selected={path === '/me'}>
                            Usuário
                        </NavButtonText>
                    </NavButton>
                    <NavSubtitleContainer>
                        <NavSubtitle>Minhas playlists</NavSubtitle>
                        <button onClick={() => {
                            setCreatePlaylist(true)
                            setTimeout(() => {
                                if (createPlaylistInput.current) {
                                    createPlaylistInput.current.focus()
                                }
                            }, 1)
                            }}>
                            <PlusCircle
                                size={20}
                                color="#d9dadc"
                            />
                        </button>
                    </NavSubtitleContainer>
                    {playlists.map((playlist, index) => <NavPlaylistItem
                        onClick={handleGoPlaylist(playlist, index) as any}
                        onMouseDown={handleContextMenuPlaylist(index) as any}
                        key={index}>
                        {playlist.musics[0] ? <NavPlaylistImage
                            src={url + '/music-bg/' + playlist.musics[0].music_background}
                        /> : <NavPlaylistImageDiv/>}
                        <NavPlaylistInfoContainer>
                            {playlist.editable ?
                                <NavPlaylistInput
                                    ref={nameInput}
                                    value={playlistName}
                                    onChange={e => setPlaylistName(e.target.value)}
                                    onBlur={renamePlaylist(index) as any}
                                /> :
                                <NavPlaylistName>{playlist.name}</NavPlaylistName>}
                            <NavPlaylistInfo>{playlist.musics.length} Música{playlist.musics.length > 1 ? 's' : ''}</NavPlaylistInfo>
                        </NavPlaylistInfoContainer>
                        {playlist.public ?
                            <Globe
                                size={16}
                                color="#d9dadc"
                            /> :
                            <Lock
                                size={16}
                                color="#d9dadc"
                            />}
                    </NavPlaylistItem>)}
                    {createPlaylist ? <div>
                        <NavPlaylistInput
                            value={createPlaylistName}
                            onChange={e => setCreatePlaylistName(e.target.value)}
                            onBlur={handleCreatePlaylist}
                            ref={createPlaylistInput}
                        />
                    </div> : null}
                </NavButtonContainer>
                {!desktop && (navigator.userAgent.toLowerCase().includes('windows')) ? <DownloadButton target="_blank" href={`${url}/download/pc`}>
                    <Download
                        color="#d9dadc"
                        size={20}
                    />
                    <span>Baixar app</span>
                </DownloadButton> : (!desktop && (navigator.userAgent.toLowerCase().includes('android'))) ? <DownloadButton
                    target="_blank"
                    href={`${url}/download`}
                >
                    <Download
                        color="#d9dadc"
                        size={20}
                    />
                    <span>Baixar app</span>
                </DownloadButton> : null}
            </NavContainer>
            <ContentContainer>
                <Switch>
                    <Route exact path="/app" component={HomePage} />
                    <Route path="/app/genre/:type" component={Genre} />
                    <Route path="/app/music/:id" component={MusicPage} />
                    <Route path="/app/my-musics" component={MyMusics} />
                    <Route path="/app/playlist/:id" component={Playlist} />
                    <Route path="/app/search" component={SearchPage} />
                    <Route path="/app/upload" component={UploadPage} />
                    <Route path="/app/me" component={User} />
                    <Route path="/app" children={<NotFound inserted />} />
                </Switch>
            </ContentContainer>
        </AppContainer>
        {musicIsLoaded ? <AudioController/> : null}
    </Container>
}

export default App