import React from "react";



const Post = ({ id, title, description, url, created_at }: Post) => {
  return (
    <div>
      <p className="text-gray-600 ">
        {created_at && new Date(created_at).toDateString()}
      </p>

      <a href={url} target="_blank" rel="noreferrer noopener">
        <h3 className="w-full font-bold tracking-tight"> {title} </h3>
        <p className="text-gray-600 "> {description} </p>
      </a>
    </div>
  );
};

export default Post;
