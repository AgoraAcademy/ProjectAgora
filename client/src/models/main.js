import { routerRedux } from "dva/router";

export default {
    namespace: 'main',
    state: {

    },
    reducers: {
        
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
        }
    }

}