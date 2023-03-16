import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Routes, Route, Outlet } from 'react-router-dom';
// import { DataProvider } from './context/DataContext-backup';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions(actions => actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  const Layout = () => {
    return (
      <div className="App">
        <Header
          title="React JS Blog"
        />
        <Nav />
        <Outlet />
        <Footer />
      </div>
    );
  };

  return (
    // <DataProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home
          isLoading={isLoading}
          fetchError={fetchError}
        />} />
        <Route path="about" element={<About />} />
        <Route path="post" element={<NewPost />} />
        <Route path="edit/:id" element={<EditPost />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    // </DataProvider>
  );
}

export default App;