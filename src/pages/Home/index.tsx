import React, { useState, useEffect } from 'react'
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

import api from '../../services/api'
import url from '../../services/url'

function Home(): JSX.Element {

    const dispatch = useDispatch()

    const [musics, setMusics] = useState<Array<Music>>([])

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
                const { data } = await api.get('/music/recents')
                setMusics(data)
            } catch(err) {
                alert('Um erro ocorreu ao carregar as músicas recentes.')
            }
        }
        run()
    }, [])

    return <Container>
        <Title>Músicas recentes</Title>
        <MusicsContainer>
            {musics.map(music => <MusicItem key={music.name_upload} onDoubleClick={playMusic(music) as any}>
                <MusicItemImage
                    src={`${url}/music-bg/${music.music_background}`}
                />
                <MusicItemButton onClick={playMusic(music) as any}>
                    <Play
                        color="#d9dadc"
                        size={20}
                    />
                </MusicItemButton>
                <MusicItemName>{music.name}</MusicItemName>
            </MusicItem>)}
        </MusicsContainer>
    </Container>
}

export default Home