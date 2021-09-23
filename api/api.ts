import * as path from 'path'

const endpoint = "https://notion-api.hao.io"
import {BlockBase,Block, Page, PaginatedList} from '@notionhq/client/build/src/api-types'

export async function queryDatabase<T>(id:string, query:Object = {}):Promise<Page[]>{
    const data = await fetch(`${endpoint}/query/${id}`,{
        method: 'post',
        body: JSON.stringify(query)
    })
    const res =  await data.json()
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
