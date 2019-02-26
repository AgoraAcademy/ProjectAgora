import { SERVERURL } from '../env'
/**
 * 封装fetch API使其每次成功请求后都会将服务端传来的access_token和refresh_token复制到本地
 *
 * @export
 * @param {*} url
 * @param {*} method
 * @param {string} [params='']
 * @returns
 */
export function fetchRequest(url, method, params: any = '') {
    let header = {
        "Content-Type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': '*',
        "Authorization": window.localStorage.getItem("access_token"),
        "refresh_token": window.localStorage.getItem("refresh_token"),
        "openid": window.localStorage.getItem("openid"), //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };
    console.log('request url:', url, params); //打印请求参数
    if (params == '') { //如果网络请求中带有参数
        return new Promise(function (resolve, reject) {
            fetch(SERVERURL + url, {
                method: method,
                headers: header
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('res:', url, responseData); //网络请求成功返回的数据
                    try{
                        window.localStorage.setItem("access_token", responseData.headers.get("Authorization"))
                        window.localStorage.setItem("refresh_token", responseData.headers.get("refresh_token"))}
                    catch(err){
                        console.log(err)
                    }
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log('err:', url, err); //网络请求失败返回的数据
                    reject(err);
                });
        });
    } else { //如果网络请求中没有参数
        return new Promise(function (resolve, reject) {
            fetch(SERVERURL + url, {
                method: method,
                headers: header,
                body: JSON.stringify(params) //body参数，通常需要转换成字符串后服务器才能解析
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('res:', url, responseData); //网络请求成功返回的数据
                    try{
                        window.localStorage.setItem("access_token", responseData.headers.get("Authorization"))
                        window.localStorage.setItem("refresh_token", responseData.headers.get("refresh_token"))}
                    catch(err){
                        console.log(err)
                    }
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log('err:', url, err); //网络请求失败返回的数据
                    reject(err);
                });
        });
    }
}
