import {CollectionViewProps, useNotionContext} from 'react-notion-x'
import {CollectionPropertySchema} from 'notion-types'
export function CollectionViewTable({collection, collectionView, collectionData}:CollectionViewProps){
    const { recordMap } = useNotionContext()

    let properties = []

    if (collectionView.format?.table_properties) {
        properties = collectionView.format?.table_properties.filter(
            (p) => p.visible && collection.schema[p.property]
        )
    } else {
        properties = [{ property: 'title' }].concat(
            Object.keys(collection.schema)
                .filter((p) => p !== 'title')
                .map((property) => ({ property }))
        )
    }
    const renderData = (schema:CollectionPropertySchema, data: any)=>{
        if(!data) return null
        switch (schema.type) {
            case 'select':
            case 'multi_select':
                return (data as Array<Array<string>>)[0].map(val=>{
                    return <span key={val} className='tag'>{val}</span>
                })
            default:
                return (data as Array<Array<string>>)[0].map(val=>{
                    return <span key={val}>{val}</span>
                })


        }
        return null
    }
    return <table className='notion-table'>
        <tr>
            {
                properties.map(p=>{
                    const schema = collection.schema?.[p.property]
                    return <th key={p.property}>{schema.name}</th>
                })
            }
        </tr>
        {collectionData.blockIds.map(blockId=>{
            return <tr key={blockId}>
                {
                    properties.map(p=>{
                        const schema = collection.schema?.[p.property]
                        const block = recordMap.block[blockId]?.value
                        const data = block?.properties?.[p.property]
                        return <td>
                            {renderData(schema, data)}
                        </td>
                    })
                }
            </tr>
        })}
    </table>
}
