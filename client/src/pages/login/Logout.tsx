import React, { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../service/index.service";

const Logout: FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    logoutUser();
    navigate('/');
    navigate(0);
  }, []);

  return (
    <div className="mx-auto max-w-md space-y-6">
    </div>
  );
};

export default Logout;