import {} from 'redux'

const initialState: Music = {
    name: '',
    access: 0,
    description: '',
    keywords: [],
    music_background: '',
    name_upload: '',
    type: '',
    user_owner: {
        avatar: '',
        name: ''
    },
    id: 0,
    createdAt: '',
    editable: false
}

interface Actions {
    type: string
    payload?: Music
}

function MusicReducer(state: Music = initialState, actions: Actions): Music {
    switch (actions.type) {
        case 'clean-music':
            return initialState
        case 'change-music':
            if (actions.payload) {
                return actions.payload
            } else {
                return state
            }
        default:
            return state
    }
}

export default MusicReducer