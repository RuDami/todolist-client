import React, {Component} from "react";

export default class TagListItem extends Component {

    render() {

        const {title, onDeleteTag, onEditTag, editTagDisabled, onToggleTag, selected} = this.props;

        let classNames = 'rounded mb-2 p-3 cursor-pointer';
        if (selected) {
            classNames += ' bg-dark text-white'
        } else {
            classNames += ' bg-light '
        }
        return (
            <div className={classNames}
                 name="selected_tags"
                 onClick={onToggleTag}
            >
                <div className="row">
                    <div className="col-12">{title}</div>
                </div>
                {!editTagDisabled ? (
                    <div className="row">
                        <div className="col-6 pr-0">
                            <div className="btn btn-sm btn-secondary "
                                 onClick={onEditTag}>
                                <div className="fa fa-edit">
                                </div>
                            </div>
                        </div>
                        <div className="col-6 pl-0">
                            <div className="btn btn-sm btn-secondary float-right"
                                 onClick={onDeleteTag}>
                                <div className="fa fa-trash">

                                </div>
                            </div>
                        </div>
                    </div>
                ) : ('')}

            </div>

        )
    }
}