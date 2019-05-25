import React from "react";

const Posts = ({ children, title }) => {
  return (
    <div className="posts">
      <h1 className="content-subhead">{title}</h1>
      {children}
    </div>
  );
};

const Tag = ({ label }) => (
  <a class="post-category post-category-pure" href="#">
    {label}
  </a>
);

export const Post = ({
  postTitle,
  description,
  link,
  author = "Peter Yuan",
  tags = []
}) => {
  return (
    <a className="post" href={link} style={{ textDecorationLine: "none" }}>
      <header className="post-header">
        <h2 className="post-title">{postTitle}</h2>
        <p class="post-meta">
          By
          <a href="#" class="post-author" style={{ marginLeft: 10 }}>
            {author}
          </a>
          {tags.length > 0 && "under"}
          {tags.map((t, idx) => (
            <Tag label={t} key={idx} />
          ))}
        </p>
      </header>
      <div className="post-description">{description}</div>
    </a>
  );
};

export default Posts;
