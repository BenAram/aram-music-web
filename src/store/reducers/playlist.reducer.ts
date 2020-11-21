import {} from 'redux'

const initialState: StoreStatePlaylist = {
    name: '',
    musics: [],
    isPlaylist: false,
    index: 0
}

interface Actions {
    type: string
    payload?: any
}

function PlaylistReducer(state: StoreStatePlaylist = initialState, actions: Actions): StoreStatePlaylist {
    switch (actions.type) {
        case 'clean-playlist':
            return {...initialState}
        case 'active-playlist':
            return {...state, isPlaylist: true}
        case 'disactive-playlist':
            return {...state, isPlaylist: false}
        case 'toggle-playlist':
            return {...state, isPlaylist: !state.isPlaylist}
        case 'change-playlist':
            return {...state, musics: actions.payload}
        case 'rename-playlist':
            return {...state, name: actions.payload}
        case 'up-playlist':
            if (state.index + 1 < state.musics.length) {
                return {...state, index: state.index + 1}
            } else {
                return {...state}
            }
        case 'down-playlist':
            if (state.index - 1 > -1) {
                return {...state, index: state.index - 1}
            } else {
                return {...state}
            }
        default:
            return {...state}
    }
}

export default PlaylistReducer