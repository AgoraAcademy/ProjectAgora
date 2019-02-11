export default {
    namespace: 'course',
    state:
    {
        editMode: false,
        courseInfo: {
            id: 1,
            name: "摄影",
            createdTime: "8102年1月1日", //时间处理
            createdByID: 1,
            createdBy: "肖春腾",
            creditHour: 0,
            courseTimeShift: "自由项目",
            courseLengthInWeeks: 0,
            formAndEvaluation: "3学期",
            goalOfcourse: "8102年1月1日", //时间处理 
            objectivesOfInstruction: "1",
            planOfInstruction: 1,
            miscellaneousNote: 1,
        },
        instructions: [
            {
                instructionTitle: "Item1",
                instructionStartDate: new Date().toLocaleDateString(),
                instructionEndDate: new Date().toLocaleDateString(),
                instructionContent: "chushi 1 content" ,
            },
            {
                instructionTitle: "Item2",
                instructionStartDate: new Date().toLocaleDateString(),
                instructionEndDate: new Date().toLocaleDateString(),
                instructionContent: "chushi 2 content",
            },
            {
                instructionTitle: "Item3",
                instructionStartDate: new Date().toLocaleDateString(),
                instructionEndDate: new Date().toLocaleDateString(),
                instructionContent: "chushi 3 content",
            },
            {
                instructionTitle: "Item4",
                instructionStartDate: new Date().toLocaleDateString(),
                instructionEndDate: new Date().toLocaleDateString(),
                instructionContent: "chushi 4 content",
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
        setInstructionContent(state, action) {
            const {index, value} = action;
            let newState = {...state, dirty: true}
            newState.instructions[index].instructionContent = value;
            return newState
        },
        // reset(state, action) {
        //     let newState = Object.assign({}, state, state.)
        // }
        addInstructionItem(state, action) {
            let newState = {...state, dirty: true}
            newState.instructions.push(
                {
                    instructionTitle: "New Item",
                    instructionStartDate: new Date(),
                    instructionEndDate: new Date(),
                    instructionContent: "",
                }
            )
            return newState
        },
        setItemStartDate(state, action){
            const { index, value } = action
            let newState = {...state, dirty: true}
            newState.instructions[index].instructionStartDate = value
            return newState
        },
        setItemEndDate(state, action){
            const { index, value } = action
            let newState = {...state, dirty: true}
            newState.instructions[index].instructionEndDate = value
            return newState
        }
    },
    effects: {
    }

}