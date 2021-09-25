import {fetchPage, IPageResponse, queryDatabase} from './api'
import {
    CreatedTimeProperty, CreatedTimePropertyValue, DatePropertyValue, LastEditedTimePropertyValue,
    MultiSelectOption, MultiSelectPropertyValue,
    RichText,
    SelectOption, SelectPropertyValue,
    TitlePropertyValue
} from '@notionhq/client/build/src/api-types'

const articleDatabaseID = '596703f7de654fc79d819a830ecd6353'

export interface IArticleHead{
    ID: string
    Title: string
    Tags: string[]
    Category: string
    PublishAt: string
}

export async function fetchArticle(query:Object = {}):Promise<Array<IArticleHead>>{
    const data = await queryDatabase(articleDatabaseID, query)
    return data.map(r=>{
        return {
            ID: r.id,
            Title: (r.properties['Title'] as TitlePropertyValue).title[0].plain_text,
            Tags: (r.properties['Tags'] as MultiSelectPropertyValue).multi_select?.map(e=>e.name),
            Category: (r.properties['Category'] as SelectPropertyValue).select?.name || '未分类',
            PublishAt: (r.properties['PublishAt'] as DatePropertyValue).date?.start
        } as IArticleHead
    })
}


export async function fetchPageContent(id: string):Promise<IPageResponse>{
    return await fetchPage(id)
}
