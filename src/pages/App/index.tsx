import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import {
    Edit,
    Globe,
    Lock,
    Home,
    MessageCircle,
    Search,
    Upload,
    Music,
    User as UserIcon,
    Trash2,
    Download,
    PlusCircle,
    Smartphone
} from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import io, { Socket } from 'socket.io-client'

import AudioController from '../../components/AudioController'
import Header from '../../components/Header'
import {
    ContextMenuContainer,
    ContextMenuItem,
    ContextMenuTextContainer,
    ContextMenuDivider,
    ContextMenuText
} from '../../components/ContextMenu'

import Chat from '../Chat'
import Genre from '../Genre'
import HomePage from '../Home'
import MusicPage from '../Music'
import MyMusics from '../MyMusics'
import Playlist from '../Playlist'
import SearchPage from '../Search'
import Me from '../Me'
import UploadPage from '../Upload'
import User from '../User'
import NotFound from '../NotFound'

import {
    Container,
    AppContainer,
    AppSelector,
    AppSelectorButton,
    NavContainer,
    NavButtonContainer,
    NavButton,
    NavButtonText,
    NavSubtitleContainer,
    NavSubtitle,
    NavPlaylistContainer,
    NavPlaylistItem,
    NavPlaylistImage,
    NavPlaylistImageDiv,
    NavPlaylistInfoContainer,
    NavPlaylistInput,
    NavPlaylistName,
    NavPlaylistInfo,
    DownloadButton,
    ContentContainer,
    NoFriendContainer,
    NoFriendImage,
    NoFriendText,
    FriendsContainer,
    FriendsButtonContainer,
    FriendButton,
    FriendAvatarContainer,
    FriendAvatarImage,
    FriendStatusContainer,
    FriendStatus,
    FriendNameContainer,
    FriendNameText,
    FriendMessageText,
    Divider,
    Text
} from './styles'

import api from '../../services/api'
import url from '../../services/url'

import logo from '../../images/logo.png'

interface AppSelector {
    mode: 'conversation' | 'music'
    path: string
}

interface UserMessage {
    name: string
    avatar: string
    id: number
    online: boolean
    type: string
}

interface Message {
    date: string
    from: number
    content: string
    seen: boolean
    id: number
}

interface Friendship {
    id: number
    from: UserMessage
    to: UserMessage
    accepted: boolean
    messages: Array<Message>
}

interface MessagesNotSeen {
    [index: number]: Array<Message>
}

interface UserConfig {
    notifications: boolean
    id: number
}

interface UsersConfig {
    [index: number]: UserConfig
}

const initialState: UserMessage = {
    name: '',
    avatar: '',
    id: 0,
    online: true,
    type: 'computer'
}

