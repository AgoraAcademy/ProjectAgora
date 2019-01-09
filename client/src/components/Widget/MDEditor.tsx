import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './MDEditor.less'

interface IMDEditorProps {
    value:string,
    editmode: string
}

interface IMDEditorState {
    value: string,
    editmode: string
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
    public state: IMDEditorState = { 
        value: this.props.value,
        editmode: this.props.editmode
    };
    

    public controllInstance = (instance) => {
        // You can now store and manipulate the simplemde instance. 
        if (this.state.editmode !== "true") {
        instance.togglePreview()}
    }

    public toolbarIcons = [
        "bold", "italic", "strikethrough", "heading", "|", 
        "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "table", "horizontal-rule", "|",
        "preview", "guide"
    ]

    public render() {
        
        return (
            <SimpleMDEReact
                getMdeInstance={this.controllInstance}
                className={'CodeMirror'}
                onChange={(e)=> this.setState({value: e})}
                value={this.state.value}
                options={{
                    spellChecker: false,
                    indentWithTabs: false,
                    tabSize: 4,
                    status: ["lines", "words", "cursor"],
                    renderingConfig: {
                        singleLineBreaks: false,
                        codeSyntaxHighlighting: true,
                    },
                    toolbar: this.state.editmode? this.toolbarIcons:false 
                }}
            />
        );
    }
}

export default MDEditor;


