import React from "react";
import TagListItem from "../tag-list-item/TagListItem.js";


const TagList = ({tags, onDeleteTag, onEditTag, onToggleTag, editTagDisabled, selected_tags}) => {

    const elements = tags.map((item) => {
        const {id, ...itemProps} = item;
        let selected = selected_tags !== undefined ? selected_tags.includes(id) : false;
        return (
            <div key={id} className="col-6">
                <TagListItem
                    {...itemProps}
                    onDeleteTag={() => onDeleteTag(id)}
                    onEditTag={() => onEditTag(id)}
                    onToggleTag={() => onToggleTag(id)}
                    editTagDisabled={editTagDisabled}
                    selected = {selected}
                />
            </div>
        )
    })

    return (
        <div className="row">
            <div className="col-12">
                <label htmlFor="selected_tags">Выбрать тег</label>
                <div  id="selected_tags" className="row">
                    {elements.length === 0 ? 'Ничего нет': elements}
                </div>
            </div>
        </div>
    )
}
export default TagList;