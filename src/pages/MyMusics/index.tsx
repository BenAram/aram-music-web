import React, { useState, useEffect } from 'react'

import {
    Container,
    MusicsContainer,
    MusicItem
} from './styles'

import api from '../../services/api'

function MyMusics(): JSX.Element {

    const [myMusics, setMyMusics] = useState<Array<Music>>([])

    useEffect(() => {
        async function run() {
            try {
                const email = localStorage.getItem('email')
                const token = localStorage.getItem('token')
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
    }, [])

    return <Container>
        <MusicsContainer>
            {myMusics.map(myMusic => <MusicItem key={myMusic.name_upload}>
                <p>{myMusic.name}</p>
            </MusicItem>)}
        </MusicsContainer>
    </Container>
}

export default MyMusics