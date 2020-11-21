import {} from 'redux'

const initialState: PlaylistToSee = {
    editable: false,
    musics: [],
    name: '',
    owner: '',
    updates: 0
}

interface Actions {
    type: string
    payload: any
}

function PlaylistToSeeReducer(state: PlaylistToSee = initialState, actions: Actions): PlaylistToSee {
    switch (actions.type) {
        case 'clean-playlist-to-see':
            return initialState
        case 'update-playlist':
            return {...state, updates: state.updates + 1}
        case 'active-playlist-editable':
            return {...state, editable: true}
        case 'disactive-playlist-editable':
            return {...state, editable: false}
        case 'toggle-playlist-editable':
            return {...state, editable: !state.editable}
        case 'rename-playlist-to-see':
            return {...state, name: actions.payload}
        case 'rename-playlist-to-see-owner':
            return {...state, owner: actions.payload}
        case 'change-playlist-to-see':
            return {...state, musics: actions.payload}
        default:
            return state
    }
}

export default PlaylistToSeeReducer