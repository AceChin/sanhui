import {post,get} from '@/utils/request.js'
const url = 'http://localhost:7001'

export function login(req){
    return post(url+'/api/login',req);
}
export function register(req){
    return post(url+'/api/register',req);
}
export function getHome(req){
    return post(url+'/api/homePage',req);
}
export function getComicInfo(req){
    return {
        comicName: '某科学的超电磁炮',
        comicAvatar: 'http://mhfm7tel.cdndm5.com/5/4246/20150430154829_450x600_97.jpg',
        comicAuthor: '冬川基,鎌池和馬',
        comicType: '百合,战斗',
        comicState: 1,
        Introduction: '本作与本篇不同，是以御坂美琴为主角的漫画。此外，爱慕美琴的白井黑子也是主角之一。故事发生在面积占据东京都的三分之一，居住着230万名人口，其中八成人口是学生的巨大都市。学院都市和外部隔离，研究最尖端科技。所有学生都接受超能力开发，并大都借由药物、催眠术与通电刺激等方式取得超能力。有各种类型不同能力，，以范围和威力分为无能力者（LV0）、低能力者（LV1）、异能力者（LV2）、强能力者（LV3）、大能力者（LV4）、超能力者（LV5）。每隔一定时间会进行身体检查，重新测定一次。女主角御坂美琴是就读于学园都市名门贵族女校“常盘台中学”的十四岁少女。在学园都市中只有七人的等级五超能力者排行第三。拥有操纵电击的能力，因此被称为“电击使”。本作不但通过美琴的视角来描绘学园城市的日常生活，也叙述了学园城市秘密进行地有非人道性质的关于“妹妹们”（Sisters）的实验，从而使大家对于本作及本篇魔法禁书目录的背景（世界观）的认识也慢慢变得清楚',
      }
}
export function uploadAvatar(req){
    return post(url+'/api/updataAvatar',req);
}
export function getUserInfo(req){
    return post(url+'/api/getUserInfo',req);
}