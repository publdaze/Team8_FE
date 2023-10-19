import React, { ChangeEvent, RefObject, useState } from 'react';
import { Collapse, Textarea } from '@material-tailwind/react';
import { MdSend, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import LEVELCOLOR from '../utils/constant';
import Comment from './Comment';

interface Comment {
  commentId: number;
  nickName: string;
  memberLevel: number;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  commentRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  onCommentClose: () => void;
  comments: Comment[];
}

const Comments = ({ commentRef, isOpen, onCommentClose, comments }: CommentsProps) => {
  const [text, setText] = useState<string>('');

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Textarea 높이 자동 조절
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <Collapse ref={commentRef} open={isOpen} className='relative mb-12'>
      <button type='button' className='absolute top-4 right-4' onClick={onCommentClose}>
        <MdOutlineKeyboardArrowUp className='text-xl' />
      </button>
      <p className='pt-4 pl-4 font-bold border-t'>댓글 {comments.length}</p>
      <ul className='flex flex-col gap-4 p-4'>
        {comments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} />
        ))}
      </ul>
      <div className='relative flex gap-3 p-4 border-t'>
        <div className={`mt-1 w-8 h-8 ${LEVELCOLOR[1]} border rounded-full shrink-0`} />
        <Textarea
          className='min-h-full max-h-60 text-lg border focus:!text-black'
          rows={3}
          resize
          label='댓글 작성'
          value={text}
          onChange={handleChangeText}
        />
        <button
          type='submit'
          disabled={!text}
          className={`absolute right-5 bottom-7 p-[6px] rounded-full ${text ? 'hover:bg-gray-200' : ''}`}
        >
          <MdSend className={`text-xl transition-all ${text ? 'text-black' : 'text-gray-400'}`} />
        </button>
      </div>
    </Collapse>
  );
};

export default Comments;
