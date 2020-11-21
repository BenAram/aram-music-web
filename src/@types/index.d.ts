declare module '*.png'
declare interface Music {
    access: number
    description: string
    keywords: Array<string>
    name: string
    name_upload: string
    type: string
    user_owner: {
        avatar: string
        name: string
    }
    music_background: string
}
declare interface Playlist {
    name: string
    musics: Array<Music>
    public: boolean
}
declare interface StoreStatePlaylist {
    isPlaylist: boolean
    musics: Array<Music>
    index: number
    name: string
}
declare interface PlaylistToSee {
    updates: number
    name: string
    editable: boolean
    owner: string
    musics: Array<Music>
}
declare interface MusicType {
    isType: boolean
    value: string
}