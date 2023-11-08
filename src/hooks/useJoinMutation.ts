import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joinGroupFn } from '@apis/groupApi';
import { GROUP_EXIST_NICKNAME_ERROR_MSG } from '@constants/errorMsg';

interface NickNameInput {
  nickName: string;
}

interface UseJoinMutation {
  groupId: number;
  groupName: string;
  nickName: string;
  setError: UseFormSetError<NickNameInput>;
  onIsRegisteredAlertChange: () => void;
}

const useJoinMutation = ({ groupId, groupName, nickName, setError, onIsRegisteredAlertChange }: UseJoinMutation) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => joinGroupFn({ groupId, nickName }),
    onSuccess: () => {
      navigate(`/${groupId}/${groupName}`, { replace: true });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.error;
        const { message, status } = errorData;
        if (status === 400) {
          switch (message) {
            case '해당 닉네임은 이미 사용중입니다.':
              setError(
                'nickName',
                {
                  type: 'exist',
                  message: GROUP_EXIST_NICKNAME_ERROR_MSG,
                },
                {
                  shouldFocus: true,
                },
              );
              break;
            case '이미 가입된 회원입니다.':
              onIsRegisteredAlertChange();
              break;
            default:
              break;
          }
        }
      }
    },
  });
};

export default useJoinMutation;
