import * as types from 'notion-types'
import { useNotionContext } from 'react-notion-x'
import { useLocalStorage, useWindowSize } from 'react-use'
import {NotionAPI} from '../../api/notionv3'
import {parsePageID} from '../../api/utils'
import {CollectionViewTable} from './CollectionViewTable'
export function Collection(props:{
    block: types.CollectionViewBlock | types.CollectionViewPageBlock
    className?: string
} ) {
    const block = props.block
    const { recordMap, showCollectionViewDropdown } = useNotionContext()
    const { collection_id: collectionId, view_ids: viewIds } = block

    const [collectionState, setCollectionState] = useLocalStorage(block.id, {
        collectionViewId: viewIds[0]
    })

    const collectionViewId =
        viewIds.find((id) => id === collectionState.collectionViewId) || viewIds[0]
    const collection = recordMap.collection[collectionId]?.value
    const collectionView = recordMap.collection_view[collectionViewId]?.value
    const collectionData =
        recordMap.collection_query[collectionId]?.[collectionViewId]
    let col= null
    switch (collectionData.type){
        case 'table':
            col =<CollectionViewTable
                collection={collection}
                collectionView={collectionView}
                collectionData={collectionData}
                padding={0}
                width={0}
                />
            break
        default:
            col =<div>not supported</div>
    }
    return <div className="notion-collection">

        {col}
    </div>
}
