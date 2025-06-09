//封装高级组件

import { getToken } from '@/utils';
import { Navigate } from 'react-router-dom';

//逻辑：有token,正常跳转，没有token,跳转到登录页面
export function AuthRoute({ children }) {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/login'} replace />;
  }
}
