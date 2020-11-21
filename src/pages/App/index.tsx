import React, { useState, useEffect } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import {
    Home,
    Search,
    Upload,
    Music,
    User as UserIcon,
    Download,
    PlusCircle
} from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'

import AudioController from '../../components/AudioController'
import Header from '../../components/Header'

import HomePage from '../Home'
import MyMusics from '../MyMusics'
import Playlist from '../Playlist'
import SearchPage from '../Search'
import User from '../User'

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
    NavPlaylistName,
    NavPlaylistInfo,
    DownloadButton,
    ContentContainer
} from './styles'

import api from '../../services/api'
import url from '../../services/url'

const DivTest: React.FC = () => <div style={{ width: '100%', height: '100%', backgroundColor: '#616060' }} />
function App(): JSX.Element {

    const { desktop } = window as any
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const updates = useSelector((store: any) => store.playlist.updates)
    const musicIsLoaded = useSelector((store: any) => store.musicIsLoaded)

    const [name, setName] = useState<string>('')
    const [playlists, setPlaylists] = useState<Array<Playlist>>([])

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

    function handleGoPlaylist(playlist: Playlist): Function {
        return function() {
            dispatch({ type: 'change-playlist-to-see', payload: playlist.musics })
            dispatch({ type: 'active-playlist-editable' })
            dispatch({ type: 'rename-playlist-to-see', payload: playlist.name })
            dispatch({ type: 'rename-playlist-to-see-owner', payload: name })
            history.push('/app/playlist')
        }
    }

    useEffect(() => {
        async function run() {
            try {
                const email = localStorage.getItem('email')
                const token = localStorage.getItem('token')
                const { data } = await api.get('/playlists', {
                    headers: {
                        email,
                        token
                    }
                })
                const { data: user } = await api.get('/user', {
                    headers: {
                        email,
                        token
                    }
                })
                setName(user.name)
                setPlaylists(data)
            } catch(err) {
                alert('Um erro ocorreu ao carregar suas playlists.')
            }
        }

        const email = localStorage.getItem('email')
        const token = localStorage.getItem('token')
        if (!email || !token) {
            history.push('/')
        }
        run()
    }, [history, updates])

    return <Container>
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
                    <NavButton onClick={navigate('user') as any}>
                        <UserIcon
                            color={path === '/user' ? '#4c43df' : '#d9dadc'}
                            size={26}
                        />
                        <NavButtonText selected={path === '/user'}>
                            Usuário
                        </NavButtonText>
                    </NavButton>
                    <NavSubtitleContainer>
                        <NavSubtitle>Minhas playlists</NavSubtitle>
                        <button>
                            <PlusCircle
                                size={20}
                                color="#d9dadc"
                            />
                        </button>
                    </NavSubtitleContainer>
                    {playlists.map((playlist, index) => <NavPlaylistItem onClick={handleGoPlaylist(playlist) as any} key={index}>
                        {playlist.musics[0] ? <NavPlaylistImage
                            src={url + '/music-bg/' + playlist.musics[0].music_background}
                        /> : <NavPlaylistImageDiv/>}
                        <NavPlaylistInfoContainer>
                            <NavPlaylistName>{playlist.name}</NavPlaylistName>
                            <NavPlaylistInfo>{playlist.musics.length} Música{playlist.musics.length > 1 ? 's' : ''}</NavPlaylistInfo>
                        </NavPlaylistInfoContainer>
                    </NavPlaylistItem>)}
                </NavButtonContainer>
                {!desktop ? <DownloadButton target="_blank" href={`${url}/download/pc`}>
                    <Download
                        color="#d9dadc"
                        size={20}
                    />
                    <span>Baixar app</span>
                </DownloadButton> : null}
            </NavContainer>
            <ContentContainer>
                <Route exact path="/app" component={HomePage} />
                <Route path="/app/my-musics" component={MyMusics} />
                <Route path="/app/playlist" component={Playlist} />
                <Route path="/app/search" component={SearchPage} />
                <Route path="/app/upload" component={DivTest} />
                <Route path="/app/user" component={User} />
            </ContentContainer>
        </AppContainer>
        {musicIsLoaded ? <AudioController/> : null}
    </Container>
}

export default App