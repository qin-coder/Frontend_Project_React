//封装和文章相关的接口函数
import { request } from '@/utils';

export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  });
}

//3. 发布文章
export function publishArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false', // 发布文章时需要设置draft为false
    method: 'POST',
    data,
  });
}

//4. 获取文章列表
export function getArticleListAPI(params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params,
  });
}

//5. 删除文章
export function deleteArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE',
  });
}
//6. 获取文章详情
export function getArticleDetailAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
  });
}
