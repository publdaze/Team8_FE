import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, Typography } from '@material-tailwind/react';
import { MdContentCopy } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { fakeCreateGroupFn } from '@apis/groupApi';
// import { createGroupFn } from '@apis/groupApi';

interface GroupCreateCompleteSectionProps {
  groupName: string;
}

const GroupCreateCompleteSection = ({ groupName }: GroupCreateCompleteSectionProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>('');
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
    } finally {
      setIsAlertOpen(true);
    }
  };

  useEffect(() => {
    const groupCreate = async () => {
      try {
        // const response = await createGroupFn(groupInfo);
        const response = await fakeCreateGroupFn();
        setInviteCode(response.inviteCode);
      } catch (error) {
        console.log(error);
      }
    };
    groupCreate();
  }, []);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setIsAlertOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAlertOpen]);

  return (
    <section className='space-y-10 max-w-xl'>
      <div>
        <Typography variant='lead'>
          <strong>{groupName}</strong> 그룹이 생성되었습니다!
        </Typography>
        <Typography variant='paragraph'>초대 링크를 통해 그룹원을 초대해보세요.</Typography>
      </div>
      <Input
        className='truncate outline-none'
        label='초대 링크'
        value={inviteCode}
        size='lg'
        readOnly
        crossOrigin=''
        icon={<MdContentCopy onClick={handleCopy} />}
        onClick={handleCopy}
      />
      <div className='flex justify-end'>
        <Button onClick={() => navigate(`/${groupName}`, { replace: true })}>시작하기</Button>
      </div>
      {isAlertOpen && (
        <Alert
          className='py-3 text-sm fixed top-10 z-30 max-w-xl min-w-max mx-auto bg-gray-200 text-gray-600'
          open={isAlertOpen}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          초대코드가 복사되었습니다.
        </Alert>
      )}
    </section>
  );
};

export default GroupCreateCompleteSection;