const initialStateFriendship: Friendship = {
    accepted: true,
    from: {
        avatar: '',
        id: 0,
        name: '',
        online: true,
        type: 'android'
    },
    id: 0,
    messages: [],
    to: {
        avatar: '',
        id: 0,
        name: '',
        online: true,
        type: 'android'
    }
}

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

    const [socket, setSocket] = useState<typeof Socket>()

    const [me, setMe] = useState<UserMessage>(initialState)
    const [friendships, setFriendships] = useState<Array<Friendship>>([])
    const [myRequests, setMyRequests] = useState<Array<Friendship>>([])
    const [friendsRequests, setFriendsRequests] = useState<Array<Friendship>>([])
    const [messagesNotSeen, setMessagesNotSeen] = useState<MessagesNotSeen>({})
    const [openedChat, setOpenedChat] = useState<boolean>(false)
    const [openedChatFriendship, setOpenedChatFriendship] = useState<Friendship>(initialStateFriendship)

    const [appSelection, setAppSelection] = useState<AppSelector>({
        mode: 'music',
        path: ''
    })

    const path = location.pathname.replace('/app', '')

    function selectApp(newMode: string): Function {
        return function(): void {
            if (appSelection.mode === newMode) {
                return
            }
            const { pathname } = location
            switch (newMode) {
                case 'music':
                    if (appSelection.path === '') {
                        history.push('/app')
                    } else {
                        history.push(appSelection.path)
                    }
                    setAppSelection({
                        mode: 'music',
                        path: pathname
                    })
                    break
                case 'conversation':
                    if (appSelection.path === '') {
                        history.push('/app/friendship')
                    } else {
                        history.push(appSelection.path)
                    }
                    setAppSelection({
                        mode: 'conversation',
                        path: pathname
                    })
                    break
            }
        }
    }

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

    function handleOpenFriendship() {
        setOpenedChat(false)
    }

    function handleOpenChat(friendship: Friendship){
        setOpenedChat(true)
        setOpenedChatFriendship(friendship)

        const index = friendships.findIndex(myFriendship => myFriendship.id === friendship.id)
        const newFriendships = [...friendships]

        const newUnseenMessages = {...messagesNotSeen}
        newFriendships[index].messages.map(async (message, messageIndex) => {
            if (!message.seen) {
                try {
                    const { data } = await api.get(`/friends/message/see/${friendship.id}/${message.id}`, {
                        headers: {
                            email,
                            token
                        }
                    })
                    if (data.error) {
                        alert(data.message)
                    } else {
                        newFriendships[index].messages[messageIndex].seen = true

                        const unseenMessageIndex = messagesNotSeen[friendship.id * 1].indexOf(message)
                        newUnseenMessages[friendship.id * 1].splice(unseenMessageIndex, 1)
                    }
                } catch(err) {
                    alert('Um erro ocorreu ao vistar a mensagem')
                }
            }
        })

        setFriendships(newFriendships)
        setMessagesNotSeen(newUnseenMessages)
    }

    useEffect(() => {
        if (path.startsWith('/friendship')) {
            const newAppSelection = {...appSelection}
            newAppSelection.mode = 'conversation'
            setAppSelection(newAppSelection)
        }
    }, [])

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
        function newMyRequest(friendship: Friendship) {
            setMyRequests([...myRequests, friendship])
        }
        function newFriendRequest(friendship: Friendship) {
            setFriendsRequests([...friendsRequests, friendship])
        }
        function friendAccepted(friendship: Friendship) {
            const newMessagesNotSeen = {...messagesNotSeen}
            newMessagesNotSeen[friendship.id * 1] = []
            setMessagesNotSeen(newMessagesNotSeen)

            setFriendships([...friendships, friendship])
        }
        function message(message: Message, id: number) {
            async function run() {
                try {
                    const index = friendships.findIndex(friendship => friendship.id === id * 1)
                    const newFriendships = [...friendships]
                    if (openedChatFriendship?.id == id && message.from !== me.id) {
                        await api.get(`/friends/message/see/${id}/${message.id}`, {
                            headers: {
                                email,
                                token
                            }
                        })
                        newFriendships[index].messages.push({...message, seen: true})
                    } else if (message.from !== me.id) {
                        newFriendships[index].messages.push(message)
    
                        const newUnseenMessages = {...messagesNotSeen}
                        newUnseenMessages[id * 1].push(message)
                        setMessagesNotSeen(newUnseenMessages)
    
                        let name: string
                        if (message.from === friendships[index].from.id) {
                            name = friendships[index].from.name
                        } else {
                            name = friendships[index].to.name
                        }
                        const usersConfigJSON = localStorage.getItem('users-config')
                        let usersConfig: UsersConfig = {}
                        usersConfig[message.from] = {
                            id: message.from,
                            notifications: true
                        }
                        if (usersConfigJSON) {
                            usersConfig = JSON.parse(usersConfigJSON)
                        }
                        if (usersConfig[message.from]) {
                            if (usersConfig[message.from].notifications) {
                                // presentNotificationAsync({
                                //     title: 'Nova mensagem!',
                                //     body: `${name}: ${message.content}`,
                                //     data: {
                                //         id,
                                //         messageId: message.id,
                                //         type: 'chat'
                                //     },
                                //     sound: false,
                                //     vibrate: [200]
                                // })
                            }
                        } else {
                            usersConfig[message.from] = {
                                id: message.from,
                                notifications: true
                            }
                            // await AsyncStorage.setItem('users-config', JSON.stringify(usersConfig))
                            // presentNotificationAsync({
                            //     title: 'Nova mensagem!',
                            //     body: `${name}: ${message.content}`,
                            //     data: {
                            //         id,
                            //         messageId: message.id,
                            //         type: 'chat'
                            //     },
                            //     sound: false,
                            //     vibrate: [200]
                            // })
                        }
                    } else {
                        newFriendships[index].messages.push(message)
                    }
                    setFriendships(newFriendships)
                } catch(err) {
                    alert('Um erro ocorreu')
                }
            }
            run()
        }
        function messageDeleted(messageId: number, id: number) {
            const newFriendships = [...friendships]
            const friendship = newFriendships.find(friendship => friendship.id == id)
            
            const index = friendship?.messages.findIndex(message => message.id == messageId)
            if (index !== -1 && index !== undefined) {
                friendship?.messages.splice(index, 1)
                setFriendships(newFriendships)
            }
        }
        function newName(id: number, newName:  string) {
            const newFriendships = [...friendships]

            const index1 = newFriendships.findIndex(friendship => friendship.from.id == id)
            const index2 = newFriendships.findIndex(friendship => friendship.to.id == id)

            if (index1 !== -1) {
                newFriendships[index1].from.name = newName
            }
            if (index2 !== -1) {
                newFriendships[index2].to.name = newName
            }

            setFriendships(newFriendships)
        }
        function newAvatar(id: number, avatar: string) {
            const newFriendships = [...friendships]

            const index1 = newFriendships.findIndex(friendship => friendship.from.id == id)
            const index2 = newFriendships.findIndex(friendship => friendship.to.id == id)

            if (index1 !== -1) {
                newFriendships[index1].from.avatar = avatar
            }
            if (index2 !== -1) {
                newFriendships[index2].to.name = avatar
            }

            setFriendships(newFriendships)
        }
        function userConnected(id: number) {
            if (openedChatFriendship?.from.id === id || openedChatFriendship?.to.id === id) {
                const newFriendship = openedChatFriendship
                if (newFriendship.from.id === me.id) {
                    newFriendship.to.online = true
                } else {
                    newFriendship.from.online = true
                }
                setOpenedChatFriendship(newFriendship)
            }
            const newFriendships = [...friendships]
            newFriendships.map(friendship => {
                if (friendship.from.id === id) {
                    friendship.from.online = true
                }
                if (friendship.to.id === id) {
                    friendship.to.online = true
                }
            })
            setFriendships(newFriendships)
        }
        function userDisconnected(id: number) {
            if (openedChatFriendship?.from.id === id || openedChatFriendship?.to.id === id) {
                const newFriendship = openedChatFriendship
                if (newFriendship.from.id === me.id) {
                    newFriendship.to.online = false
                } else {
                    newFriendship.from.online = false
                }
                setOpenedChatFriendship(newFriendship)
            }
            const newFriendships = [...friendships]
            newFriendships.map(friendship => {
                if (friendship.from.id === id) {
                    friendship.from.online = false
                }
                if (friendship.to.id === id) {
                    friendship.to.online = false
                }
            })
            setFriendships(newFriendships)
        }
        function userDeleted(id: number) {
            const newFriendships = [...friendships]

            const index = newFriendships.findIndex(friendship => (friendship.from.id == id || friendship.to.id == id))
            if (index === -1) {
                const newFriendsRequests = [...friendsRequests]
                const index = newFriendsRequests.findIndex(friendship => friendship.from.id == id)
                if (index === -1) {
                    const newMyRequests = [...myRequests]
                    const index = newMyRequests.findIndex(friendship => friendship.to.id == id)
                    if (index === -1) {
                        return
                    }
                    newMyRequests.splice(index, 1)
                    setMyRequests(newMyRequests)
                }
                newFriendsRequests.splice(index, 1)
                setFriendsRequests(newFriendsRequests)
            }
            if (openedChatFriendship === friendships[index]) {
                setOpenedChat(false)
                setOpenedChatFriendship(initialStateFriendship)
            }

            newFriendships.splice(index, 1)
            setFriendships(newFriendships)
        }
        function friendDeleted(id: number, type: string) {
            switch (type) {
                case 'friendship':
                    const newFriendships = [...friendships]
                    const index = newFriendships.findIndex(friendship => friendship.id == id)
                    if (index === -1) {
                        return
                    }
                    newFriendships.splice(index, 1)
                    return
                case 'request':
                    const newFriendsRequests = [...friendsRequests]
                    const index2 = newFriendsRequests.findIndex(friendship => friendship.id == id)
                    if (index2 === -1) {
                        return
                    }
                    newFriendsRequests.splice(index2, 1)
                    setFriendsRequests(newFriendsRequests)
                    return
                case 'my-request':
                    const newMyRequests = [...myRequests]
                    const index3 = newMyRequests.findIndex(friendship => friendship.id == id)
                    if (index3 === -1) {
                        return
                    }
                    newMyRequests.splice(index3, 1)
                    setMyRequests(newMyRequests)
                    return
                default:
                    return
            }
        }

        if (socket) {
            socket.removeAllListeners()

            setTimeout(() => {
                socket.on('new-my-request', newMyRequest)
                socket.on('new-friend-request', newFriendRequest)
                socket.on('friend-accepted', friendAccepted)
                socket.on('message', message)
                socket.on('message-deleted', messageDeleted)
                socket.on('new-name', newName)
                socket.on('new-avatar', newAvatar)
                socket.on('user-connected', userConnected)
                socket.on('user-disconnected', userDisconnected)
                socket.on('user-deleted', userDeleted)
                socket.on('friend-deleted', friendDeleted)
            }, 1)
        }
    }, [socket,  friendships, myRequests, friendsRequests, openedChatFriendship, messagesNotSeen])

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

        async function run() {
            try {
                const { data: me } = await api.get('/user', {
                    headers: {
                        email,
                        token
                    }
                })
                if (me.error) {
                    alert(me.message)
                } else {
                    setMe(me)
                }

                const { data: newMessages } = await api.get('/friends/messages', {
                    headers: {
                        email,
                        token
                    }
                })

                if (newMessages.error) {
                    alert(newMessages.message)
                } else {
                    setFriendships(newMessages)
                    const newMessagesNotSeen: MessagesNotSeen = {...messagesNotSeen}
                    newMessages.map((friendship: Friendship) => {
                        newMessagesNotSeen[friendship.id * 1] = friendship.messages.filter(message => !message.seen && message.from !== me.id)
                    })
                    setMessagesNotSeen(newMessagesNotSeen)
                }

                const { data: newFriendsRequests } = await api.get('/friends/requests', {
                    headers: {
                        email,
                        token
                    }
                })
                setFriendsRequests(newFriendsRequests.requests)
                setMyRequests(newFriendsRequests.myRequests)

                setSocket(io(url, {
                    transportOptions: {
                        polling: {
                            extraHeaders: {
                                email,
                                token,
                                type: 'computer'
                            }
                        }
                    }
                }))
            } catch(err) {
                alert('Um erro ocorreu ao carregar suas amizades.')
            }
        }

        run()

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
            <AppSelector>
                <AppSelectorButton
                    style={{
                        backgroundColor: appSelection.mode === 'music' ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                    }}
                    onClick={selectApp('music') as any}
                >
                    <Music
                        color={appSelection.mode === 'music' ? '#d9dadc' : 'rgba(255, 255, 255, 0.5)'}
                        size={26}
                    />
                </AppSelectorButton>
                <AppSelectorButton
                    style={{
                        backgroundColor: appSelection.mode === 'conversation' ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                    }}
                    onClick={selectApp('conversation') as any}
                >
                    <MessageCircle
                        color={appSelection.mode === 'conversation' ? '#d9dadc' : 'rgba(255, 255, 255, 0.5)'}
                        size={26}
                    />
                </AppSelectorButton>
            </AppSelector>
            {appSelection.mode === 'music' ? <Fragment>
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
                        <NavPlaylistContainer>
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
                        </NavPlaylistContainer>
                        {createPlaylist ? <div>
                            <NavPlaylistInput
                                value={createPlaylistName}
                                onChange={e => setCreatePlaylistName(e.target.value)}
                                onBlur={handleCreatePlaylist}
                                ref={createPlaylistInput}
                            />
                        </div> : null}
                    </NavButtonContainer>
                    {/* {!desktop && (navigator.userAgent.toLowerCase().includes('windows')) ? <DownloadButton target="_blank" href={`${url}/download/pc`}>
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
                    </DownloadButton> : null} */}
                </NavContainer>
                <ContentContainer>
                    <Switch>
                        <Route exact path="/app" component={HomePage} />
                        <Route path="/app/genre/:type" component={Genre} />
                        <Route path="/app/music/:id" component={MusicPage} />
                        <Route path="/app/my-musics" component={MyMusics} />
                        <Route path="/app/playlist/:id" component={Playlist} />
                        <Route path="/app/user/:id" component={User} />
                        <Route path="/app/search" component={SearchPage} />
                        <Route path="/app/upload" component={UploadPage} />
                        <Route path="/app/me" component={Me} />
                        <Route path="/app/" children={<NotFound inserted />} />
                    </Switch>
                </ContentContainer>
            </Fragment> : null}
            {appSelection.mode === 'conversation' ? <Fragment>
            <NavContainer>
                <FriendsContainer>
                    <UserIcon
                        color="#d9dadc"
                        size={20}
                    />
                    <Text>Amigos</Text>
                </FriendsContainer>
                <Divider/>
                <FriendsButtonContainer loaded={musicIsLoaded}>
                    {friendships.length === 0 ? <NoFriendContainer>
                        <NoFriendImage src={logo} />
                        <NoFriendText>Parece que você não tem amigos, que tal adicioná-los?</NoFriendText>
                    </NoFriendContainer> : null}
                    {friendships.sort((friendship1, friendship2) => {
                        if (!friendship1.messages[0]) {
                            return -1
                        }
                        if (!friendship2.messages[0]) {
                            return 1
                        }
            
                        const time1 = new Date(friendship1.messages[friendship1.messages.length - 1].date).getTime()
                        const time2 = new Date(friendship2.messages[friendship2.messages.length - 1].date).getTime()
            
                        if (time1 > time2) {
                            return -1
                        }
                        if (time1 < time2) {
                            return 1
                        }
                        if (time1 === time2) {
                            return 0
                        }
                        return 0
                    }).map(friendship => {
                        let actualAvatar: any
                        let actualUser: UserMessage
                        let actualMessage: Message | null = null
                        if (friendship.from.id === me.id) {
                            actualUser = friendship.to
                        } else {
                            actualUser = friendship.from
                        }
                        if (actualUser.avatar) {
                            actualAvatar = `${url}/avatar/${actualUser.avatar}`
                        }
                        if (friendship.messages[0]) {
                            actualMessage = friendship.messages[friendship.messages.length - 1]
                        }

                        return <FriendButton
                            key={friendship.id}
                            onClick={() => handleOpenChat(friendship)}
                        >
                            <FriendAvatarContainer>
                                <FriendAvatarImage
                                    src={actualAvatar ? actualAvatar : logo}
                                />
                                <FriendStatusContainer>
                                    {actualUser.online ? actualUser.type === 'android' ? 
                                        <Smartphone
                                            size={10}
                                            color="#28a745"
                                        /> : 
                                        <FriendStatus online/> : <FriendStatus/>}
                                </FriendStatusContainer>
                            </FriendAvatarContainer>
                            <FriendNameContainer>
                            <FriendNameText>{actualUser.name}</FriendNameText>
                            <FriendMessageText>{actualMessage ? actualMessage.content : null}</FriendMessageText>
                        </FriendNameContainer>
                        </FriendButton>
                    })}
                </FriendsButtonContainer>
            </NavContainer>
            <ContentContainer>
                {openedChat ? <Chat friendship={openedChatFriendship} me={me} /> : <div/>}
            </ContentContainer>
            </Fragment> : null}
            </AppContainer>
        {musicIsLoaded ? <AudioController/> : null}
    </Container>
}

export default App