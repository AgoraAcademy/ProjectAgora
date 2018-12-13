import React from 'react'
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import { connect } from 'dva';

interface ITestProps {
    dispatch: any,
    projectDetail: { 
        editMode: boolean,
        projectInfo: object,
        projectItems: IProjectItem[]
    }
}

interface IProjectItem {
    itemTitle: string,
    itemStartDate: string,
    itemEndDate: string,
    itemContent: string,
    itemRecord: string,
    itemComment: string
}

interface ITestState {
    text: string
}

class Test extends React.Component<ITestProps> {
    public state: ITestState = {
        text: ""
    }
    constructor(props) {
        super(props)
    }
    public handleChange = (itemContent) => {
        const { dispatch } = this.props
        dispatch({type: "projectDetail/setItemContent", index:0, value: itemContent})
    }

    public render() {
        const { projectDetail } = this.props
        console.log(this.props.projectDetail.projectItems)
        return (
            <SimpleMDE
                value={projectDetail.projectItems[0].itemContent}
                onChange={this.handleChange}
            />
        )
    }
}

function mapStateToProps({ projectDetail }) {
    return { projectDetail }
}

export default connect(mapStateToProps)(Test)