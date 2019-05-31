import React, { useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import posts from "./jsons/posts.js";
import recentlys from "./jsons/recentlys.js";
import {
  Layout,
  Card,
  Icon,
  Descriptions,
  BackTop,
  Menu,
  Modal,
  Button
} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const DescItem = Descriptions.Item;
const NAVS = [
  {
    label: "github",
    url: "https://github.com/GitHubJiKe",
    icon: "github"
  },
  {
    label: "知乎",
    url: "https://www.zhihu.com/people/ji-ke-yuan/activities",
    icon: "zhihu"
  },
  {
    label: "关于我",
    url: "https://www.zhihu.com/people/ji-ke-yuan/activities",
    icon: "user"
  }
];

const Article = (p, idx) => (
  <Card
    style={{ marginBottom: 10, marginTop: 10 }}
    key={idx}
    title={p.title}
    extra={
      <a href={p.link}>
        <Icon type="read" />
      </a>
    }
  >
    <Descriptions bordered>
      <DescItem label="时间">{p.date}</DescItem>
      <DescItem label="简介">{p.description}</DescItem>
    </Descriptions>
  </Card>
);

function App() {
  const [state, setstate] = useState({ collapsed: false, showModal: false });

  const handleMenuItemClick = nav => {
    const { url, icon } = nav;
    switch (icon) {
      case "github":
      case "zhihu":
        window.open(url);
        break;
      default:
        setstate({ showModal: true });
        break;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          {NAVS.map(nav => (
            <Menu.Item key={nav.label} onClick={() => handleMenuItemClick(nav)}>
              <Icon type={nav.icon} style={{ marginRight: 10 }} />
              <span>{nav.label}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            textAlign: "left",
            color: "white",
            fontSize: 30,
            padding: 0
          }}
        >
          <Icon
            className="trigger"
            type={state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => {
              setstate({ collapsed: !state.collapsed });
            }}
          />
        </Header>
        <Content style={{ padding: 20 }}>
          {recentlys.length > 0 && (
            <Posts title="最近更新">
              {recentlys.map((p, idx) => Article(p, idx))}
            </Posts>
          )}
          {posts.length > 0 && (
            <Posts title="全部日志">
              {posts.map((p, idx) => Article(p, idx))}
            </Posts>
          )}
        </Content>
        <Footer
          style={{
            textAlign: "center",
            position: "fixed",
            zIndex: 1,
            width: "100%",
            bottom: 0
          }}
        >
          power by peter.yuan
        </Footer>
      </Layout>
      <Modal
        visible={state.showModal}
        title="个人信息"
        centered
        onCancel={() => setstate({ showModal: false })}
        footer={[
          <Button onClick={() => setstate({ showModal: false })}>关闭</Button>
        ]}
      />
      <BackTop />
    </Layout>
  );
}

export default App;
