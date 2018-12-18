import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './MDEditor.less'

interface IMDEditorProps {
    delay: number,
    value: string,
    options: any,
    id: string,
}
/**
 * 基于Markdown和SimpleMDEReact的富文本编辑器，用于记录项目式学习项目。
 * 其中使用了localstorage作为缓存实现了自动保存功能，但反馈保存成功信息的部分在多instance的情况下没有办法正确显示
 *
 * @class MDEditor
 * @extends {Component<IMDEditor>}
 */
class MDEditor extends Component<IMDEditorProps> {

    public state = {
        value: localStorage.getItem(`smde_${this.props.id}`) || this.props.value
    };

    public render() {
        const { options, delay, id, ...rest } = this.props;
        return (
            <SimpleMDEReact
                className={'CodeMirror'}
                {...rest}
                id={id}
                value={this.state.value}
                options={{
                    autosave: {
                        enabled: true,
                        uniqueId: id,
                        delay: 1000
                    },
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


