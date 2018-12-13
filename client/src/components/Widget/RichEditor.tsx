import React from "react";
import PropTypes from "prop-types";
import { connect } from 'dva'
import { Row, Col } from "antd";
import ReactUWP from 'react-uwp'
import SimpleMDEReact from "react-simplemde-editor";
import './RichEditor.less'

const baseStyle: React.CSSProperties = {
    margin: "10px 10px 10px 0"
};

interface IProjectItem {
    itemTitle: string,
    itemStartDate: string,
    itemEndDate: string,
    itemContent: string,
    itemRecord: string,
    itemComment: string
}

export interface IRichEditorProps {
    // dispatch: any,
    projectDetail: {
        editMode: boolean,
        projectItems: IProjectItem[]
        }
    index: number,
    delay: number,
    id: string,
    options: any
}

interface IRichEditorState {
    controls: string[],
    itemContent: string,
    itemRecord: string,
    itemComment: string,
}


class RichEditor extends React.Component<IRichEditorProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state : IRichEditorState = {
        controls: [
            'letter-spacing',
                'line-height',
                'clear',
                'headings',
                'list-ol',
                'list-ul',
                'remove-styles',
                'superscript',
                'subscript',
                'hr',
                'text-align'
        ],
        itemContent: localStorage.getItem(`smde_content_${this.props.id}`) || this.props.projectDetail.projectItems[this.props.index].itemContent,
        itemRecord: localStorage.getItem(`smde_record_${this.props.id}`) || this.props.projectDetail.projectItems[this.props.index].itemRecord,
        itemComment: localStorage.getItem(`smde_comment_${this.props.id}`) || this.props.projectDetail.projectItems[this.props.index].itemComment
    }
    constructor(props) {
        super(props)
    }

    // public handleItemContentChange = (itemContent) => {
    //     const { dispatch, index } = this.props
    //     dispatch({type: "projectDetail/setItemContent", index, value: itemContent})
    // }
    
    // public handleItemRecordChange = (itemRecord) => {
    //     const { dispatch, index } = this.props
    //     dispatch({type: "projectDetail/setItemRecord", index, value: itemRecord})
    // }

    // public handleItemCommentChange = (itemComment) => {
    //     const { dispatch, index } = this.props
    //     dispatch({type: "projectDetail/setItemComment", index, value: itemComment})
    // }

    public render(): JSX.Element {
        const { theme } = this.context;
        const { projectDetail, index, options, delay } = this.props
        const { editMode } = projectDetail
        const { controls } = this.state
        return (
            <Row gutter={16} type="flex" justify="space-around" style={baseStyle}>
                <Col span={8}>
                    <SimpleMDEReact
                        id={`smde_content_${index}`}
                        value={this.state.itemContent}
                        options={{
                            autosave: {
                                enabled: true,
                                uniqueId: `smde_content_${index}`,
                                delay
                            },
                            ...options
                        }}
                    />
                </Col>
                <Col span={8}>
                    <SimpleMDEReact
                            id={`smde_record_${index}`}
                            value={this.state.itemRecord}
                            options={{
                                autosave: {
                                    enabled: true,
                                    uniqueId: `smde_record_${index}`,
                                    delay
                                },
                                ...options
                            }}
                    />
                </Col>
                <Col span={8}>
                    <SimpleMDEReact
                        id={`smde_comment_${this.props.index}`}
                        value={this.state.itemComment}
                        options={{
                            autosave: {
                                enabled: true,
                                uniqueId: `smde_comment_${index}`,
                                delay
                            },
                            ...options
                        }}
                    />
                </Col>
            </Row>
        )
    }
}

function mapStateToProps({ projectDetail }) {
    return { projectDetail }
}

export default connect(mapStateToProps)(RichEditor)