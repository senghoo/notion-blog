import React from 'react'

import 'katex/dist/katex.min.css'
import {InlineMath, BlockMath} from 'react-katex'

const katexSettings = {
    // throwOnError: false,
    strict: true
}

export const Equation: React.FC<{
    math: string
    block?: boolean
    children?: React.ReactNode
    className?: string
}> = ({ math, className, block }) => {

    return (
        <span
            role='button'
            tabIndex={0}
            className={'notion-equation'}
        >
            {block ? <BlockMath math={math} /> : <InlineMath math={math}/>}
    </span>
    )
}
