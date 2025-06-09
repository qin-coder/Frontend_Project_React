import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import message from 'antd/es/message';
import { publishArticleAPI } from '@/apis/article';
import { useChannel } from '@/hooks/useChannel';
import { useSearchParams } from 'react-router-dom';
import { getArticleDetailAPI } from '@/apis/article';
import { type } from '@testing-library/user-event/dist/type';

const { Option } = Select;

const Publish = () => {
  //获取频道列表
  const { channelList } = useChannel();
  // 提交表单
  const onFinish = (formValue) => {
    //校验封面类型imageType是否和实际图片列表imageList数量相等
    if (imageList.length !== imageType)
      return message.warning(
        'Please select the correct number of images based on the selected cover type!'
      );
    const { title, content, channel_id } = formValue; // 解构formValue获取表单数据
    console.log('Form submitted:', formValue);
    // 在这里可以处理提交逻辑，比如调用API提交数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType, //
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url; // 如果是上传后的图片，使用返回的URL
          } else {
            return item.url; // 如果是本地图片，直接使用URL
          }
        }), // 提交图片的URL
      },
      channel_id,
    };
    // 调用发布文章的API
    publishArticleAPI(reqData);
  };
  const [imageList, setImageList] = useState([]);
  const onChange = (info) => {
    setImageList(info.fileList);
  };
  // 处理图片上传类型变化
  const [imageType, setImageType] = useState(0); // 默认无图
  const onTypeChange = (e) => {
    setImageType(e.target.value);
  };
  //回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
  const [form] = Form.useForm();
  useEffect(() => {
    //1. 获取文章ID
    async function getArticleDetail() {
      const res = await getArticleDetailAPI(articleId);

      const { cover, ...formValue } = res.data;
      // 设置表单数据
      form.setFieldsValue({
        ...formValue,
        type: cover.type, // 设置封面类型
      });
      // 设置图片列表
      setImageType(cover.type); // 封面类型
      setImageList(
        cover.images.map((url) => {
          return { url };
        })
      ); // 封面list
    }
    if (articleId) {
      // 拉取数据回显
      getArticleDetail();
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>Home</Link> },
              { title: `${articleId ? 'Edit Article' : 'Publish Article'}` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }} // 默认无图
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please input title of article' },
            ]}
          >
            <Input
              placeholder="Please input title of article"
              style={{ width: 400 }}
            />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[
              { required: true, message: 'Please select article channel' },
            ]}
          >
            <Select
              placeholder="Please select article channel"
              style={{ width: 400 }}
            >
              /* value 属性用户选中之后会自动收集起来作为接口提交字段 */
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>single pic </Radio>
                <Radio value={3}>tripple pic</Radio>
                <Radio value={0}>none </Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType 上传图片的样式，picture-card表示图片卡片样式 */}
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                name="image"
                onChange={onChange}
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[
              { required: true, message: 'Please input content of article' },
            ]}
          >
            {/* update form */}

            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please input content of article"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Publish Article
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
