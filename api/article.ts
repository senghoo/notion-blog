import {queryDatabase} from './api'
import {
    CreatedTimeProperty, CreatedTimePropertyValue, LastEditedTimePropertyValue,
    MultiSelectOption, MultiSelectPropertyValue,
    RichText,
    SelectOption, SelectPropertyValue,
    TitlePropertyValue
} from '@notionhq/client/build/src/api-types'
export interface IArticleHead{
    ID: string
    Title: RichText[]
    Tags: string[]
    Category: string
    CreateAt: string
    UpdateAt: string
}

const articleDatabaseID = '596703f7de654fc79d819a830ecd6353'
export async function fetchArticle():Promise<Array<IArticleHead>>{
    const data =  await queryDatabase(articleDatabaseID)
    return data.content.results.map(r=>{
        return {
            ID: r.id,
            Title: (r.properties['Title'] as TitlePropertyValue).title,
            Tags: (r.properties['Tags'] as MultiSelectPropertyValue).multi_select.map(e=>e.name),
            Category: (r.properties['Category'] as SelectPropertyValue).select.name,
            CreateAt: (r.properties['CreateAt'] as CreatedTimePropertyValue).created_time,
            UpdateAt: (r.properties['CreateAt'] as LastEditedTimePropertyValue).last_edited_time,
        } as IArticleHead
    })
}
