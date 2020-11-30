import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Play,
    Plus,
    Eye,
    Share,
    ArrowUp
} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import {
    ContextMenuContainer,
    ContextMenuItem,
    ContextMenuTextContainer,
    ContextMenuDivider,
    ContextMenuText
} from '../ContextMenu'

import api from '../../services/api'

interface ContextMenuMusicInterface {
    visible: boolean
    x: number
    y: number
    music: Music
}

function ContextMenuMusic(props: ContextMenuMusicInterface): JSX.Element | null {

    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const dispatch = useDispatch()
    const musicIsLoaded = useSelector((store: any) => store.musicIsLoaded)
    const playlists: Array<Playlist> = useSelector((store: any) => store.playlists)

    const history = useHistory()


    const [isPlaylist, setIsPlaylist] = useState<boolean>(false)

    function handlePlayMusic() {
        dispatch({ type: 'disactive-music-is-loaded' })
        setTimeout(() => {
            dispatch({ type: 'change-music', payload: props.music })
            dispatch({ type: 'active-music-is-loaded' })
        }, 1)
    }

    function handleSeeMusic() {
        history.push(`/app/music/${props.music.id}`)
    }

    function handleAddRow() {
        const musicsJSON = sessionStorage.getItem('musics')

        let musics: Array<string> = []
        if (musicsJSON) {
            musics = JSON.parse(musicsJSON)
        }
        if (musicIsLoaded) {
            musics.push(`${props.music.id}`)
            sessionStorage.setItem('musics', JSON.stringify(musics))
        } else {
            handlePlayMusic()
        }
    }

    function saveMusic(index: number): Function {
        return async function() {
            try {
                const { data } = await api.patch('/playlists/insert', {
                    name: playlists[index].name,
                    name_upload: props.music.name_upload
                }, {
                    headers: {
                        email,
                        token
                    }
                })
                if (data.error) {
                    alert(data.message)
                } else {
                    dispatch({ type: 'insert-playlists', index, payload: props.music })
                }
            } catch(err) {
                alert('Não foi possível salvar a música em sua playlist')
            }
        }
    }

    return props.visible ? <Fragment>
        <ContextMenuContainer
            x={props.x}
            y={props.y}
        >
            <ContextMenuItem
                onClick={handlePlayMusic}
            >
                <ContextMenuTextContainer>
                    <Play
                        size={18}
                        color="#d9dadc"
                        style={{ fill: '#d9dadc' }}
                    />
                    <ContextMenuDivider/>
                    <ContextMenuText>Tocar</ContextMenuText>
                </ContextMenuTextContainer>
            </ContextMenuItem>
            <ContextMenuItem onClick={handleSeeMusic}>
                <ContextMenuTextContainer>
                    <Eye
                        size={18}
                        color="#d9dadc"
                    />
                    <ContextMenuDivider/>
                    <ContextMenuText>Ver sobre</ContextMenuText>
                </ContextMenuTextContainer>
            </ContextMenuItem>
            <ContextMenuItem
                onMouseEnter={() => setIsPlaylist(true)}
                onMouseLeave={() => setTimeout(() => {
                    setIsPlaylist(false)
                }, 200)}
            >
                <ContextMenuTextContainer>
                    <Plus
                        size={18}
                        color="#d9dadc"
                    />
                    <ContextMenuDivider/>
                    <ContextMenuText>Adicionar á playlist</ContextMenuText>
                </ContextMenuTextContainer>
                <Play
                    size={16}
                    color="#d9dadc"
                    style={{ fill: '#d9dadc' }}
                />
            </ContextMenuItem>
            <ContextMenuItem>
                <ContextMenuTextContainer>
                    <Share
                        size={18}
                        color="#d9dadc"
                    />
                    <ContextMenuDivider/>
                    <ContextMenuText>Compartilhar (Não funciona)</ContextMenuText>
                </ContextMenuTextContainer>
            </ContextMenuItem>
            <ContextMenuItem onClick={handleAddRow}>
                <ContextMenuTextContainer>
                    <ArrowUp
                        size={18}
                        color="#d9dadc"
                    />
                    <ContextMenuDivider/>
                    <ContextMenuText>Adicionar á fila</ContextMenuText>
                </ContextMenuTextContainer>
            </ContextMenuItem>
        </ContextMenuContainer>
        {isPlaylist ? <ContextMenuContainer
            onMouseEnter={() => setTimeout(() => {
                setIsPlaylist(true)
            }, 200)}
            x={props.x + 223}
            y={props.y + 40}
        >
            {playlists.map((playlist, index) => <ContextMenuItem
                key={index}
                onClick={saveMusic(index) as any}
            >
                <ContextMenuTextContainer>
                    <ContextMenuText>{playlist.name}</ContextMenuText>
                </ContextMenuTextContainer>
            </ContextMenuItem>)}
        </ContextMenuContainer> : null}
    </Fragment> : null
}

export default ContextMenuMusic