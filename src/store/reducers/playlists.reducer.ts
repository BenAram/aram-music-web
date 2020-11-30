import {} from 'redux'

interface Actions {
    type: string
    payload: any
    index: number
    id: number
}

function PlaylistsReducer(state: Array<Playlist> = [], actions: Actions) {
    switch (actions.type) {
        case 'change-playlists':
            return actions.payload
        case 'insert-playlists':
            const playlists = [...state]
            playlists[actions.index].musics.push(actions.payload)
            return playlists
        case 'remove-playlists':
            const playlists2 = [...state]
            playlists2[actions.index].musics.splice(actions.payload, 1)
            return playlists2
        case 'rename-playlists':
            const playlists3 = [...state]
            playlists3[actions.index].name = actions.payload
            return playlists3
        case 'insert-new-playlists':
            const playlists4 = [...state]
            playlists4.push({
                musics: [],
                name: actions.payload,
                public: false,
                editable: true,
                id: actions.id
            })
            return playlists4
        case 'delete-playlists':
            const playlists5 = [...state]
            playlists5.splice(actions.index, 1)
            return playlists5
        case 'toggle-public-playlists':
            const playlists6 = [...state]
            playlists6[actions.index].public = !playlists6[actions.index].public
            return playlists6
        default:
            return state
    }
}

export default PlaylistsReducer