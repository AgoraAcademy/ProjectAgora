import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import './MDEditor.less'

interface IMDEditor {
    delay: number,
    value: string,
    options: any,
    id: string
}

class MDEditor extends Component<IMDEditor> {

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
                    ...options
                }}
            />
        );
    }
}

export default MDEditor;


