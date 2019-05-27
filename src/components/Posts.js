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
  title,
  description,
  link,
  author = "Peter Yuan",
  date,
  tags = []
}) => {
  return (
    <a className="post" href={link} style={{ textDecorationLine: "none" }}>
      <header className="post-header">
        <h2 className="post-title">{title}</h2>
        <p class="post-meta">
          By
          <a href="#" class="post-author" style={{ marginLeft: 10 }}>
            {author}
          </a>
          {tags.length > 0 && (
            <label style={{ paddingLeft: 10, paddingRight: 10 }}>under</label>
          )}
          {tags.map((t, idx) => (
            <Tag label={t} key={idx} />
          ))}
        </p>
      </header>
      {date && <div className="post-description">{date}</div>}
      {description && <div className="post-description">{description}</div>}
    </a>
  );
};

export default Posts;
