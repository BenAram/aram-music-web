import {} from 'redux'
import url from '../../services/url'

const initialState = new Audio()

interface Actions {
    type: string
    payload?: any
}

function AudioReducer(state: any = initialState, actions: Actions) {
    switch (actions.type) {
        case 'clean-audio':
            state.pause()
            return new Audio()
        case 'source-audio':
            state.src = `${url}/audio/${actions.payload}`
            return state
        default:
            return state
    }
}

export default AudioReducer