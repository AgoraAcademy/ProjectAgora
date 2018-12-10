export default {
    namespace: 'projectDetail',
    state:
    {
        projectInfo: {},
        projectItems: [
            {
                itemTitle: "",
                itemStartDate: "",
                itemEndDate: "",
                itemContent: {},
                itemRecord: {},
                itemComment: {}
            }
        ]
    },
    reducers: {
        setField(state, action) {
            console.log("此处action", action)
            const {name, value} = action;
            let obj = {};
            obj[name] = value;
            let newState = Object.assign({}, state, obj);
            return Object.assign({}, newState, {dirty: true});
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
            let obj = {};
            obj[index] = value;
            let newState = Object.assign({}, state, obj);
            return Object.assign({}, newState, {dirty: true});
        },
        setItemRecord(state, action) {
            const {index, value} = action;
            let obj = {};
            obj[index] = value;
            let newState = Object.assign({}, state, obj);
            return Object.assign({}, newState, {dirty: true});
        },
        setItemComment(state, action) {
            console.log("此处action", action)
            const {index, value} = action;
            let obj = {};
            obj[index] = value;
            let newState = Object.assign({}, state, obj);
            return Object.assign({}, newState, {dirty: true});
        },
        // reset(state, action) {
        //     let newState = Object.assign({}, state, state.)
        // }

    },
    effects: {
    }

}