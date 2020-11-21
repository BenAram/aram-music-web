import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    ArrowLeft,
    Play,
    Minus
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
    InfoMusics,
    PlayButton,
    MusicsContainer,
    MusicItem,
    MusicConfig,
    MusicImage,
    MusicDrag
} from './styles'

import url from '../../services/url'

import logo from '../../images/logo.png'

function Playlist(): JSX.Element {

    const history = useHistory()

    const dispatch = useDispatch()
    const playlist: PlaylistToSee = useSelector((store: any) => store.playlistToSee)

    function handleGoBack(): void {
        history.goBack()
    }

    function handlePlayPlaylist(playlist: PlaylistToSee): Function {
        return function() {
            dispatch({ type: 'disactive-music-is-loaded' })
            setTimeout(() => {
                dispatch({ type: 'rename-playlist', payload: playlist.name })
                dispatch({ type: 'change-playlist', payload: playlist.musics })
                dispatch({ type: 'active-playlist' })
                dispatch({ type: 'active-music-is-loaded' })
            }, 1)
        }
    }

    function handlePlayMusic(music: Music): Function {
        return function() {
            dispatch({ type: 'disactive-music-is-loaded' })
            setTimeout(() => {
                dispatch({ type: 'change-music', payload: music })
                dispatch({ type: 'active-music-is-loaded' })
            }, 1)
        }
    }

    return <Container>
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
                    hasImage={!!playlist.musics[0]}
                    src={playlist.musics[0] ? `${url}/music-bg/${playlist.musics[0].music_background}` : logo}
                />
                <InfoMusicContainer>
                    <InfoName>{playlist.name}</InfoName>
                    <InfoMusics>{playlist.musics.length} Música{playlist.musics.length < 2 ? '' : 's'}</InfoMusics>
                    <InfoMusics>Feita por: {playlist.owner}</InfoMusics>
                </InfoMusicContainer>
            </InfoContainer>
            {playlist.musics.length > 0 ? <PlayButton onClick={handlePlayPlaylist(playlist) as any}>
                <Play
                    color="#d9dadc"
                    size={26}
                />
            </PlayButton> : null}
        </PlayerContainer>
        <MusicsContainer>
            {playlist.musics.map((music, index) => <MusicItem
                key={index}
                onDoubleClick={handlePlayMusic(music) as any}
            >
                <MusicConfig>
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
                    {playlist.editable ? <button>
                        <Minus
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