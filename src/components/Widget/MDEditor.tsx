import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './MDEditor.less'
import { connect } from "dva";
import { toggleSideBySide, togglePreview } from "simplemde";

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

    public render() {
        const { value } = this.props
        if (!this.props.pushToInstanceList) {
            this.getMdeInstance = () => {return}
        }
        return (
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
        );
    }
}


export default MDEditor;


