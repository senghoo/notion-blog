import React from 'react'

import 'katex/dist/katex.min.css'
import {InlineMath, BlockMath} from 'react-katex'

const katexSettings = {
    throwOnError: false,
    strict: false
}

export const Equation: React.FC<{
    math: string
    block?: boolean
    children?: React.ReactNode
    className?: string
}> = ({ math, className, block }) => {

    if (block){
        return <BlockMath className={'notion-equation notion-equation-block'} math={math} />
    }
    return <InlineMath className={'notion-equation notion-equation-inline'} math={math}/>

}
