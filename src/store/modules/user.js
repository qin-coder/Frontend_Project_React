//用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit';
import { loginAPI, getUserInfoAPI } from '@/apis/user';
import { removeToken } from '@/utils';
import { setToken as _setToken, getToken } from '@/utils';

const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}, // 用户信息
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },

    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = ''; // 清空token
      state.userInfo = {}; // 清空用户信息}
      removeToken(); // 清除本地存储的token
    },
  },
});

// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm);
    dispatch(setToken(res.data.token));
  };
};
// 异步方法获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getUserInfoAPI();
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo, setToken, clearUserInfo };

export default userReducer;
