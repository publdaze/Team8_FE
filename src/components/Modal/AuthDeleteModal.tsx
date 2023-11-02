import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

interface AuthDeleteModalProps {
  isOpen: boolean;
  onClick: () => void;
}

const AuthDeleteModal = ({ isOpen, onClick }: AuthDeleteModalProps) => {
  return (
    <Dialog open={isOpen} handler={onClick} size='xs'>
      <DialogHeader className='justify-center text-lg'>회원탈퇴</DialogHeader>
      <DialogBody className='text-center text-black font-normal'>정말 탈퇴하시겠습니까?</DialogBody>
      <DialogFooter>
        <Button variant='text' ripple={false} color='red' onClick={onClick} className='mr-1'>
          확인
        </Button>
        <Button variant='filled' ripple={false} onClick={onClick}>
          취소
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AuthDeleteModal;
