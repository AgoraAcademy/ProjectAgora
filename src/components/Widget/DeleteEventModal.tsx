import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { connect } from "dva";
import { Modal, Slider, Row, Col, InputNumber, DatePicker, Select, TimePicker } from "antd";
import { TextBox, DropDownMenu } from "react-uwp";
import { fetchRequest } from "../../util";

interface INewRoomEventModalProps {
    dispatch: any,
    main: any,
    visible: boolean,
    eventToDelete: any,
    selectedRoomCode: string,
    selectedRoomName: string,
    closeModal: () => void
}

interface IDeleteEventModalState {
    confirmLoading: boolean,
}

class DeleteEventModal extends Component<INewRoomEventModalProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType }
    public state: IDeleteEventModalState = {
        confirmLoading: false
    }

    public getOnOk = () => {
        const { dispatch } = this.props
        this.setState({confirmLoading: true})
        let body = {
            changekey: this.props.eventToDelete.changekey
        }
        fetchRequest(`/v1/booking/${this.props.selectedRoomCode}?monthToLoad=${this.props.eventToDelete.startDate}`, "DELETE", body)
        .then(() => {
            this.props.dispatch({ type:"booking/loadEvents", monthToLoad:this.props.eventToDelete.startDate.substr(0,7), roomCode: this.props.selectedRoomCode})
            this.setState({confirmLoading: false})
            this.props.closeModal()
        })
        .catch(e => ({ error: e}))
    }

    public render() {
        return (
            <Modal
                title={`删除  ${this.props.eventToDelete.subject}  (${this.props.eventToDelete.startDate.substring(0, 10)})  `}
                visible={this.props.visible}
                onOk={this.getOnOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={() => {
                    this.props.closeModal()
                }}
            >
                确定删除该预约吗？
            </Modal>
        );
    }
}

function mapStateToProps({main, learnerProfile, booking, loading}) {
    return { main, learnerProfile, booking, loading }
}

export default connect(mapStateToProps)(DeleteEventModal)