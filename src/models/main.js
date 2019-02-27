import { routerRedux } from "dva/router";
import { fetchRequest } from "../util";

export default {
    namespace: 'main',
    state: {
        instructorIDDict: {
        },
        projectList: [
            {
                "name": "测试项目1",
                "id": 1,
                "createdTime": "创建时间1",
                "createdBy": "创建人1",
                "relatedCourse": "相关课程1",
                "projectMentorID": 1,
                "status": "已完成"
            },
            {
                "name": "测试项目2",
                "id": 1,
                "createdTime": "创建时间1",
                "createdBy": "创建人1",
                "relatedCourse": "相关课程1",
                "status": "已完成"
            },
            {
                "name": "测试项目3",
                "id": 1,
                "createdTime": "创建时间1",
                "createdBy": "创建人1",
                "relatedCourse": "相关课程1",
                "status": "已完成"
            },
            {
                "name": "测试项目4",
                "id": 1,
                "createdTime": "创建时间1",
                "createdBy": "创建人1",
                "relatedCourse": "相关课程1",
                "status": "已完成"
            },
            {
                "name": "测试项目5",
                "id": 1,
                "createdTime": "创建时间1",
                "createdBy": "创建人1",
                "relatedCourse": "相关课程1",
                "status": "已完成"
            },
            {
                "name": "测试项目6",
                "id": 1,
                "createdTime": "创建时间1",
                "createdBy": "创建人1",
                "relatedCourse": "相关课程1",
                "status": "已完成"
            },
        ],
        userlist: [],
    },
    reducers: {
        setField(state, action) {
            console.log("此处action", action)
            const {name, value} = action;
            let newState = {...state}
            newState[name] = value
            return newState;
        },
    },
    effects: {
        * deprecatedRedirect (action, { put }) {
            const { path, reload } = action;
            console.log("redirecting", path, reload )
            yield put(routerRedux.push(path || '/'));
            if(reload) {
                window.location.reload();
            }
        },
        * redirect (action){
            const { path, reload } = action;
            yield window.location.href = path;
            if(reload) {
                window.location.reload();
            }
        },
        * setupInstructorIDDict ( action, { select, call, put }) {
            let instructorIDDict;
            const { data } = yield call(() => 
                fetchRequest("/v1/learner", "GET")
                .then(list => list.filter(learner => learner.isMentor))
                .then(list => ({data: list}))
                .catch(e => ({ error: e}))
            );
            if (data) {
                instructorIDDict = data.reduce((newDict, mentor) => {
                    newDict[`${mentor.familyName}${mentor.givenName}`] = mentor.id
                    return newDict
                },{})
            }
            yield put({ type: "setField", name: "instructorIDDict", value: instructorIDDict })
        }
    }
}