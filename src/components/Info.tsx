import { FC } from 'react'

const Info: FC<{
    name: string
    message: string
}> = ({ name, message }) => {
    return (
        <div className='my-0 mx-auto mt-8 w-full text-center'>
            <h4 className='mb-4'>{name}</h4>
            <p>{message}</p>
        </div>
    )
}

export default Info
