import { fetchRequest } from "../util";

export default {
    namespace: 'projectDetail',
    state:
    {
        editMode: false,
        projectInfo: {
            id: 0,
            name: "",
            createdTime: "", //时间处理
            createdByID: 0,
            createdBy: "",
            relatedCourseID: 0,
            relatedCourse: "",
            projectTerm: "",
            projectTermLength: "",
            projectStartDate: "", //时间处理 
            averageIntendedCreditHourPerWeek: 0,
            totalIntendedCreditHour: 0,
            projectMentorID: 0,
            projectMentor: "",
            averageGuidingHourPerWeek: 0,
            projectMeta: {
                projectIntro: "",
                projectGoal: "",
                evaluationSchema: "",
                projectPlan: ""
            },
            projectApprovalInfo: {
                // approvalCommitteeOfAcademics: {
                //     result: "",
                //     advice: ""
                // },
                approvalMentor: {
                    result: "",
                    advice: ""
                }
            },
            coverImageURL: ""
        },
        projectItems: [
        ]
    },
    reducers: {
        setField(state, action) {
            const {name, value} = action;
            let newState = {...state, dirty: true}
            newState[name] = value
            return newState;
        },
        batchSetField(state, action) {
            const {fields} = action;
            let obj = {};
            fields.map(f => (obj[f.name] = f.value));
            let newState = Object.assign({}, state, obj);
            return Object.assign({}, newState, {dirty:true});
        },
        setItemContent(state, action) {
            const {index, value} = action;
            let newState = {...state, dirty: true}
            newState.projectItems[index].itemContent = value;
            return newState
        },
        setItemRecord(state, action) {
            const {index, value} = action;
            let newState = {...state, dirty: true}
            newState.projectItems[index].itemRecord = value;
            return newState
        },
        setItemComment(state, action) {
            const {index, value} = action;
            let newState = {...state, dirty: true}
            newState.projectItems[index].itemComment = value;
            return newState
        },
        // reset(state, action) {
        //     let newState = Object.assign({}, state, state.)
        // }
        addProjectItem(state, action) {
            let newState = {...state, dirty: true}
            newState.projectItems.push(
                {
                    itemTitle: "New Item",
                    itemStartDate: new Date().toLocaleDateString(),
                    itemEndDate: new Date().toLocaleDateString(),
                    itemContent: "",
                    itemRecord: "",
                    itemComment: ""
                }
            )
            return newState
        },
        setItemStartDate(state, action){
            const { index, value } = action
            let newState = {...state, dirty: true}
            newState.projectItems[index].itemStartDate = value
            return newState
        },
        setItemEndDate(state, action){
            const { index, value } = action
            let newState = {...state, dirty: true}
            newState.projectItems[index].itemStartDate = value
            return newState
        },
        setItemTitle(state, action){
            const { index, value } = action
            let newState = {...state, dirty: true}
            newState.projectItems[index].itemTitle = value
            return newState
        }
    },
    effects: {
        * loadProject ( action, { select, call, put }) {
            const { projectId } = action
            const { data } = yield call(() => 
                fetchRequest(`/v1/project/${projectId}`, "GET")
                .then(data => ({data: data}))
                .catch(e => ({ error: e}))
            );
            const projectInfo = {
                id: data.id,
                name: data.name,
                status: data.status,
                createdTime: data.createdTime,
                createdByID: data.createdByID,
                createdBy: data.createdBy,
                relatedCourseID: data.relatedCourseID,
                relatedCourse: data.relatedCourse,
                projectTerm: data.projectTerm,
                projectTermLength: data.projectTermLength,
                projectStartDate: data.projectStartDate, //时间处理 
                averageIntendedCreditHourPerWeek: data.averageIntendedCreditHourPerWeek,
                totalIntendedCreditHour: data.totalIntendedCreditHour,
                projectMentorID: data.projectMentorID,
                projectMentor: data.projectMentor,
                averageGuidingHourPerWeek: data.averageGuidingHourPerWeek,
                projectMeta:data.projectMeta,
                projectApprovalInfo:data.projectApprovalInfo,
                conclusionInfo:data.conclusionInfo,
                lastUpdatedTime: data.lastUpdatedTime,
                coverImageURL: data.coverImageURL
            }
            const projectItems = data.content
            yield put({ type: "setField", name: "projectInfo", value: projectInfo || [] })
            yield put({ type: "setField", name: "projectItems", value: projectItems || [] })
        }
    }
}