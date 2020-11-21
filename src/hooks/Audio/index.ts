import { useState } from 'react'

function useAudio() {

    const audio = new Audio()

    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [ended, setEnded] = useState<boolean>(false)
    const [loop, setLoop] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(true)
    const [volume, setVolume] = useState<number>(0)

    audio.addEventListener('durationchange', () => {
        setDuration(audio.duration)
    })
    audio.addEventListener('ended', () => {
        setEnded(audio.ended)
    })
    audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
    })

    return {
        current: audio,

        get currentSrc() {
            return audio.currentSrc
        },

        get currentTime() {
            return currentTime
        },
        set currentTime(time: number) {
            audio.currentTime = time
            setCurrentTime(time)
        },

        get duration() {
            return duration
        },

        get ended() {
            return ended
        },

        get loop() {
            return loop
        },
        set loop(param: boolean) {
            audio.loop = param
            setLoop(param)
        },

        get paused() {
            return paused
        },

        get volume() {
            return volume
        },
        set volume(param: number){
            audio.volume = param
            setVolume(Math.min(1, param))
        },

        get src() {
            return audio.src
        },
        set src(param: string) {
            audio.src = param
        },


        pause(){
            audio.pause()
            setPaused(true)
        },
        play(){
            audio.play()
            setPaused(false)
            setEnded(false)
        }
    }
}

export {
    useAudio
}