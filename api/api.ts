import * as path from 'path'

const endpoint = "https://notion-api.haoio.workers.dev"
import {BlockBase,Block, Page, PaginatedList} from '@notionhq/client/build/src/api-types'

export async function queryDatabase<T>(id:string, query:Object = {}):Promise<Page[]>{
    const url = `${endpoint}/query/${id}`
    const data = await fetch(url,{
        method: 'post',
        body: JSON.stringify(query)
    })
    const res =  await data.json()
    if(res.error){
        return []
    }
    return res
}

export interface IPageResponse{
    page: Page
    block: BlockBase
    children: Block[]
}

export async function fetchPage(id: string):Promise<IPageResponse>{
    const data = await fetch(`${endpoint}/pages/${id}`)
    return await data.json()
}
