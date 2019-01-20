import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './MDEditor.less'

interface IMDEditorProps {
    delay: number,
    value: string,
    options: any,
    id: string,
    editmode: string
}
/**
 * 基于Markdown和SimpleMDEReact的富文本编辑器，用于记录项目式学习项目。
 * 原本配有基于localstorage的自动保存功能，但目前暂时无法使用。
 *
 * @class MDEditor
 * @extends {Component<IMDEditor>}
 */
class MDEditor extends Component<IMDEditorProps> {

    public state = {
        value: localStorage.getItem(`smde_${this.props.id}`) || this.props.value
    };

    public controllInstance = (instance) => {
        // You can now store and manipulate the simplemde instance. 
        if (this.props.editmode !== "true") {
        instance.togglePreview()}
    }

    public render() {
        const { options, delay, id, ...rest } = this.props;
        return (
            <SimpleMDEReact
                getMdeInstance={this.controllInstance}
                className={'CodeMirror'}
                {...rest}
                id={id}
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

                    ...options
                }}
            />
        );
    }
}

export default MDEditor;


