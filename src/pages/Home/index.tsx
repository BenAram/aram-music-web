import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Play
} from 'react-feather'
import { useDispatch } from 'react-redux'

import {
    Container,
    Title,
    MusicsContainer,
    MusicItem,
    MusicItemImage,
    MusicItemButton,
    MusicItemName
} from './styles'

import ContextMenuMusic from '../../components/ContextMenuMusic'

import api from '../../services/api'
import url from '../../services/url'

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

function Home(): JSX.Element {

    const dispatch = useDispatch()

    const history = useHistory()

    const [musics, setMusics] = useState<Array<Music>>([])

    const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false)
    const [contextMenuCoordinates, setContextMenuCoordinates] = useState<CustomCoordinates>({
        x: 0,
        y: 0
    })
    const [actualMusic, setActualMusic] = useState<Music>(initialState)

    function handleSeeMusic(id: number): Function {
        return function() {
            history.push(`/app/music/${id}`)
        }
    }

    function handleMouseDown(music: Music): Function {
        return function(evt: MouseEvent) {
            if (evt.button === 2) {
                setContextMenuVisible(true)
                setActualMusic(music)
            }
        }
    }

    function playMusic(music: Music): Function {
        return function() {
            dispatch({ type: 'disactive-music-is-loaded' })
            setTimeout(() => {
                dispatch({ type: 'change-music', payload: music })
                dispatch({ type: 'active-music-is-loaded' })
            }, 1)
        }
    }

    useEffect(() => {
        async function run() {
            try {
                function sortMusic(music1: Music, music2: Music): number {
                    if (music1.access > music2.access) {
                        return -1
                    }
                    if (music1.access < music2.access) {
                        return 1
                    }
                    if (music1.access === music2.access) {
                        return 0
                    }
                    return 0
                }

                const { data } = await api.get('/music/recents')
                if (!data.error) {
                    const divider = data.length / 5

                    let musics1: Array<Music> = data.slice(0, divider)
                    let musics2: Array<Music> = data.slice(divider, divider * 2)
                    let musics3: Array<Music> = data.slice(divider * 2, divider * 3)
                    let musics4: Array<Music> = data.slice(divider * 3, divider * 4)
                    let musics5: Array<Music> = data.slice(divider * 4, data.length)

                    musics1 = musics1.sort(sortMusic)
                    musics2 = musics2.sort(sortMusic)
                    musics3 = musics3.sort(sortMusic)
                    musics4 = musics4.sort(sortMusic)
                    musics5 = musics5.sort(sortMusic)

                    setMusics([...musics1, ...musics2, ...musics3, ...musics4, ...musics5])
                }
            } catch(err) {
                alert('Um erro ocorreu ao carregar as músicas recentes.')
            }
        }
        run()
    }, [])

    useEffect(() => {
        function click() {
            setContextMenuVisible(false)
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
        return () => {
            document.removeEventListener('click', click)
            document.removeEventListener('contextmenu', contextMenu)
        }
    }, [])

    return <Container>
        <ContextMenuMusic
            visible={contextMenuVisible}
            x={contextMenuCoordinates.x}
            y={contextMenuCoordinates.y}
            music={actualMusic}
        />
        <Title>Músicas recentes</Title>
        <MusicsContainer>
            {musics.map(music => <MusicItem
                onMouseDown={handleMouseDown(music) as any}
                key={music.name_upload}
                onDoubleClick={playMusic(music) as any}>
                <MusicItemImage
                    onClick={handleSeeMusic(music.id) as any}
                    src={`${url}/music-bg/${music.music_background}`}
                />
                <MusicItemButton onClick={playMusic(music) as any}>
                    <Play
                        color="#d9dadc"
                        size={20}
                    />
                </MusicItemButton>
                    <MusicItemName onClick={handleSeeMusic(music.id) as any}>{music.name}</MusicItemName>
                    <MusicItemName onClick={handleSeeMusic(music.id) as any}>
                        <strong>Acessos:{' '}</strong>
                        {music.access}
                    </MusicItemName>
            </MusicItem>)}
        </MusicsContainer>
    </Container>
}

export default Home