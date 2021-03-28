import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from 'react-input-slider'
import {
    Rewind,
    SkipBack,
    PlayCircle,
    PauseCircle,
    SkipForward,
    FastForward,
    Repeat,

    Volume,
    Volume1,
    Volume2,
    VolumeX,

    X
} from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'

import {
    Container,
    MusicInfoContainer,
    MusicInfoImage,
    MusicNameContainer,
    MusicName,
    MusicAuthor,
    MusicControllerContainer,
    PlaylistName,
    MusicControllerButtonsContainer,
    MusicTimeContainer,
    MusicTimeSpan,
    MusicTimeSliderContainer,
    MusicTimeSliderSpan,
    ControllerContainer,
    ControllerButton
} from './styles'

import api from '../../services/api'
import url from '../../services/url'

const initialState: Music = {
    access: 0,
    createdAt: '',
    description: '',
    editable: false,
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
    }
}

function AudioController(): JSX.Element {

    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const audio = useSelector((store: any) => store.audio)
    const music: Music = useSelector((store: any) => store.music)
    const playlist: StoreStatePlaylist = useSelector((store: any) => store.playlist)
    const dispatch = useDispatch()

    const history = useHistory()

    const [volume, setVolume] = useState<number>(0)
    const [paused, setPaused] = useState<boolean>(false)
    const [looping, setLooping] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    function handleSeeMusic() {
        if (playlist.isPlaylist) {
            history.push(`/app/music/${playlist.musics[playlist.index].id}`)
        } else {
            history.push(`/app/music/${music.id}`)
        }
    }

    function handleRewind(): void {
        if (playlist.isPlaylist) {
            goBackMusic()
        } else {
            audio.currentTime = 0
        }
    }

    function handleSkipBack(): void {
        audio.currentTime -= 10
    }

    function handleToggleAudio(): void {
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
        setPaused(!paused)
    }

    function handleAdvance(): void {
        audio.currentTime += 10
    }

    function handleSkip(): void {
        if (playlist.isPlaylist && !looping) {
            goNextMusic()
        } else {
            audio.currentTime = audio.duration
        }
    }

    function handleToggleRepeat(): void {
        audio.loop = !audio.loop
        setLooping(!looping)
    }

    function handleTimeSlider(params: any) {
        const x: number = params.x
        setCurrentTime(x)
        audio.currentTime = x
    }

    function handleVolumeSlider(params: any) {
        const x: number = params.x
        setVolume(x)
        audio.volume = x
        localStorage.setItem('volume', `${x}`)
    }

    function handleCloseController(): void {
        dispatch({ type: 'clean-audio' })
        dispatch({ type: 'clean-playlist' })
        dispatch({ type: 'clean-music-is-loaded' })
    }

    
    function treatTime(timeInSeconds: number): string {
        const time: number = Math.floor(timeInSeconds)
        const minutes: number = Math.floor(time / 60)
        const minutesInSeconds: number = minutes * 60
        const seconds: number = time - minutesInSeconds
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    function getVolumeIcon(){
        const config = {
            color: "#d9dadc",
            size: 25
        }

        if (volume <= 0) {
            return <VolumeX {...config} />
        }
        if (volume <= 0.5) {
            return <Volume1 {...config} />
        }
        if (volume > 0.5) {
            return <Volume2 {...config} />
        }

        return <Volume {...config} />
    }

    function goBackMusic() {
        const { index } = playlist
        if (index - 1 < 0) {
            audio.currentTime = 0
        } else {
            dispatch({ type: 'down-playlist' })
        }
    }

    function goNextMusic() {
        const { index } = playlist
        if (index + 1 >= playlist.musics.length) {
            const musicsJSON = sessionStorage.getItem('musics')
            if (musicsJSON) {
                const musics = JSON.parse(musicsJSON)
                async function getMusic(){
                    try {
                        let index: number = 0
                        if (musics[index]) {
                            const { data } = await api.get(`/music/${musics[index]}`)
                            if (!data.error) {
                                dispatch({ type: 'disactive-playlist' })
                                dispatch({ type: 'change-music', payload: data })
                                musics.splice(index, 1)
                                sessionStorage.setItem('musics', JSON.stringify(musics))
                            } else {
                                index++
                                getMusic()
                            }
                        }
                    } catch(err) {
                        alert('Ocorreu um erro')
                    }
                }
                getMusic()
            } else {
                setPaused(true)
            }
        } else {
            dispatch({ type: 'up-playlist' })
        }
    }


    const listeners = {
        updateTime(){
            setCurrentTime(audio.currentTime)
        },
        loadedMetaData(){
            audio.currentTime = 0
            audio.play()
            setPaused(false)
            setCurrentTime(audio.currentTime)
            setDuration(audio.duration)
            setLooping(false)
        },
        ended() {
            const musicsJSON = sessionStorage.getItem('musics')
            
            let index: number = 0

            let musics: Array<string> = []
            if (musicsJSON) {
                musics = JSON.parse(musicsJSON)
            }
            if (musics[index]) {
                try {
                    async function getMusic() {
                        if (musics[index]) {
                            const { data } = await api.get(`/music/${musics[index]}`)
                            if (!data.error) {
                                dispatch({ type: 'change-music', payload: data })
                                musics.splice(index, 1)
                                sessionStorage.setItem('musics', JSON.stringify(musics))
                            } else {
                                index++
                                getMusic()
                            }
                        }
                    }
                    getMusic()
                } catch(err) {
                    alert('Ocorreu um erro')
                }
            } else {
                setPaused(true)
            }
        }
    }

    useEffect(() => {
        if (!playlist.isPlaylist) {
            audio.pause()
            dispatch({ type: 'source-audio', payload: music.name_upload })
            api.get(`/audio/access/${music.name_upload}`, {
                headers: {
                    email,
                    token
                }
            }).then().catch()
        }
    }, [music.name_upload, playlist.isPlaylist])
    useEffect(() => {
        if (playlist.isPlaylist) {
            const { index } = playlist
            audio.pause()
            dispatch({ type: 'source-audio', payload: playlist.musics[index].name_upload })
            api.get(`/audio/access/${playlist.musics[index].name_upload}`, {
                headers: {
                    email,
                    token
                }
            }).then().catch()
        }
    }, [playlist.index, playlist.isPlaylist])

    useEffect(() => {
        function clean(){
            audio.removeEventListener('loadedmetadata', listeners.loadedMetaData)
            audio.removeEventListener('timeupdate', listeners.updateTime)
            audio.removeEventListener('ended', listeners.ended)
            audio.removeEventListener('ended', goNextMusic)

            dispatch({ type: 'clean-audio' })
            dispatch({ type: 'clean-music' })
            dispatch({ type: 'clean-playlist' })

            sessionStorage.removeItem('musics')
        }

        const volumeStorage: any = localStorage.getItem('volume')

        if (volumeStorage) {
            setVolume(volumeStorage * 1)
            audio.volume = volumeStorage * 1
        } else {
            setVolume(1)
            audio.volume = 1
        }

        audio.addEventListener('loadedmetadata', listeners.loadedMetaData)
        audio.addEventListener('timeupdate', listeners.updateTime)
        if (playlist.isPlaylist) {
            audio.addEventListener('ended', goNextMusic)
        } else {
            audio.addEventListener('ended', listeners.ended)
        }
        return clean
    }, [])

    return <Container>
        <MusicInfoContainer onClick={handleSeeMusic}>
            <MusicInfoImage
                src={!playlist.isPlaylist ? `${url}/music-bg/${music.music_background}` :
                `${url}/music-bg/${playlist.musics[playlist.index].music_background}`}
            />
            <MusicNameContainer>
                <MusicName>
                    {!playlist.isPlaylist ? music.name : playlist.musics[playlist.index].name}
                </MusicName>
                <MusicAuthor>
                    {!playlist.isPlaylist ? music.user_owner.name : playlist.musics[playlist.index].user_owner.name}
                </MusicAuthor>
            </MusicNameContainer>
        </MusicInfoContainer>
        <MusicControllerContainer>
            {playlist.isPlaylist ? <PlaylistName>
                <strong>Tocando:{' '}</strong>
                {playlist.name}
            </PlaylistName> : null}
            <MusicControllerButtonsContainer>
                <button onClick={handleRewind}>
                    <Rewind
                        color="#d9dadc"
                        size={25}
                    />
                </button>
                <button onClick={handleSkipBack}>
                    <SkipBack
                        color="#d9dadc"
                        size={25}
                    />
                </button>
                <button onClick={handleToggleAudio}>
                    {paused ? <PlayCircle
                        color="#d9dadc"
                        size={25}
                    /> : <PauseCircle
                        color="#d9dadc"
                        size={25}
                    />}
                </button>
                <button onClick={handleAdvance}>
                    <SkipForward
                        color="#d9dadc"
                        size={25}
                    />
                </button>
                <button onClick={handleSkip}>
                    <FastForward
                        color="#d9dadc"
                        size={25}
                    />
                </button>
                <button onClick={handleToggleRepeat}>
                    <Repeat
                        color={looping ? '#4c43df' : '#d9dadc'}
                        size={25}
                    />
                </button>
            </MusicControllerButtonsContainer>
            <MusicTimeContainer>
                <MusicTimeSpan>0:00</MusicTimeSpan>
                <MusicTimeSliderContainer>
                    <MusicTimeSliderSpan
                        duration={duration}
                        currentTime={currentTime}
                    >
                        {treatTime(currentTime)}
                    </MusicTimeSliderSpan>
                    <Slider
                        axis="x"
                        x={currentTime}
                        xstep={1}
                        xmin={0}
                        xmax={duration}
                        onChange={handleTimeSlider}
                        styles={{
                            track: {
                                width: '100%',
                                backgroundColor: '#d9dadc',
                                cursor: 'pointer'
                            },
                            active: {
                                backgroundColor: '#4c43df'
                            },
                            thumb: {
                                width: 15,
                                height: 15,
                                backgroundColor: '#4c43df'
                            }
                        }}
                    />
                </MusicTimeSliderContainer>
                <MusicTimeSpan>
                    {treatTime(duration)}
                </MusicTimeSpan>
            </MusicTimeContainer>
        </MusicControllerContainer>
        <ControllerContainer>
            <ControllerButton onClick={handleCloseController}>
                <X
                    color="#d9dadc"
                    size={26}
                />
            </ControllerButton>
            {getVolumeIcon()}
            <Slider
                axis="x"
                x={volume}
                xstep={0.01}
                xmin={0}
                xmax={1}
                onChange={handleVolumeSlider}
                styles={{
                    track: {
                        width: '40%',
                        backgroundColor: '#d9dadc',
                        cursor: 'pointer'
                    },
                    active: {
                        backgroundColor: '#4c43df'
                    },
                    thumb: {
                        width: 15,
                        height: 15,
                        backgroundColor: '#4c43df'
                    }
                }}
            />
        </ControllerContainer>
    </Container>
}

export default AudioController