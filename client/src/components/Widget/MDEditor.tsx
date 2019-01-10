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
    pushToInstanceList: (instance: any) => void
}

/**
 * 基于Markdown和SimpleMDEReact的富文本编辑器，用于记录项目式学习项目。
 * 当存在多个SimpleMDE实例时，autosave功能无法正常工作，因此启用
 * To-Do：希望能在ProjectDetail顶上的编辑模式按钮集体触发instance.togglePreview()而不是完全重新渲染
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


