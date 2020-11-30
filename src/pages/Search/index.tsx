import React, { useState, useEffect } from 'react'
import { Search as SearchIcon } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
    Container,
    SearchButton,
    SearchContainer,
    SearchInput,
    MusicTypeButtonContainer,
    MusicTypeButton,
    MusicTypeButtonName,
    MusicTypeButtonImage
} from './styles'

import api from '../../services/api'
import url from '../../services/url'

interface MusicType {
    label: string
    value: string
    img?: string
    color?: string
}

function Search(): JSX.Element {

    const history = useHistory()

    const dispatch = useDispatch()

    const [musicTypes, setMusicTypes] = useState<Array<MusicType>>([])
    const [searchValue, setSearchValue] = useState<string>('')

    function handleSearchByType(type: MusicType): Function {
        return function () {
            history.push(`/app/genre/${type.value}`)
        }
    }

    useEffect(() => {
        async function run() {
            try {
                const { data } = await api.get('/music-types')
                setMusicTypes(data)
            } catch(err) {
                alert('Um erro ocorreu.')
            }
        }
        run()
    }, [])

    return <Container>
        <SearchContainer>
            <SearchButton>
                <SearchIcon
                    color="#d9dadc"
                    size={26}
                />
            </SearchButton>
            <SearchInput
                placeholder="Pesquise uma música"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
        </SearchContainer>
        <MusicTypeButtonContainer>
            {musicTypes.map(musicType => <MusicTypeButton
                key={musicType.value}
                color={musicType.color}
                onClick={handleSearchByType(musicType) as any}
            >
                <MusicTypeButtonName>{musicType.label}</MusicTypeButtonName>
                {musicType.img ? <MusicTypeButtonImage
                    src={url + '/types-img/' + musicType.img}
                /> : null}
            </MusicTypeButton>)}
        </MusicTypeButtonContainer>
    </Container>
}

export default Search