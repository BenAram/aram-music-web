import { createStore, combineReducers } from 'redux'

import actualIndex from './reducers/actualIndex.reducer'
import audio from './reducers/audio.reducer'
import music from './reducers/music.reducer'
import musicIsLoaded from './reducers/musicIsLoaded.reducer'
import musicType from './reducers/musicType.reducer'
import playlist from './reducers/playlist.reducer'
import playlists from './reducers/playlists.reducer'
import updates from './reducers/updates.reducer'

const reducers = combineReducers({
    actualIndex,
    audio,
    music,
    musicIsLoaded,
    musicType,
    playlist,
    playlists,
    updates
})

const store = createStore(reducers)

export default store