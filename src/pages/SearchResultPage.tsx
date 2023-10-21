import React from 'react';
import RecentChangeList from '@components/RecentChangeList';
import { MdArrowCircleRight } from 'react-icons/md';
import { pageDummyData } from '@dummy/page';
import { Button } from '@material-tailwind/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SearchResultPage = () => {
  const query = useLocation().search;
  const queries = new URLSearchParams(query);
  const keyword = queries.get('keyword');
  const { groupName } = useParams();
  const navigate = useNavigate();

  const handlePageCreate = () => {
    // 페이지 생성 api 요청하기
    navigate(`/${groupName}/${keyword}`);
  };

  return (
    <div className='w-screen'>
      <main className='flex px-14 min-w-max gap-20'>
        <section className='result w-9/12'>
          <span className='text-3xl font-bold'>{`"${keyword}"`}</span>
          <div className='flex items-center justify-between bg-gray-200 rounded-lg p-4 my-8'>
            <span className='text-sm mr-8'>찾는 페이지가 없다면?</span>
            <Button
              variant='text'
              ripple={false}
              className='group flex items-center gap-1 py-1 px-2 text-sm font-bold hover:bg-transparent active:bg-transparent'
              onClick={handlePageCreate}
            >
              <span>새 페이지 생성하기</span>
              <MdArrowCircleRight className='w-5 h-5 group-hover:animate-arrowBounce' />
            </Button>
          </div>
          {pageDummyData.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-96'>
              <span className='text-xl font-bold mb-4'>검색 결과가 없습니다.</span>
              <span>다른 검색어로 검색하거나 직접 페이지를 만들어보세요.</span>
            </div>
          ) : (
            pageDummyData.map((post) => (
              <div key={post.pageId} className='px-2 py-8 border-b border-gray-200'>
                <h2 className='text-lg font-bold mb-1'>{post.pageName}</h2>
                <p className='text-sm text-gray-500'>{post.content}</p>
              </div>
            ))
          )}
        </section>
        <aside>
          <RecentChangeList />
        </aside>
      </main>
    </div>
  );
};

export default SearchResultPage;
