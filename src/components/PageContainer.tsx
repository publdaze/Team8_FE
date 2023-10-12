import React from 'react';
import RecentChangeList from './RecentChangeList';
import IndexList from './IndexList';

interface PageContainerProps {
  children: React.ReactNode;
  pageId?: number;
  recentChangeList: boolean;
}

const PageContainer = ({ children, pageId, recentChangeList }: PageContainerProps) => {
  return (
    <div className='mx-auto flex w-full max-w-full flex-col xl:flex-row items-start justify-center gap-4 xl:gap-6 2xl:gap-10 px-8 py-10'>
      {pageId && (
        <aside className='sticky w-full top-20 xl:w-44 2xl:w-52 shrink-0'>
          <IndexList pageId={pageId} />
        </aside>
      )}
      <main className='w-full xl:max-w-4xl'>{children}</main>
      {recentChangeList && (
        <aside className='sticky top-20 w-full xl:w-44 2xl:w-52 shrink-0'>
          <RecentChangeList />
        </aside>
      )}
    </div>
  );
};

export default PageContainer;
