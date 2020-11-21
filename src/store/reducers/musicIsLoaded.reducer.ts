import {} from 'redux'

const initialState: boolean = false

interface Actions {
    type: string
}

function MusicIsLoadedReducer(state: boolean = initialState, actions: Actions) {
    switch (actions.type) {
        case 'clean-music-is-loaded':
            return initialState
        case 'active-music-is-loaded':
            return true
        case 'disactive-music-is-loaded':
            return false
        case 'toggle-music-is-loaded':
            return !state
        default:
            return state
    }
}

export default MusicIsLoadedReducer