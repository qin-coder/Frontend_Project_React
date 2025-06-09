import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import { AuthRoute } from '@/components/AuthRoute';
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// 路由配置
// 注意：使用懒加载时，确保相关组件的路径正确
const Home = lazy(() => import('@/pages/Home'));
const Article = lazy(() => import('@/pages/Article'));
const Publish = lazy(() => import('@/pages/Publish'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: '/',

        element: (
          <Suspense fallback={'loading...'}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/article',
        element: (
          <Suspense fallback={'loading...'}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: '/Publish',
        element: (
          <Suspense fallback={'loading...'}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
