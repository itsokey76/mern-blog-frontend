import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/AuthSlice';

function App() {
  // const isAuth = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
    console.log('yes');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        {/* <Home /> */}
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path="/tags/:tag" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit/" element={<AddPost />} />
          <Route path="/add-post/" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
