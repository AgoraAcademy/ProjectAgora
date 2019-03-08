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
                approvalCommitteeOfAcademics: {
                    result: "",
                    advice: ""
                },
                approvalMentor: {
                    result: "",
                    advice: ""
                }
            }
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
            let rawProjectMeta, rawProjectApprovalInfo, rawConclusionInfo, rawProjectItems
            try {
                rawProjectMeta = JSON.parse(data.projectMeta.replace(/'/g, '"'))
                rawProjectApprovalInfo = JSON.parse(data.projectApprovalInfo.replace(/'/g, '"'))
                rawConclusionInfo = JSON.parse(data.conclusionInfo.replace(/'/g, '"'))
                rawProjectItems = JSON.parse(data.content.replace(/'/g, '"')) 
            console.log(rawProjectItems)
            } catch(e) {
                console.log("发生错误", e)
            }
            // 此处返回时，字段名被connexion变换了命名方式，需要重新手动构建
            const projectMeta = {
                projectIntro: rawProjectMeta.project_intro,
                projectGoal: rawProjectMeta.project_goal,
                evaluationSchema: rawProjectMeta.evaluation_schema,
                projectPlan: rawProjectMeta.project_plan,
            }
            const projectApprovalInfo = {
                approvalCommitteeOfAcademics: rawProjectApprovalInfo.approval_committee_of_academics,
                approvalMentor: rawProjectApprovalInfo.approval_mentor
            }
            const conclusionInfo = {
                mentorEvaluation: rawConclusionInfo.mentor_evaluation,
                selfEvaluation: rawConclusionInfo.self_evaluation
            }
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
                projectMeta,
                projectApprovalInfo,
                conclusionInfo,
                lastUpdatedTime: data.lastUpdatedTime
            }
            const projectItems = rawProjectItems.map((item, index) => {
                return {
                    itemTitle: item.item_title,
                    itemStartDate: item.item_start_date,
                    itemEndDate: item.item_end_date,
                    itemContent: item.item_content,
                    itemRecord: item.item_record,
                    itemComment: item.item_comment
                }
            })
            yield put({ type: "setField", name: "projectInfo", value: projectInfo || [] })
            yield put({ type: "setField", name: "projectItems", value: projectItems || [] })
        }
    }
}