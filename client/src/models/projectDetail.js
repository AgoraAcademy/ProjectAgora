export default {
    namespace: 'projectDetail',
    state:
    {
        editMode: true,
        projectInfo: {},
        projectItems: [
            {
                itemTitle: "Item1",
                itemStartDate: new Date(),
                itemEndDate: new Date(),
                itemContent: "" ,
                itemRecord: "",
                itemComment: ""
            },
            {
                itemTitle: "Item2",
                itemStartDate: new Date(),
                itemEndDate: new Date(),
                itemContent: "",
                itemRecord: "",
                itemComment: ""
            },
            {
                itemTitle: "Item3",
                itemStartDate: new Date(),
                itemEndDate: new Date(),
                itemContent: "",
                itemRecord: "",
                itemComment: ""
            },
            {
                itemTitle: "Item4",
                itemStartDate: new Date(),
                itemEndDate: new Date(),
                itemContent: "",
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
            // 此处Typescript传入的数据要求必须装成对象，因此需要解开成index.index, 以下同样情况
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
                    itemStartDate: new Date(),
                    itemEndDate: new Date(),
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