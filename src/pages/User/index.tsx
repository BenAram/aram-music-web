import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api'
import url from '../../services/url'

interface PublicUser {
    name: string
    avatar: string
    playlists: Array<{
        name: string
        public: boolean
        id: number
        musics: Array<{
            music_background: string
            name: string
            id: number
        }>
    }>
    id: number
    friends: Array<{
        name: string
        avatar: string
        id: number
    }>
    musics: Array<{
        id: number
        name: string
        music_background: string
    }>
    online: boolean
    type?: string
    addable: boolean
    createdAt: string
}

const initialState: PublicUser = {
    addable: false,
    avatar: '',
    friends: [],
    id: 0,
    name: '',
    online: false,
    playlists: [],
    musics: [],
    createdAt: ''
}

function treatTime(time: number): string {
    return time > 9 ? `${time}` : `0${time}`
}

function treatDate(time: string): string {
    const date = new Date(time)

    const hours = treatTime(date.getHours())
    const minutes = treatTime(date.getMinutes())

    const day = treatTime(date.getDate())
    const month = treatTime(date.getMonth())
    const year = treatTime(date.getFullYear())

    return `${hours}:${minutes} - ${day}/${month}/${year}`
}

function User(): JSX.Element {
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const { id } = useParams() as any

    const [user, setUser] = useState<PublicUser>(initialState)

    useEffect(() => {
        async function run() {
            try {
                const { data } = await api.get(`/user/${id}`, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    alert(data.message)
                } else {
                    setUser(data)
                }
            } catch(err) {
                alert('Um erro ocorreu')
            }
        }
        if (id) {
            run()
        }
    }, [id])

    return <div/>
}

export default User