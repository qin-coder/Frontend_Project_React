import { Link } from 'react-router-dom';
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from 'antd';

import { Table, Tag, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import img404 from '@/assets/error.png';
import { useChannel } from '@/hooks/useChannel';
import { useEffect, useState } from 'react';
import { deleteArticleAPI, getArticleListAPI } from '@/apis/article';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const Navigate = useNavigate();
  const { channelList } = useChannel();
  const status = {
    1: <Tag color="warning">Awaiting approval</Tag>,
    2: <Tag color="success">Approved</Tag>,
  };
  // 准备列数据
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: 'State',
      dataIndex: 'status',
      render: (data) => status[data],
    },
    {
      title: 'Release time',
      dataIndex: 'pubdate',
    },
    {
      title: 'number of readers',
      dataIndex: 'read_count',
    },
    {
      title: 'number of commits',
      dataIndex: 'comment_count',
    },
    {
      title: 'number of likes',
      dataIndex: 'like_count',
    },
    {
      title: 'operation',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => Navigate(`/publish?id=${data.id}`)} //别忘了=！
            />
            <Popconfirm
              title="Do you want to delete this article?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 提交筛选表单
  //1.准备参数
  const [reqData, setReqData] = useState({
    status: '', //文章状态
    channel_id: '', //文章频道
    begin_pubdate: '', //开始时间
    end_pubdate: '', //结束时间
    page: 1, //页码
    per_page: 5, //每页数量
  });

  //2.获取筛选数据
  const onFinish = (formValue) => {
    //3.将筛选数据转换为请求参数
    setReqData({
      ...reqData,
      status: formValue.status || '', //文章状态
      channel_id: formValue.channel_id || '', //文章频道
      begin_pubdate: formValue.date
        ? formValue.date[0].format('YYYY-MM-DD')
        : '', //开始时间
      end_pubdate: formValue.date ? formValue.date[1].format('YYYY-MM-DD') : '', //结束时间
    });
    //4.重新拉取文章列表+渲染table逻辑，reqData作为依赖项，变化时重新获取文章列表
  };

  //获取文章列表
  const [list, setList] = useState([]); //文章列表
  const [count, setCount] = useState([]); //文章总数
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData);
      setList(res.data.results || []); // 确保results存在
      setCount(res.data.total_count || 0); // 确保total_count存在
    }
    getList();
  }, [reqData]); // 依赖reqData，当筛选条件变化时重新获取文章列表
  //分页功能
  const onPageChange = (page) => {
    // 更新页码
    setReqData({
      ...reqData,
      page, // 更新页码
    });
  };

  // 删除文章
  const onConfirm = async (data) => {
    await deleteArticleAPI(data.id);
    setReqData({
      ...reqData,
    });
  };
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>Home</Link> },
              { title: 'Article List' },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="State" name="status">
            <Radio.Group>
              <Radio value={''}>All</Radio>
              <Radio value={0}>draft</Radio>
              <Radio value={2}>Approved</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="channel" name="channel_id">
            <Select
              placeholder="Please select the article channel"
              defaultValue=""
              style={{ width: 120 }}
            >
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              screening
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        title={`Your search returned ${count} results based on the filter criteria:`}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
