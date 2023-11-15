import { useState } from 'react';

import { Container } from '@mui/material';
import { Route, Routes } from 'react-router';
import TopBar from '../../Components/TopBar/TopBar';
import SideBar from '../../Components/SideBar/SideBar';
import Home from '../Home/Home';
import Blog from '../Blog/Blog';
import EditBlogPost from '../Blog/EditBlogPost';
import NewBlogPost from '../Blog/NewBlogPost';

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
          <Route path="/blog/:id" element={<EditBlogPost />} />
          <Route path="/blog/new" element={<NewBlogPost />} />
        </Routes>
      </Container>
    </>
  );
}
export default Dashboard;
