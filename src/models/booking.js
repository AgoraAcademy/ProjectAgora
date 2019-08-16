import { fetchRequest } from "../util";

export default {
    namespace: 'booking',
    state: {
        loadedEvents: []
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
        * loadEvents (action, { select, call, put}) {
            const { monthToLoad, roomCode } = action
            const { data } = yield call(() => 
                fetchRequest(`/v1/booking/${roomCode}?monthToLoad=${monthToLoad}`, "GET")
                .then(data => ({data: data}))
                .catch(e => ({ error: e}))
            );
            yield put({ type: "setField", name: "loadedEvents", value: data || [] })
        },
        * clearEvents (action, { select, call, put}) {
            yield put({ type: "setField", name: "loadedEvents", value: [] })
        }
    }
}