import { routerRedux } from "dva/router";
import { fetchRequest } from "../util";

export default {
    namespace: 'main',
    state: {
        instructorIDDict: {
        },
        projectList: [
        ],
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
        },
        * setupProjectList ( action, { select, call, put }) {
            const { projectList } = yield call(() => 
                fetchRequest("/v1/project", "GET")
                .then(list => list.filter(project => (
                    project.createdByID.toString() === localStorage.getItem("learnerId")||
                    project.projectMentorID.toString() === localStorage.getItem("learnerId")
                    )))
                .then(list => ({projectList: list}))
                .catch(e => ({ error: e}))
            );
            yield put({ type: "setField", name: "projectList", value: projectList || [] })
        }
    }
}