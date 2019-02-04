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
                ApprovalCommitteeOfAcademics: {
                    result: "通过",
                    advice: "这是学术委员会审核建议！"
                },
                ApprovalMentor: {
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
    }

}