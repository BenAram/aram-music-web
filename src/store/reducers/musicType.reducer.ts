import {} from 'redux'

const initialState: MusicType = {
    isType: false,
    value: ''
}

interface Actions {
    type: string
    payload?: any
}

function MusicTypeReducer(state: MusicType = initialState, actions: Actions): MusicType {
    switch (actions.type) {
        case 'clean-music-type':
            return initialState
        case 'active-music-type':
            return {...state, isType: true}
        case 'disactive-music-type':
            return {...state, isType: false}
        case 'toggle-music-type':
            return {...state, isType: !state.isType}
        case 'change-music-type':
            return {...state, value: actions.payload}
        default:
            return state
    }
}

export default MusicTypeReducer