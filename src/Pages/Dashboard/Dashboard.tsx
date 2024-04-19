import { useState } from 'react';

import { Container } from '@mui/material';
import { Route, Routes } from 'react-router';

import TopBar from '../../Components/TopBar/TopBar';
import SideBar from '../../Components/SideBar/SideBar';
import Home from '../Home/Home';
import Blog from '../Blog/Blog';
import EditBlog from '../Blog/EditBlog';
import NewBlog from '../Blog/NewBlog';
import Article from '../Article/Article';
import EditArticlePost from '../Article/EditArticle';
import NewArticlePost from '../Article/NewArticle';
import Podcast from '../Podcast/Podcast';
import EditPodcast from '../Podcast/EditPodcast';
import NewPodcast from '../Podcast/NewPodcast';
import Episode from '../Episode/Episode';
import EditEpisodePost from '../Episode/EditEpisode';
import NewEpisodePost from '../Episode/NewEpisode';
import Users from '../Users/User';
import EditUser from '../Users/EditUser';
import NewUser from '../Users/NewUser';
import EditPage from '../CustomPages/EditPage';
import NewPage from '../CustomPages/NewPage';
import Pages from '../CustomPages/Page';
import Gallery from '../Gallery/Gallery';
import Menu from '../Menu/Menu';
import NewMenu from '../Menu/NewMenu';
import EditMenu from '../Menu/EditMenu';

function Dashboard() {
  const [siteBarVisibility, setSideBarVisibility] = useState(false);

  return (
    <>
      <TopBar SideBarHandler={setSideBarVisibility} />
      <SideBar
        sideBarState={siteBarVisibility}
        sideBarHandler={setSideBarVisibility}
      />
      <Container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<EditBlog />} />
          <Route path="/blog/new" element={<NewBlog />} />

          <Route path="/articles" element={<Article />} />
          <Route path="/articles/:id" element={<EditArticlePost />} />
          <Route path="/articles/new" element={<NewArticlePost />} />

          <Route path="/podcast" element={<Podcast />} />
          <Route path="/podcast/:id" element={<EditPodcast />} />
          <Route path="/podcast/new" element={<NewPodcast />} />

          <Route path="/episodes" element={<Episode />} />
          <Route path="/episodes/:id" element={<EditEpisodePost />} />
          <Route path="/episodes/new" element={<NewEpisodePost />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<EditUser />} />
          <Route path="/users/new" element={<NewUser />} />

          <Route path="/pages" element={<Pages />} />
          <Route path="/pages/:id" element={<EditPage />} />
          <Route path="/pages/new" element={<NewPage />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/new" element={<NewMenu />} />
          <Route path="/menu/:id" element={<EditMenu />} />
        </Routes>
      </Container>
    </>
  );
}
export default Dashboard;
