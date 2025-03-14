// @ts-nocheck
// tslint:disable
/**
 * beacon
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { InlineObject } from '../models';
// @ts-ignore
import { InlineObject1 } from '../models';
// @ts-ignore
import { InlineResponse200 } from '../models';
// @ts-ignore
import { InlineResponse2001 } from '../models';
type CustomPromise<T>={
    code:number,
    success:boolean,
    msg:string,
    data:T,
    time:string,
    error?:string[]
}
/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 登录接口
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLoginPost: async (inlineObject?: InlineObject, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/login`;

            const globalImportUrl={
                parse:(url:string)=>{
                   const query:{[key in string] : string}={}

                   const [path , paramsString] = url.split("?")
                   const params = paramsString?.split('&') || []
                   params.forEach(t=>{
                        const [ k , v ] = t.split('=')
                        query[k] = v
                   })
                   return {
                        query,
                        path
                    }
                },
                format:(obj:{path:string,query:{[key in string]:string}})=>{
                    const {path,query}=obj
                    const queryStringify = Object.entries(query).map(([k,v])=>`${k}=${v}`).join('&')
                    if(!queryStringify) return path
                    return `${path}?${queryStringify}`
                }
            }
            
            const localVarUrlObj = globalImportUrl.parse(localVarPath);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject !== undefined ? inlineObject : {}) : (inlineObject || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 补全用户信息
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserCompletePost: async (inlineObject1?: InlineObject1, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/user/complete`;

            const globalImportUrl={
                parse:(url:string)=>{
                   const query:{[key in string] : string}={}

                   const [path , paramsString] = url.split("?")
                   const params = paramsString?.split('&') || []
                   params.forEach(t=>{
                        const [ k , v ] = t.split('=')
                        query[k] = v
                   })
                   return {
                        query,
                        path
                    }
                },
                format:(obj:{path:string,query:{[key in string]:string}})=>{
                    const {path,query}=obj
                    const queryStringify = Object.entries(query).map(([k,v])=>`${k}=${v}`).join('&')
                    if(!queryStringify) return path
                    return `${path}?${queryStringify}`
                }
            }
            
            const localVarUrlObj = globalImportUrl.parse(localVarPath);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject1 !== undefined ? inlineObject1 : {}) : (inlineObject1 || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 检测当前用户是否存在模版
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserValidateTemplateGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/user/validate-template`;

            const globalImportUrl={
                parse:(url:string)=>{
                   const query:{[key in string] : string}={}

                   const [path , paramsString] = url.split("?")
                   const params = paramsString?.split('&') || []
                   params.forEach(t=>{
                        const [ k , v ] = t.split('=')
                        query[k] = v
                   })
                   return {
                        query,
                        path
                    }
                },
                format:(obj:{path:string,query:{[key in string]:string}})=>{
                    const {path,query}=obj
                    const queryStringify = Object.entries(query).map(([k,v])=>`${k}=${v}`).join('&')
                    if(!queryStringify) return path
                    return `${path}?${queryStringify}`
                }
            }
            
            const localVarUrlObj = globalImportUrl.parse(localVarPath);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 登录接口
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiLoginPost(inlineObject?: InlineObject, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => CustomPromise<InlineResponse200>> {
            const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiLoginPost(inlineObject, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH):CustomPromise<InlineResponse200> => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs) as any;
            };
        },
        /**
         * 
         * @summary 补全用户信息
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserCompletePost(inlineObject1?: InlineObject1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => CustomPromise<object>> {
            const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiUserCompletePost(inlineObject1, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH):CustomPromise<object> => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs) as any;
            };
        },
        /**
         * 
         * @summary 检测当前用户是否存在模版
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserValidateTemplateGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => CustomPromise<InlineResponse2001>> {
            const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiUserValidateTemplateGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH):CustomPromise<InlineResponse2001> => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs) as any;
            };
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 登录接口
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLoginPost(inlineObject?: InlineObject, options?: any): Promise<CustomPromise<InlineResponse200>> {
            return UserApiFp(configuration).apiLoginPost(inlineObject, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 补全用户信息
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserCompletePost(inlineObject1?: InlineObject1, options?: any): Promise<CustomPromise<object>> {
            return UserApiFp(configuration).apiUserCompletePost(inlineObject1, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 检测当前用户是否存在模版
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserValidateTemplateGet(options?: any): Promise<CustomPromise<InlineResponse2001>> {
            return UserApiFp(configuration).apiUserValidateTemplateGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @summary 登录接口
     * @param {InlineObject} [inlineObject] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public apiLoginPost(inlineObject?: InlineObject, options?: any) {
        return UserApiFp(this.configuration).apiLoginPost(inlineObject, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 补全用户信息
     * @param {InlineObject1} [inlineObject1] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public apiUserCompletePost(inlineObject1?: InlineObject1, options?: any) {
        return UserApiFp(this.configuration).apiUserCompletePost(inlineObject1, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 检测当前用户是否存在模版
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public apiUserValidateTemplateGet(options?: any) {
        return UserApiFp(this.configuration).apiUserValidateTemplateGet(options).then((request) => request(this.axios, this.basePath));
    }

}
