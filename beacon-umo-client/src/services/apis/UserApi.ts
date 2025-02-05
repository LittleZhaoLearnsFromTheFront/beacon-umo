/* tslint:disable */
/* eslint-disable */
/**
 * beacon-umo-client
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InlineObject,
    InlineObjectFromJSON,
    InlineObjectToJSON,
    InlineObject1,
    InlineObject1FromJSON,
    InlineObject1ToJSON,
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200ToJSON,
} from '../models';

export interface ApiClientLoginPostRequest {
    inlineObject?: InlineObject;
}

export interface ApiClientRegisterPostRequest {
    inlineObject1?: InlineObject1;
}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     * 登录
     */
    async apiClientLoginPostRaw(requestParameters: ApiClientLoginPostRequest): Promise<runtime.ApiResponse<InlineResponse200>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/client/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObjectToJSON(requestParameters.inlineObject),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse200FromJSON(jsonValue));
    }

    /**
     * 登录
     */
    async apiClientLoginPost(inlineObject?: InlineObject): Promise<InlineResponse200> {
        const response = await this.apiClientLoginPostRaw({ inlineObject: inlineObject });
        return await response.value();
    }

    /**
     * 注册
     */
    async apiClientRegisterPostRaw(requestParameters: ApiClientRegisterPostRequest): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/client/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObject1ToJSON(requestParameters.inlineObject1),
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * 注册
     */
    async apiClientRegisterPost(inlineObject1?: InlineObject1): Promise<object> {
        const response = await this.apiClientRegisterPostRaw({ inlineObject1: inlineObject1 });
        return await response.value();
    }

}
