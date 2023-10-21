import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowCircleRight } from 'react-icons/md';

import { getPageInfo } from '@dummy/page';
// import { getEmptyPageInfo } from '@dummy/page';
import PageTitleSection from '@components/PageTitleSection';
import PageContainer from '@components/PageContainer';
import Post from '@components/Post';
import { Button } from '@material-tailwind/react';

const GroupMainPage = () => {
  const navigate = useNavigate();
  const { groupName, page } = useParams();

  if (!groupName) return null;

  const { pageName, pageId, postList } = getPageInfo(page ?? groupName);
  // const { pageName, pageId, postList } = getEmptyPageInfo(page ?? groupName);

  const handleWriteClick = () => {
    navigate('개요/edit', {
      state: { pageId, index: '1.', pageName, postTitle: '개요', content: '' },
    });
  };

  return (
    <div className='mx-auto 2xl:max-w-screen-xl xl:max-w-screen-lg'>
      <PageTitleSection title={pageName} />
      <PageContainer pageId={postList.length !== 0 ? pageId : undefined} hasRecentChangeList>
        {postList.length !== 0 ? (
          postList.map((post) => (
            <Post
              key={post.postId}
              pageId={pageId}
              pageName={pageName}
              index={post.index}
              postTitle={post.postTitle}
              content={post.content}
            />
          ))
        ) : (
          <article className='flex justify-between items-center p-4 bg-gray-100 rounded-lg px-4'>
            <p className='text-sm shrink-0'>
              <span className='font-bold'>{`"${page ?? groupName}"`}</span>에 새로운 글을 작성해보세요!
            </p>
            <Button
              variant='text'
              ripple={false}
              className='group flex items-center gap-1 py-1 px-2 text-sm font-bold hover:bg-transparent active:bg-transparent shrink-0'
              onClick={handleWriteClick}
            >
              <span>글쓰기</span>
              <MdArrowCircleRight className='w-5 h-5 group-hover:animate-arrowBounce' />
            </Button>
          </article>
        )}
      </PageContainer>
    </div>
  );
};

export default GroupMainPage;
