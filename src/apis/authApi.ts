import { instance } from './axios';

interface AuthInfo {
  email: string;
  password?: string;
  name?: string;
}

const ENDPOINT = '/auth';

export const signUpFn = ({ email, password, name }: AuthInfo) =>
  instance.post(`${ENDPOINT}/signup`, {
    email,
    password,
    nickName: name,
  });

export const loginFn = ({ email, password }: AuthInfo) =>
  instance
    .post(`${ENDPOINT}/signin`, {
      email,
      password,
    })
    .then(({ data }) => data.response);

export const passwordFindFn = ({ email }: AuthInfo) => instance.post(`${ENDPOINT}/password/find`, { email });

export const passwordChangeFn = ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
  instance.patch(`${ENDPOINT}/password/change`, { currentPassword, newPassword });

export const getMyInfoFn = () => instance.get(`${ENDPOINT}/myinfo`).then(({ data }) => data.response);

export const pnuMailAuthFn = ({ email }: { email: string }) => instance.post(`${ENDPOINT}/pusanuniv`, { email });

export const pnuMailCertificationNumberCheckFn = ({
  email,
  certificationNumber,
}: {
  email: string;
  certificationNumber: string;
}) => instance.post(`${ENDPOINT}/pusanuniv/cert`, { email, certificationNumber });

export const nickNameChangeFn = ({ newNickName }: { newNickName: string }) =>
  instance.patch(`${ENDPOINT}/changename`, { newNickName });

export const authDeleteFn = () => instance.delete(`${ENDPOINT}/delete`);

export const kakaoLoginFn = ({ code }: { code: string | null }) =>
  instance.get(`${ENDPOINT}/kakao/signin?code=${code}`).then(({ data }) => data.response);
