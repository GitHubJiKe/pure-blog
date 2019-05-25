import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import Posts, { Post } from "./components/Posts";
import posts from "./jsons/posts.js";
import recentlys from "./jsons/recentlys.js";
const NAVS = [
  {
    label: "github",
    url: "https://github.com/GitHubJiKe"
  },
  {
    label: "知乎",
    url: "https://www.zhihu.com/people/ji-ke-yuan/activities"
  }
];

function App() {
  return (
    <Layout>
      <SideBar navs={NAVS} />
      <Content>
        {recentlys.length > 0 && (
          <Posts title="最近更新">
            {recentlys.map((p, idx) => (
              <Post key={idx} {...p} />
            ))}
          </Posts>
        )}
        {posts.length > 0 && (
          <Posts title="全部日志">
            {posts.map((p, idx) => (
              <Post key={idx} {...p} />
            ))}
          </Posts>
        )}
      </Content>
    </Layout>
  );
}

export default App;
