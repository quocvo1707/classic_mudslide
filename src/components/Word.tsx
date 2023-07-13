import { FC, useRef, useState } from 'react'
import { BsFillPlayFill, BsFillStopFill } from 'react-icons/bs'

import { Definition } from '../types'
import Info from './Info'

interface WordProps {
    isConnected: boolean
    isFetching: boolean
    data: Definition | undefined
}

const Word: FC<WordProps> = ({ isConnected, isFetching, data }) => {
    if (!isConnected)
        return (
            <Info
                name='Network connection error'
                message='Check your network connection and refresh the tab.'
            />
        )

    if (isFetching)
        return (
            <Info
                name='Waiting for a while...'
                message='Your requested word is on the way coming.'
            />
        )

    if (!data)
        return (
            <Info
                name='No definition has been found'
                message='Sorry, we could not find any definitions for the word you
        were looking for.'
            />
        )

    const [is_playing, setIsPlaying] = useState(false)
    const audio_ref = useRef<HTMLAudioElement>(null)

    const togglePlay = () => {
        setIsPlaying(true)
        if (audio_ref.current !== null)
            audio_ref.current[is_playing ? 'pause' : 'play']()
    }

    return (
        <div className='mt-8'>
            <div className='mb-4 flex flex-col'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h4 className='mb-1 mr-4 text-2xl'>{data.word}</h4>
                        <div className='relative tracking-[1.75px]'>
                            UK:{' '}
                            <span className='mr-4 text-[var(--violet)]'>
                                {data.phonetics[0].transcription}
                            </span>
                            US:{' '}
                            <span className='text-[var(--violet)]'>
                                {data.phonetics[1].transcription}
                            </span>
                        </div>
                    </div>
                    <div>
                        <audio
                            ref={audio_ref}
                            onEnded={() => setIsPlaying(false)}
                            src={data.phonetics[0].pronunciation}
                        />
                        <button
                            className='flex h-12 w-12 items-center justify-center rounded-full bg-[var(--violet-2)] p-0 text-2xl text-[var(--violet)]'
                            onClick={togglePlay}
                        >
                            {is_playing ? (
                                <BsFillStopFill />
                            ) : (
                                <BsFillPlayFill />
                            )}
                        </button>
                    </div>
                </div>
                {data.meanings?.map((meaning, index) => {
                    return (
                        <div key={index} className='mx-0 my-4'>
                            <div className='flex'>
                                <h4 className='italic'>
                                    {meaning.partOfSpeech}
                                </h4>
                                <div className='ml-2.5 h-[1px] flex-[1] self-center justify-self-stretch bg-[var(--gray-light2)]' />
                            </div>
                            {meaning.synonym !== '' && (
                                <h4 className='my-2 font-medium text-[#9e9e9e]'>
                                    Synonym:{' '}
                                    <span className='lowercase text-[#6d6d6d]'>
                                        {meaning.synonym}
                                    </span>
                                </h4>
                            )}
                            <h4 className='my-2 font-medium text-[#9e9e9e]'>
                                Meaning:
                            </h4>
                            <ul className='list-none pl-8'>
                                {meaning?.definitions?.map(
                                    (definition) =>
                                        definition.definition.length > 2 && (
                                            <li
                                                key={definition.definition}
                                                className="before:-ml-4 before:inline-block before:w-4 before:font-bold before:text-[var(--violet)] before:content-['\2022']"
                                            >
                                                {definition.definition}
                                            </li>
                                        )
                                )}
                            </ul>
                            <h4 className='my-2 font-medium text-[#9e9e9e]'>
                                Examples:
                            </h4>
                            {meaning?.definitions.length > 0 && (
                                <div className='mt-4'>
                                    {meaning?.definitions?.map(
                                        ({ examples }) => {
                                            if (examples.length)
                                                return examples.map(
                                                    (example) => (
                                                        <p
                                                            key={example}
                                                            className='mt-1 pl-8 text-[#6d6d6d]'
                                                        >{`"${example}"`}</p>
                                                    )
                                                )
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Word
