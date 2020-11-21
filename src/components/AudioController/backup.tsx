import React, { useState, useEffect } from 'react'
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
    MusicControllerButtonsContainer,
    MusicTimeContainer,
    MusicTimeSpan,
    MusicTimeSliderContainer,
    MusicTimeSliderSpan,
    ControllerContainer,
    ControllerButton
} from './styles'

import { useAudio } from '../../hooks'

import url from '../../services/url'

function AudioController(): JSX.Element {

    // const audio = useSelector((store: any) => store.audio)
    const audio = useAudio()
    const music: Music = useSelector((store: any) => store.music)
    const playlist: StoreStatePlaylist = useSelector((store: any) => store.playlist)
    const dispatch = useDispatch()

    const [volume, setVolume] = useState<number>(0)
    const [paused, setPaused] = useState<boolean>(true)
    const [looping, setLooping] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

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
    }

    function handleAdvance(): void {
        audio.currentTime += 10
    }

    function handleSkip(): void {
        if (playlist.isPlaylist) {
            goNextMusic()
        } else {
            audio.currentTime = audio.duration
        }
    }

    function handleToggleRepeat(): void {
        audio.loop = !audio.loop
    }

    function handleTimeSlider(params: any) {
        const x: number = params.x
        audio.currentTime = x
    }

    function handleVolumeSlider(params: any) {
        const x: number = params.x
        audio.volume = x
        localStorage.setItem('volume', `${x}`)
    }

    function handleCloseController(): void {
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

        if (audio.volume <= 0) {
            return <VolumeX {...config} />
        }
        if (audio.volume <= 0.5) {
            return <Volume1 {...config} />
        }
        if (audio.volume > 0.5) {
            return <Volume2 {...config} />
        }

        return <Volume {...config} />
    }

    function goBackMusic() {
        const { index } = playlist
        if (index - 1 < 0) {
            audio.currentTime = 0
        } else {
            audio.pause()
            audio.src = `${url}/audio/${playlist.musics[index - 1].name_upload}`
            dispatch({ type: 'down-playlist' })
            audio.play()
        }
    }

    function goNextMusic() {
        const { index } = playlist
        if (index + 1 >= playlist.musics.length) {
            audio.currentTime = audio.duration
        } else {
            audio.pause()
            audio.src = `${url}/audio/${playlist.musics[index + 1].name_upload}`
            dispatch({ type: 'up-playlist' })
            audio.play()
        }
    }

    useEffect(() => {
        if (!playlist.isPlaylist) {
            const volumeStorage: any = localStorage.getItem('volume')

            if (volumeStorage) {
                audio.volume = volumeStorage * 1
            } else {
                audio.volume = 1
            }

            audio.src = `${url}/audio/${music.name_upload}`

            // dispatch({ type: 'source-audio', payload: music.name_upload })

            // audio.addEventListener('loadedmetadata', listeners.loadedMetaData)
            // audio.addEventListener('timeupdate', listeners.updateTime)
            // audio.addEventListener('ended', listeners.ended)
            // return () => {
            //     audio.removeEventListener('loadedmetadata', listeners.loadedMetaData)
            //     audio.removeEventListener('timeupdate', listeners.updateTime)
            //     audio.removeEventListener('ended', listeners.ended)
            // }
        }
        return () => {
            dispatch({ type: 'clean-audio' })
            dispatch({ type: 'clean-music' })
            dispatch({ type: 'clean-playlist' })
        }
    }, [music.name_upload])

    useEffect(() => {
        if (playlist.isPlaylist) {
            const volumeStorage: any = localStorage.getItem('volume')

            if (volumeStorage) {
                audio.volume = volumeStorage * 1
            } else {
                audio.volume = 1
            }

            const { index } = playlist

            audio.src = `${url}/audio/${playlist.musics[index].name_upload}`
            // audio.addEventListener('loadedmetadata', listeners.loadedMetaData)
            // audio.addEventListener('timeupdate', listeners.updateTime)
            // audio.addEventListener('ended', goNextMusic)
            // return () => {
            //     audio.removeEventListener('loadedmetadata', listeners.loadedMetaData)
            //     audio.removeEventListener('timeupdate', listeners.updateTime)
            //     audio.removeEventListener('ended', goNextMusic)
            // }
        }
    }, [playlist.isPlaylist, playlist.name])

    return <Container>
        <MusicInfoContainer>
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
                    {audio.paused ? <PlayCircle
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
                        color={audio.loop ? '#4c43df' : '#d9dadc'}
                        size={25}
                    />
                </button>
            </MusicControllerButtonsContainer>
            <MusicTimeContainer>
                <MusicTimeSpan>0:00</MusicTimeSpan>
                <MusicTimeSliderContainer>
                    <MusicTimeSliderSpan
                        duration={audio.duration}
                        currentTime={audio.currentTime}
                    >
                        {treatTime(audio.currentTime)}
                    </MusicTimeSliderSpan>
                    <Slider
                        axis="x"
                        x={audio.currentTime}
                        xstep={1}
                        xmin={0}
                        xmax={audio.duration}
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
                    {treatTime(audio.duration)}
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
                x={audio.volume}
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