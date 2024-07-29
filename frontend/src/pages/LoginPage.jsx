import { Redirect } from 'react-router-dom';

const LoginPage = ({ axiosInstance }) => {

  return <Redirect to={import.meta.env.BASE_URL + "/"} />;
};

export default LoginPage;