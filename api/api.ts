import * as path from 'path'

const endpoint = "https://notion-api.hao.io"
import {Page, PaginatedList} from '@notionhq/client/build/src/api-types'

export interface IResponse{
    content: PaginatedList<Page>
}
export async function queryDatabase<T>(id:string, query:Object = {}):Promise<IResponse>{
    return (await fetch(`${endpoint}/query/${id}`,{
        method: 'post',
        body: JSON.stringify(query)
    })).json()
}
