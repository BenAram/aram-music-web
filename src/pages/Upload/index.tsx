import React, { useState, useEffect, useRef } from 'react'
import {
    Type,
    AlignLeft,
    Key,
    Plus
} from 'react-feather'
import { useSelector } from 'react-redux'

import {
    Container,
    Header,
    HeaderImg,
    HeaderText,
    Main,
    InputContainer,
    InputTitle,
    InputDiv,
    Input,
    TextArea,
    RadioContainer,
    RadioItem,
    RadioInput,
    RadioInputDiv,
    ButtonInput,
    Button,
    ButtonImg,
    ErrorContainer,
    ErrorMessage,
    SaveButton,
    SaveButtonText,
    SuccessContainer,
    SuccessMessage
} from './styles'

import Divider from '../../components/Divider'

import api from '../../services/api'

import logo from '../../images/logo.png'

interface File {
    name: string
    uri: string
    type: string
}

interface Type {
    label: string
    value: string
}

const initialState: File = {
    name: '',
    uri: '',
    type: ''
}

function Upload() {

    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const musicIsLoaded = useSelector((store: any) => store.musicIsLoaded)

    const imageInput = useRef<any>()
    const audioInput = useRef<any>()

    const [musicTypes, setMusicTypes] = useState<Array<Type>>([])

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [keywords, setKeywords] = useState<string>('')
    const [type, setType] = useState<string>('')

    const [image, setImage] = useState<File>({...initialState})
    const [audio, setAudio] = useState<File>({...initialState})

    const [loading, setLoading] = useState<boolean>(false)

    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [success, setSuccess] = useState<boolean>(false)

    function clean() {
        setLoading(false)
        
        setError(false)
        setErrorMessage('')
    }

    function handleGetImage() {
        if (imageInput.current) {
            if (imageInput.current.files[0]) {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(imageInput.current.files[0])
                fileReader.onloadend = () => {
                    setImage({
                        name: imageInput.current.files[0].name,
                        uri: fileReader.result as string,
                        type: imageInput.current.files[0].type
                    })
                }
            }
        }
    }

    function handleGetAudio() {
        if (audioInput.current) {
            if (audioInput.current.files[0]) {
                setAudio({
                    name: audioInput.current.files[0].name,
                    uri: '',
                    type: audioInput.current.files[0].type
                })
            }
        }
    }
    async function handleSendMusic() {
        try {
            if (!name) {
                setSuccess(false)
                setError(true)
                setErrorMessage('Coloque um nome por favor.')
                return
            }
            if (!description) {
                setSuccess(false)
                setError(true)
                setErrorMessage('Coloque uma descrição por favor.')
                return
            }
            if (!keywords) {
                setSuccess(false)
                setError(true)
                setErrorMessage('Coloque palavras-chaves por favor.')
                return
            }
            if (!image.uri) {
                setSuccess(false)
                setError(true)
                setErrorMessage('Selecione uma imagem por favor.')
                return
            }
            if (!audio.name) {
                setSuccess(false)
                setError(true)
                setErrorMessage('Selecione uma música por favor.')
                return
            }
            setLoading(true)

            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('keywords', keywords)
            formData.append('musicType', type)
            formData.append('music_background', imageInput.current.files[0])
            formData.append('music', audioInput.current.files[0])

            const { data } = await api.post('/audio', formData, {
                headers: {
                    email,
                    token
                }
            })
            if (data.error) {
                setSuccess(false)
                setError(true)
                setErrorMessage(data.message)
            } else {
                setSuccess(true)
                clean()
            }
        } catch(err) {
            setSuccess(false)
            setError(true)
            setErrorMessage('Um erro ocorreu.')
        }
    }

    useEffect(() => {
        api.get('/music-types').then(({ data }) => {
            setMusicTypes(data)
        }).catch()
    } , [])

    return <Container>
        <Header>
            <HeaderImg
                src={logo}
            />
            <HeaderText>Poste uma música de sua preferência</HeaderText>
        </Header>
        <Main shrink={musicIsLoaded}>
            <InputContainer>
                <InputTitle>Coloque um nome</InputTitle>
                <InputDiv>
                    <Type
                        size={20}
                        color="#d9dadc"
                    />
                    <Input
                        disabled={loading}
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        maxLength={30}
                        placeholder="Nome"
                    />
                </InputDiv>
            </InputContainer>
            <InputContainer>
                <InputTitle>Coloque a descrição</InputTitle>
                <InputDiv>
                    <AlignLeft
                        size={20}
                        color="#d9dadc"
                    />
                    <Input
                        disabled={loading}
                        value={description}
                        onChange={(e: any) => setDescription(e.target.value)}
                        maxLength={100}
                        placeholder="Descrição"
                    />
                </InputDiv>
            </InputContainer>
            <InputContainer>
                <InputTitle>Coloque palavras-chaves</InputTitle>
                <InputDiv>
                    <Key
                        size={20}
                        color="#d9dadc"
                    />
                    <TextArea
                        disabled={loading}
                        value={keywords}
                        onChange={(e: any) => setKeywords(e.target.value)}
                        maxLength={400}
                        placeholder="Palavras-chaves"
                    />
                </InputDiv>
            </InputContainer>
            <RadioContainer>
                {musicTypes.map(musicType => <RadioItem key={musicType.value}>
                    <RadioInput
                        type="radio"
                        name="music-type"
                        onChange={() => setType(musicType.value)}
                        value={musicType.value}
                    />
                    <RadioInputDiv
                        style={{
                            backgroundColor: type === musicType.value ? '#4c43df' : '#d9dadc'
                        }}
                    />
                    <p
                        style={{
                            color: type === musicType.value ? '#4c43df' : '#d9dadc'
                        }}
                    >{musicType.label}</p>
                </RadioItem>)}
            </RadioContainer>
            <label>
                <ButtonInput
                    disabled={loading}
                    onChange={handleGetImage}
                    ref={imageInput}
                    type="file"
                    accept="image/*"
                />
                <Button>
                    {image.uri ?
                        <ButtonImg src={image.uri}
                        /> :
                        'Selecione uma foto de fundo para a música'
                    }
                </Button>
            </label>
            <label>
                <ButtonInput
                    disabled={loading}
                    onChange={handleGetAudio}
                    ref={audioInput}
                    type="file"
                    accept="audio/*"
                />
                <Button>
                    {audio.name ?
                    audio.name
                    : <Plus
                        size={20}
                        color="#d9dadc"
                    />}
                </Button>
            </label>
            {error ? <ErrorContainer>
                <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorContainer> : null}
            {success ? <SuccessContainer>
                <SuccessMessage>Música enviada com sucesso</SuccessMessage>
            </SuccessContainer> : null}
            <Divider
                customWidth="320px"
            />
            <SaveButton disabled={loading} onClick={handleSendMusic}>
                <SaveButtonText>Enviar música</SaveButtonText>
            </SaveButton>
        </Main>
    </Container>
}

export default Upload