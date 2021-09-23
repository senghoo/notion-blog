import { EmbedBlock} from '@notionhq/client/build/src/api-types'
import Gist from 'react-gist'

export default function paragraph({block}:{block: EmbedBlock}){
    const url = block.embed.url
    const parsedUrl = new URL(url)
    if (url.startsWith('https://gist.github.com/')){
        const paths = parsedUrl.pathname.split('/')
        const id = paths[paths.length-1]
        return <Gist id={id} />
    }
    return null
}
