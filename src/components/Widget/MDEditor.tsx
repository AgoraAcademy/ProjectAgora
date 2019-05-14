import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import * as PropTypes from "prop-types";
import './MDEditor.less'
import { connect } from "dva";
import { toggleSideBySide, togglePreview } from "simplemde";
import { Divider, Tooltip } from "antd";
import { Icon } from "react-uwp";

interface IMDEditorProps {
    itemType: string,
    itemIndex: number,
    value: string,
    setProjectItem: (itemIndex:number, itemType: string, value: string) => void,
    pushToInstanceList?: (instance: any) => void
}

/**
 * 基于Markdown和SimpleMDEReact的富文本编辑器，用于记录项目式学习项目。
 * 原本配有基于localstorage的自动保存功能，但目前暂时无法使用。
 *
 * @class MDEditor
 * @extends {Component<IMDEditor>}
 */
class MDEditor extends Component<IMDEditorProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public getMdeInstance = (instance) =>{
        const { pushToInstanceList } = this.props
        instance.togglePreview()
        pushToInstanceList(instance)
    }
    
    public handleChange = (value) => {
        const { setProjectItem, itemIndex, itemType } = this.props
        setProjectItem(itemIndex, itemType, value)
    }

    public toolbarIcons = [
        "bold", "italic", "strikethrough", "heading", "|", 
        "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "table", "horizontal-rule", "|",
        "preview", "guide"
    ]

    public getDivider = (itemType: string) => {
        const { theme } = this.context;
        if (itemType === "itemContent") {
            return (
                <Divider
                    style={{ color: 'white', ...theme.typographyStyles.title }}
                >
                    内容
                    <Tooltip
                        placement="bottom"
                        title="此处填写项目计划要进行的活动内容"
                    >
                        <Icon style={{marginLeft: "10px"}}>Info</Icon>
                    </Tooltip>
                </Divider>
            )
        }
        if (itemType === "itemRecord") {
            return (
                <Divider
                    style={{ color: 'white', ...theme.typographyStyles.title }}
                >
                    记录
                    <Tooltip
                        placement="bottom"
                        title="此处填写项目进行的实际情况记录，包括进展、感想、学时记录等"
                    >
                        <Icon style={{marginLeft: "10px"}}>Info</Icon>
                    </Tooltip>
                </Divider>
            )
        }
        if (itemType === "itemComment") {
            return (
                <Divider
                    style={{ color: 'white', ...theme.typographyStyles.title }}
                >
                    反馈
                    <Tooltip
                        placement="bottom"
                        title="此处由项目导师填写，包括对项目进展提出反馈意见和认证学时等"
                    >
                        <Icon style={{marginLeft: "10px"}}>Info</Icon>
                    </Tooltip>
                </Divider>
            )
        }
    }

    public render() {
        const { value } = this.props
        const { theme } = this.context;
        if (!this.props.pushToInstanceList) {
            this.getMdeInstance = () => {return}
        }
        return (
            <div>
                {this.getDivider(this.props.itemType)}
                <SimpleMDEReact
                getMdeInstance={this.getMdeInstance}
                className={'CodeMirror'}
                onChange={this.handleChange}
                value={value}
                options={{
                    spellChecker: false,
                    indentWithTabs: false,
                    tabSize: 4,
                    status: ["lines", "words", "cursor"],
                    renderingConfig: {
                        singleLineBreaks: false,
                        codeSyntaxHighlighting: true,
                    },
                    toolbar: this.toolbarIcons
                }}
            />
            </div>
            
        );
    }
}


export default MDEditor;


