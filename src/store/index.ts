import { createStore, combineReducers } from 'redux'

import audio from './reducers/audio.reducer'
import music from './reducers/music.reducer'
import musicIsLoaded from './reducers/musicIsLoaded.reducer'
import musicType from './reducers/musicType.reducer'
import playlist from './reducers/playlist.reducer'
import playlistToSee from './reducers/playlistToSee.reducer'

const reducers = combineReducers({
    audio,
    music,
    musicIsLoaded,
    musicType,
    playlist,
    playlistToSee
})

const store = createStore(reducers)

export default store