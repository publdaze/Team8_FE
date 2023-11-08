import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getIndexListFn } from '@apis/pageApi';
import { useQuery } from '@tanstack/react-query';
import { PAGE_KEYS } from '@constants/queryKeys';

interface IndexListProps {
  pageId: number;
}

interface Post {
  postId: number;
  index: string;
  postTitle: string;
}

const scrollToPost = (postId: string) => {
  const postElement = document.getElementById(postId);
  if (postElement) {
    window.scrollTo({ top: postElement.offsetTop - 60, behavior: 'smooth' });
  }
};

const IndexList = ({ pageId }: IndexListProps) => {
  const groupId = useParams<{ groupId: string }>();
  const numGroupId = Number(groupId.groupId);

  const { data, isLoading } = useQuery({
    queryKey: PAGE_KEYS.indexList({ groupId: numGroupId, pageId }),
    queryFn: () => getIndexListFn({ groupId: numGroupId, pageId }),
  });

  const { postList } = data?.data?.response || { postList: [] };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='w-full'>
        <h2 className='font-bold px-1 py-2 text-sm'>목차</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul className='p-2 bg-gray-100 text-xs xl:overflow-auto xl:max-h-[65vh] overflow-hidden scroll'>
            {postList.length !== 0 &&
              postList.map((post: Post) => (
                <li key={uuidv4()} className='m-2 leading-tight overflow-hidden'>
                  <button
                    type='button'
                    onClick={() => scrollToPost(post.postId.toString())}
                    className='whitespace-break-spaces text-left'
                  >
                    <span className='text-indigo-500'>
                      {'  '.repeat(post.index.split('.').length - 1)}
                      {post.index}
                    </span>{' '}
                    {post.postTitle}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </Suspense>
  );
};

export default IndexList;
