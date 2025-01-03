/**
 * 返回状态码
 */
export enum HttpStatus {
  /**
   * 操作成功
   */
  SUCCESS = 200,

  /**
   * 资源已被移除
   */
  MOVED_PERM = 301,

  /**
   * 重定向
   */
  SEE_OTHER = 303,

  /**
   * 资源没有被修改
   */
  NOT_MODIFIED = 304,

  /**
   * 请求失败
   */
  BAD_REQUEST = 400,

  /**
   * 未授权
   */
  UNAUTHORIZED = 401,

  /**
   * 访问受限，授权过期
   */
  FORBIDDEN = 403,

  /**
   * 资源，服务未找到
   */
  NOT_FOUND = 404,

  /**
   * 不允许的http方法
   */
  BAD_METHOD = 405,

  /**
   * 资源冲突，或者资源被锁
   */
  CONFLICT = 409,

  /**
   * 不支持的数据，媒体类型
   */
  UNSUPPORTED_TYPE = 415,

  /**
   * 请求频繁
   */
  FREQUENT_REQUESTS = 429,

  /**
   * 系统内部错误
   */
  ERROR = 500,

  /**
   * 接口未实现
   */
  NOT_IMPLEMENTED = 501,

  /**
 * 参数验证不通过
 */
  Validation = 600,

}
