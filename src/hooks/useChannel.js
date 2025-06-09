//封装获取频道列表的逻辑
import { useState, useEffect } from 'react';
import { getChannelAPI } from '@/apis/article';
function useChannel() {
  //1.获取频道列表
  //获取频道列表
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    //1.封装函数，调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels || []); // 确保channels存在
    };
    //2.调用函数
    getChannelList();
  }, []);
  return { channelList };
}

export { useChannel };
