import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Button } from 'react-uwp'
import { Layout, Row, Col } from 'antd'
import moment from 'moment';
import './Booking.less'

const { Header, Footer, Sider, Content } = Layout;

import { connect } from 'dva'
import RoomList from "../Widget/RoomList";
import BookingCalendar from "../Widget/BookingCalendar";
import RoomCalendarDrawer from "../Widget/RoomCalendarDrawer";


export interface IBookingProps {
    loading: any,
    dispatch: any,
    learnerProfile: object,
}

export interface IBookingState {
    selectedDate: string,
    selectedRoomCode: string,
    selectedRoomName: string,
    drawerVisible: boolean,
}
/**
 *
 * 房间预约模块
 * 
 * @class Booking
 * @extends {React.Component<IBookingProps>}
 */
class Booking extends React.Component<IBookingProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IBookingState = {
        selectedDate: moment().format(),
        selectedRoomCode: "",
        selectedRoomName: "",
        drawerVisible: false,
    }

    public onSelectDate = (date) => {
        this.setState({
            selectedDate: date.format(),
            drawerVisible: true
        })
    }

    public onCloseDrawer = () => {
        this.setState({
            drawerVisible: false
        })
    }

    public onSelectRoom = (roomCode, roomName) => {
        this.setState({
            selectedRoomCode: roomCode,
            selectedRoomName: roomName
        })
        this.props.dispatch({ type:"booking/loadEvents", monthToLoad:this.state.selectedDate.substr(0,7), roomCode})
    }

    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Content>
                <Row type={"flex"} justify={"space-around"}>
                    <Col span={6}>
                        <RoomList
                            selectedRoomCode={this.state.selectedRoomCode}
                            onSelectRoom={this.onSelectRoom}
                        />
                    </Col>
                    <Col span={12}className={this.props.loading.models.booking?"loading-mask": ""}>
                        {this.state.selectedRoomCode? <BookingCalendar
                            selectedRoomCode={this.state.selectedRoomCode}
                            onSelect={this.onSelectDate}
                        />:<div/>}
                    </Col>
                </Row>
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
                <RoomCalendarDrawer
                    selectedDate={this.state.selectedDate}
                    selectedRoomCode={this.state.selectedRoomCode}
                    selectedRoomName={this.state.selectedRoomName}
                    visible={this.state.drawerVisible}
                    onClose={this.onCloseDrawer}
                />
            </Layout>
        );
    }
}

function mapStateToProps({main, learnerProfile, booking, loading}) {
    return { main, learnerProfile, booking, loading }
}

export default connect(mapStateToProps)(Booking)