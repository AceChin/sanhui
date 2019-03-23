import {post,get} from '@/utils/request.js'
import { Upload } from 'element-ui';
const url = 'http://localhost:7001'

export function getComicInfo(req){
    return post(url+'/api/details',req);
}


// 管理中心
 // 上传漫画
export function UploadComic(req){
    return post(url+'/api/UploadComic',req);
}
// 获取漫画列表
export function getComicList(req){
    return post(url+'/api/getComicList',req);
}
// 添加新漫画
export function addcartoon(req){
    return post(url+'/api/addcartoon',req);
}
// 修改漫画资料
export function updatecartoon(req){
    return post(url+'/api/updatecartoon',req);
}