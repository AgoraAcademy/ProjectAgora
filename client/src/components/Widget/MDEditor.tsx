import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './MDEditor.less'
import { connect } from "dva";

interface IMDEditorProps {
    itemType: string,
    itemIndex: number,
    projectDetail: any,
}

interface IMDEditorState {
    value: string,
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
        value: this.props.itemType==="itemContent"? this.props.projectDetail.projectItems[this.props.itemIndex].itemContent:this.props.itemType==="itemRecord"?this.props.projectDetail.projectItems[this.props.itemIndex].itemRecord:this.props.itemType==="itemComment"?this.props.projectDetail.projectItems[this.props.itemIndex].itemComment: "",
    };
    

    public getMdeInstance = (instance:any) => {
        return instance
    }
    

    public toolbarIcons = [
        "bold", "italic", "strikethrough", "heading", "|", 
        "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "table", "horizontal-rule", "|",
        "preview", "guide"
    ]

    public shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    public render() {
        console.log("rendering!")
        return (
            <SimpleMDEReact
                getMdeInstance={this.getMdeInstance}
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
                    toolbar: this.toolbarIcons
                }}
            />
        );
    }
}


function mapStateToProps({ projectDetail }) {
    return { projectDetail }
}
export default connect(mapStateToProps)(MDEditor);


