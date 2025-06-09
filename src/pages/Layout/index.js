import { Layout, Menu, Popconfirm } from 'antd';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './index.scss';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user';
import { useDispatch, useSelector } from 'react-redux';

const { Header, Sider } = Layout;

const items = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Articles management',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Publish article',
    key: '/publish',
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const onMenuClick = (route) => {
    // 这里可以添加路由跳转逻辑
    const path = route.key;
    navigate(path);
    console.log('Menu item clicked:', path);
  };
  //反向高亮
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  //触发用户个人信息
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // 退出登录
  const onConfirm = () => {
    // 清除token
    dispatch(clearUserInfo());
    // 跳转到登录页面
    navigate('/login');
  };
  const name = useSelector((state) => state.user.userInfo.name);
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="Confirm to exit?"
              okText="exit"
              cancelText="cancel"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> Exit
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={currentPath} // 设置选中项
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
