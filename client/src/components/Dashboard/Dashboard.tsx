import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Dashboard() {
  const { isLoggedIn } = useSelector((state: RootState) => state.session);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === undefined) return;
    if (!isLoggedIn) {
      navigate('/auth', { replace: true });
    }
    setAuthChecked(true);
  }, [isLoggedIn, navigate]);

  if (!authChecked) return <div>Loading...</div>;
  return <div>Dashboard</div>;
}
