import {} from 'redux'

const initialState: number = 0

interface Actions {
    type: string
    payload: any
}

function ActualIndexReducer(state: number = initialState, actions: Actions) {
    switch (actions.type) {
        case 'clean-actual-index':
            return initialState
        case 'change-actual-index':
            return actions.payload
        default:
            return state
    }
}

export default ActualIndexReducer