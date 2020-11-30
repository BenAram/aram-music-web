import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    Edit,
    Trash2
} from 'react-feather'

import {
    Container,
    MusicItem,
    MusicInfo,
    MusicImg,
    MusicName
} from './styles'

import ContextMenuMusic from '../../components/ContextMenuMusic'

import api from '../../services/api'
import url from '../../services/url'

const initialState: Music = {
    name: '',
    description: '',
    keywords: [],
    access: 0,
    createdAt: '',
    editable: false,
    id: 0,
    music_background: '',
    name_upload: '',
    type: '',
    user_owner: {
        name: '',
        avatar: ''
    }
}

const initialStateCoordinates: CustomCoordinates = {
    x: -500,
    y: -500
}

function MyMusics(): JSX.Element {

    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const history = useHistory()

    const dispatch = useDispatch()
    const musicIsLoaded = useSelector((store: any) => store.musicIsLoaded)

    const [actualMusic, setActualMusic] = useState<Music>(initialState)
    const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false)
    const [contextMenuCoordinates, setContextMenuCoordinates] = useState<CustomCoordinates>(initialStateCoordinates)

    const [myMusics, setMyMusics] = useState<Array<Music>>([])

    function handleSeeMusic(id: number): Function {
        return function() {
            history.push(`/app/music/${id}`)
        }
    }

    function handleContextMenu(music: Music): Function {
        return function() {
            setActualMusic(music)
            setContextMenuVisible(true)
        }
    }

    function handleDeleteMusic(name_upload: string, index: number): Function {
        return async function() {
            try {
                const { data } = await api.delete('/audio', {
                    headers: {
                        name_upload,
                        email,
                        token
                    }
                })
                if (data.error) {
                    alert(data.message)
                } else {
                    alert('Música deletada com sucesso.')
                    dispatch({ type: 'update' })
                    const newMyMusics = [...myMusics]
                    newMyMusics.splice(index, 1)
                    setMyMusics(newMyMusics)
                }
            } catch(err) {
                alert('Ocorreu um erro ao deletar a música.')
            }
        }
    }

    useEffect(() => {
        async function run() {
            try {
                const { data } = await api.get('/music/my', {
                    headers: {
                        email,
                        token
                    }
                })
                setMyMusics(data)
            } catch(err) {
                alert('Um erro ocorreu.')
            }
        }
        run()
        function contextMenu(evt: MouseEvent) {
            setContextMenuCoordinates({
                x: evt.x,
                y: evt.y >= (window.innerHeight - 120) ? evt.y - 120 : evt.y
            })
        }
        function click() {
            setContextMenuCoordinates({
                x: -500,
                y: -500
            })
            setContextMenuVisible(false)
        }
        document.addEventListener('contextmenu', contextMenu)
        document.addEventListener('click', click)
        return () => {
            document.removeEventListener('contextmenu', contextMenu)
            document.removeEventListener('click', click)
        }
    }, [])

    return <Container shrink={musicIsLoaded}>
        <ContextMenuMusic
            visible={contextMenuVisible}
            x={contextMenuCoordinates.x}
            y={contextMenuCoordinates.y}
            music={actualMusic}
        />
        {myMusics.map((myMusic, index) => <MusicItem
            onMouseDown={handleContextMenu(myMusic) as any}
            key={myMusic.name_upload}>
            <MusicInfo
                onClick={handleSeeMusic(myMusic.id) as any}
            >
                <MusicImg
                    src={`${url}/music-bg/${myMusic.music_background}`}
                />
                <div>
                    <MusicName>{myMusic.name}</MusicName>
                    <MusicName><strong>Acessos: </strong>{myMusic.access}</MusicName>
                </div>
            </MusicInfo>
            <div>
                <Edit
                    onClick={handleSeeMusic(myMusic.id) as any}
                    size={20}
                    color="#d9dadc"
                />
                <Trash2
                    onClick={handleDeleteMusic(myMusic.name_upload, index) as any}
                    size={20}
                    color="#d9dadc"
                />
            </div>
        </MusicItem>)}
    </Container>
}

export default MyMusics