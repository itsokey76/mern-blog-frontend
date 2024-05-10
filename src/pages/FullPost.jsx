import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom/dist';
import axios from '../axios';
import { useSelector } from 'react-redux';

export const FullPost = () => {
  const userData = useSelector((state) => state.auth.data);

  const { id } = useParams();

  const [data, setData] = useState();
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  useEffect(() => {
    // setLoading(true);
    axios.get(`/posts/${id}`).then((item) => {
      setData(item.data.post);
      setComments(item.data.post.comments);
      setIsCommentsLoading(false);
    });
    // .then((item) => setComments(item.data.post));
    // setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return <Post isFullPost isLoading={true} />;
  }
  console.log(value);

  const onSubmit = async () => {
    if (value) {
      setIsCommentsLoading(true);
      const { data } = await axios.post(`/comments/${id}`, {
        text: value,
      });
      setComments(data);
      setValue('');
      setIsCommentsLoading(false);
    }
  };

  return (
    <>
      <Post
        id={id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        comments={data.comments}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>

      <CommentsBlock items={comments} isLoading={isCommentsLoading}>
        {userData && <Index value={value} setValue={setValue} onSubmit={onSubmit} />}
      </CommentsBlock>
    </>
  );
};
