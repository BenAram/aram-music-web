import {} from 'redux'

interface Actions {
    type: string
    payload: any
}

function Updates(state: number = 0, actions: Actions): Number {
    switch (actions.type) {
        case 'update':
            return state + 1
        default:
            return state
    }
}

export default Updates