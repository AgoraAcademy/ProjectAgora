import { routerRedux } from "dva/router";

export default {
    namespace: 'main',
    state: {

    },
    reducers: {
        
    },
    effects: {
        * redirect (action, { put }) {
            const { path, reload } = action;
            console.log("redirecting", path, reload )
            yield put(routerRedux.push(path || '/'));
            if(reload) {
                window.location.reload();
            }
        }
    }

}