import { nowDateTime } from "@/utils";
import { HttpStatus } from "../constant/HttpStatus";


export default class Result<T> {
  code: number = HttpStatus.SUCCESS;
  success: boolean = true;
  msg: string = 'success';
  data: T = null;
  time: string | null = null;
  error?: string

  constructor(
    code: number = HttpStatus.SUCCESS,
    success: boolean = true,
    msg: string = 'success',
    data: T = null,
    error?: string
  ) {
    this.code = code;
    this.success = success;
    this.msg = msg;
    this.data = data;
    this.time = nowDateTime();
    this.error = error;
  }
  static Success<K = null>(data: K = null) {
    return new Result<K>(HttpStatus.SUCCESS, true, '', data);
  }
  static Error(msg: string = 'error', code: number = HttpStatus.ERROR, error?: string) {
    return new Result(code, false, msg, null, error);
  }

  static BadRequest(msg: string = 'bad request') {
    return new Result(HttpStatus.BAD_REQUEST, false, msg, null);
  }

  static NotFound(msg: string = 'notFound') {
    return Result.Error(msg, HttpStatus.NOT_FOUND);
  }

  static Unauthorized(msg: string = '身份校验不通过！') {
    return Result.Error(msg, HttpStatus.UNAUTHORIZED);
  }

  static Forbidden(msg: string = '您没有权限！') {
    return Result.Error(msg, HttpStatus.FORBIDDEN);
  }

  static Validation(msg: string = '参数校验不通过！', error?: string) {
    return Result.Error(msg, HttpStatus.Validation, error);
  }

  static Frequent(msg: string = '您的ip请求过于频繁!') {
    return Result.Error(msg, HttpStatus.FREQUENT_REQUESTS);
  }
}
