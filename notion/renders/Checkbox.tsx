import { Checkbox as CB } from 'antd';
export const Checkbox: React.FC<{
    isChecked: boolean,
    blockId: string | undefined
}> = ({isChecked}) => {
    let content = null

    if (isChecked) {
        content = (
            <CB checked={isChecked}/>
        )
    } else {
        content = <CB checked={isChecked}/>
    }

    return (
        <span className="notion-property notion-property-checkbox">{content}</span>
    )
}
