import * as React from "react";
import * as PropTypes from "prop-types";
import BraftEditor from 'braft-editor'

export interface IRichEditorProps {
    field: object,
    index: number,
    type: "Content" | "Record" | "Comment"
}

interface IRichEditorState {
    readOnly: boolean,
    controls: string[]
}

class RichEditor extends React.Component<IRichEditorProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state : IRichEditorState = {
        readOnly: false,
        controls: []
    }

    public render(): JSX.Element {
        const { theme } = this.context;
        const { field } = this.props
        const { readOnly, controls } = this.state
        console.log("readOnly", readOnly)
        console.log("controls", controls)
        return (
            <BraftEditor
                value={field}
                onChange={this.onChange}
                onSave={this.onSave}
                controls={controls}
                onFocus={this.onActivate}
                onBlur={this.onDeactivate}
            />
        )
    }
    private onChange = () => {
        console.log("onChange")
    }

    private onSave = () => {
        console.log("onSave")
    }

    private onActivate = () => {
        this.setState({
            controls: [
                // 'undo', 'redo', 'separator',
                // 'font-size', 'line-height', 'letter-spacing', 'separator',
                // 'text-color', 'bold', 'italic', 'underline', 
                // 'strike-through', 'separator',
                // 'superscript', 'subscript', 'remove-styles', 
                // 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
                // 'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
                // 'link', 'separator', 'hr', 'separator',
                // 'media', 'separator',
                // 'clear'
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
            ]
        })
    }

    private onDeactivate = () => {
        this.setState({
            controls: []
        })
    }

}

export default RichEditor