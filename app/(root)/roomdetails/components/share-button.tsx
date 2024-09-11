import { Share2 } from 'lucide-react'
import React from 'react'

const ShareButton = () => {
    return (
        <a href='' className='border-2 border-blue-800 text-blue-900 flex items-center gap-1 font-semibold text-lg w-fit px-3 py-2 rounded-md'><Share2 /> <span className='hidden sm:block'>{`Share`}</span></a>
    )
}

export default ShareButton
