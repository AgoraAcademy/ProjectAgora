import * as React from "react";
import * as PropTypes from "prop-types";
import { List, Avatar, Icon, Card, Row, Col } from 'antd';
import { connect } from 'dva'
import './RoomList.less'
import { DropDownMenu, ProgressRing } from "react-uwp";
import { fetchRequest } from "../../util";

export interface RoomData {
    description: string,
    email: string,
    name: string,
    roomCode: string
}
export interface RoomListDataEntry {
    listname: string,
    rooms: RoomData[]
}

export interface IRoomListProps {
    dispatch: any,
    learnerProfile: object,
    selectedRoomCode: string,
    onSelectRoom: (roomCode: string, roomName: string) => any
}

export interface IRoomListState {
    selectedListname: string,
    roomlistData: RoomListDataEntry[]
}

class RoomList extends React.Component<IRoomListProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IRoomListState = {
        selectedListname: "",
        roomlistData: []
    }

    public getSelectedListItemStyle = (roomCode: string) => {
        if (this.props.selectedRoomCode === roomCode) {
            return {
                background: "#0078D7"
            } as React.CSSProperties
        }
    }

    public DropdownMenuStyle: React.CSSProperties = {
        margin: "10px 10px 10px 0px",
        lineHeight: "28px",
        width: "75%",
    };

    public componentDidMount = () => {
        fetchRequest(`/v1/booking`, "GET")
        .then((roomlistData) => {
            this.setState({roomlistData})
        })
    }

    public getRoomListName = () => {
        const {roomlistData} = this.state
        let roomListName = ["请选择..."]
        roomlistData.forEach(entry => {
            roomListName.push(entry.listname)
        });
        return roomListName
    }

    public getDataSource = () => {
        const { roomlistData, selectedListname } = this.state
        if (this.state.roomlistData.length === 0) {
            return 
        }
        const selectedListData = roomlistData.filter((entry) => entry.listname === selectedListname)
        if (selectedListData.length === 0) {
            return 
        }
        return selectedListData[0].rooms
    }

    public render(): JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        if (this.state.roomlistData.length === 0) {
            return <ProgressRing style={{margin: "10px"}} size={75} dotsNumber={4} />
        }
        return (
            <div>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={6} style={{textAlign: "left"}}>
                        <span>房间列表</span>
                    </Col>
                    <Col span={18} className='DropDownMenu'>
                        <DropDownMenu
                            style={this.DropdownMenuStyle}
                            itemWidth={270}
                            defaultValue={this.state.selectedListname}
                            values={this.getRoomListName()}
                            onChangeValue={(selectedListname) => this.setState({ selectedListname })}
                        />
                    </Col>
                </Row>
                <List
                    itemLayout="horizontal"
                    pagination={{
                        onChange: (page) => {
                        },
                        pageSize: 8,
                    }}
                    dataSource={this.getDataSource()}
                    renderItem={(item:RoomData) => (
                        <List.Item 
                            style={this.getSelectedListItemStyle(item.roomCode)}
                            className="HoverableListItem"
                            onClick={()=> this.props.onSelectRoom(item.roomCode, item.name)}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

function mapStateToProps({main, learnerProfile}) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(RoomList)