import { FC } from 'react'

const Info: FC<{
    name: string
    message: string
}> = ({ name, message }) => {
    return (
        <div className='mx-auto my-0 mt-8 w-full text-center'>
            <h4 className='mb-4'>{name}</h4>
            <p>{message}</p>
        </div>
    )
}

export default Info
