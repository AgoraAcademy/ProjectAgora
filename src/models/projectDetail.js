import { fetchRequest } from "../util";

export default {
    namespace: 'projectDetail',
    state:
    {
        editMode: false,
        projectInfo: {
            id: 1,
            name: "摄影",
            createdTime: "8102年1月1日", //时间处理
            createdByID: 1,
            createdBy: "肖春腾",
            relatedCourseID: 0,
            relatedCourse: "自由项目",
            projectTerm: "2018年冬",
            projectTermLength: "3学期",
            projectStartDate: "8102年1月1日", //时间处理 
            averageIntendedCreditHourPerWeek: 1,
            totalIntendedCreditHour: 1,
            projectMentorID: 1,
            projectMentor: "罗善文",
            averageGuidingHourPerWeek: 1,
            projectMeta: {
                projectIntro: "这是项目介绍！",
                projectGoal: "这是项目目标！",
                evaluationSchema: "这是项目评价标准！",
                projectPlan: "这是项目计划！"
            },
            projectApprovalInfo: {
                approvalCommitteeOfAcademics: {
                    result: "通过",
                    advice: "这是学术委员会审核建议！"
                },
                approvalMentor: {
                    result: "通过",
                    advice: "这是导师审核建议！"
                }
            }
        },
        projectItems: [
            {
                itemTitle: "Item1",
                itemStartDate: new Date().toLocaleDateString(),
                itemEndDate: new Date().toLocaleDateString(),
                itemContent: "chushi 1 content" ,
                itemRecord: "chushi 1 record",
                itemComment: "chushi 1 comment"
            },
            {
                itemTitle: "Item2",
                itemStartDate: new Date().toLocaleDateString(),
                itemEndDate: new Date().toLocaleDateString(),
                itemContent: "chushi 2 content",
                itemRecord: "",
                itemComment: ""
            },
            {
                itemTitle: "Item3",
                itemStartDate: new Date().toLocaleDateString(),
                itemEndDate: new Date().toLocaleDateString(),
                itemContent: "chushi 3 content",
                itemRecord: "",
                itemComment: ""
            },
            {
                itemTitle: "Item4",
                itemStartDate: new Date().toLocaleDateString(),
                itemEndDate: new Date().toLocaleDateString(),
                itemContent: "chushi 4 content",
                itemRecord: "",
                itemComment: ""
            }
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
            const rawProjectMeta = JSON.parse(data.projectMeta.replace(/'/g, '"'))
            const rawProjectApprovalInfo = JSON.parse(data.projectApprovalInfo.replace(/'/g, '"'))
            const rawConclusionInfo = JSON.parse(data.conclusionInfo.replace(/'/g, '"'))
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
            console.log("新的projectInfo", projectInfo)
            yield put({ type: "setField", name: "projectInfo", value: projectInfo || [] })
        }
    }
}