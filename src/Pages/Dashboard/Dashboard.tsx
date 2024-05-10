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
import SocialMedia from '../SocialMedia/SocialMedia';

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

          <Route path="/blog">
            <Route path="" element={<Blog />} />
            <Route path="edit/:id" element={<EditBlog />} />
            <Route path="new" element={<NewBlog />} />
            <Route path=":componentKey">
              <Route path="" element={<Article />} />
              <Route path="new" element={<NewArticlePost />} />
              <Route path="edit/:id" element={<EditArticlePost />} />
            </Route>
          </Route>

          <Route path="/podcast">
            <Route path="" element={<Podcast />} />
            <Route path="new" element={<NewPodcast />} />
            <Route path="edit/:id" element={<EditPodcast />} />
            <Route path=":componentKey">
              <Route path="" element={<Episode />} />
              <Route path="new" element={<NewEpisodePost />} />
              <Route path="edit/:id" element={<EditEpisodePost />} />
            </Route>
          </Route>

          <Route path="/users">
            <Route path="" element={<Users />} />
            <Route path="new" element={<NewUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>

          <Route path="/pages">
            <Route path="" element={<Pages />} />
            <Route path="new" element={<NewPage />} />
            <Route path="edit/:id" element={<EditPage />} />
          </Route>

          <Route path="/menu">
            <Route path="" element={<Menu />} />
            <Route path="new" element={<NewMenu />} />
            <Route path="edit/:id" element={<EditMenu />} />
          </Route>

          <Route path="/social-media">
            <Route path="" element={<SocialMedia />} />
          </Route>

          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Container>
    </>
  );
}
export default Dashboard;
