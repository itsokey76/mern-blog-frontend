import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, fetchPosts, fetchTags } from '../redux/slices/PostSlice';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const { data } = useSelector((state) => state.auth);

  // const isTagUrl = location.pathname.includes('/tags/');
  const { tag } = useParams();

  // console.log(location.pathname.includes('/tags/'));

  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState(0);
  useEffect(() => {
    console.log(tag);
    dispatch(fetchPosts({ activeSort, tag }));
    if (tag) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSort, tag]);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { posts, tags, comments } = useSelector((state) => state.posts);

  const isPostLoading = posts.status;
  const isTagsLoading = tags.status;
  const isCommentsLoading = comments.status;
  // console.log(isPostLoading);

  const sortList = ['Новые', 'Популярные'];

  console.log(activeSort);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        {sortList.map((item, i) => {
          return <Tab onClick={() => setActiveSort(i)} label={item} />;
        })}
        {/* <Tab label="Новые" /> */}
        {/* <Tab label="Популярные" /> */}
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading === 'loading' ? [...Array(5)] : posts.items).map((item, i) =>
            isPostLoading === 'loaded' ? (
              <Post
                _id={item._id}
                title={item.title}
                imageUrl={item.imageUrl}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                comments={item.comments}
                tags={item.tags}
                isEditable={data?._id === item.user._id}
              />
            ) : (
              <Post isLoading={true} key={i} />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          {isTagsLoading === 'loading' ? (
            <TagsBlock items={['react', 'typescript', 'заметки']} isLoading />
          ) : (
            <TagsBlock items={tags.items} isLoading={false} />
          )}
          {isCommentsLoading === ' loading' ? (
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Вася Пупкин',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'Это тестовый комментарий',
                },
                {
                  user: {
                    fullName: 'Иван Иванов',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                },
              ]}
              isLoading={true}
            />
          ) : (
            <CommentsBlock items={comments.items} isLoading={false} />
          )}
        </Grid>
      </Grid>
    </>
  );
};
