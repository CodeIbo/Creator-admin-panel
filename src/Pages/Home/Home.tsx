import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import moment from 'moment';
import styled from '@emotion/styled';
import useAuth from '../../Services/Hooks/useAuth';
import LinkButton from '../../Components/LinkButton/LinkButton';

const StyledCard = styled(Card)({
  height: '100%',
  backgroundColor: '#131312',
  color: 'white',
});
const StyledCardContent = styled(CardContent)({
  padding: '1.5rem',
});

function Home() {
  const { auth } = useAuth();
  const today = moment().startOf('day').toISOString();
  return (
    <Container>
      <Box sx={{ p: 4, boxShadow: 3, mb: 5 }}>
        <Typography typography="h3" align="center" gutterBottom>
          Welcome {auth.nick_name}
        </Typography>
        {today !== auth.lastVisited && (
          <Typography typography="p" align="center">
            Your last visit was {moment(auth.lastVisited).format('DD-MM-YYYY')}
          </Typography>
        )}
        <Typography typography="p">
          Welcome to the Admin Panel! Here, you have the power to efficiently
          manage and enhance your website content. Each section below allows you
          to perform specific tasks.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography typography="h4" gutterBottom>
                Pages
              </Typography>
              <Typography typography="p" gutterBottom>
                Manage all your website pages, including content and layout.
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LinkButton
                  to="pages"
                  buttonText="Pages"
                  color="success"
                  variant="contained"
                  sx={{ color: 'text.secondary' }}
                />
              </CardActions>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography typography="h4" gutterBottom>
                Blogs
              </Typography>
              <Typography typography="p" gutterBottom>
                Create, edit, and publish blog posts for your audience.
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LinkButton
                  to="blog"
                  buttonText="Blogs"
                  color="success"
                  variant="contained"
                  sx={{ color: 'text.secondary' }}
                />
              </CardActions>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography typography="h4" gutterBottom>
                Podcasts
              </Typography>
              <Typography typography="p" gutterBottom>
                Upload and manage your podcast episodes and details.
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LinkButton
                  to="podcast"
                  buttonText="Podcasts"
                  color="success"
                  variant="contained"
                  sx={{ color: 'text.secondary' }}
                />
              </CardActions>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography typography="h4" gutterBottom>
                Menu Items
              </Typography>
              <Typography typography="p" gutterBottom>
                Edit and organize your website menu items for easy navigation.
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LinkButton
                  to="menu"
                  buttonText="Menu"
                  color="success"
                  variant="contained"
                  sx={{ color: 'text.secondary' }}
                />
              </CardActions>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography typography="h4" gutterBottom>
                Social Media
              </Typography>
              <Typography typography="p" gutterBottom>
                Connect and manage your social media accounts and content.
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LinkButton
                  to="social-media"
                  buttonText="Social Media"
                  color="success"
                  variant="contained"
                  sx={{ color: 'text.secondary' }}
                />
              </CardActions>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography typography="h4" gutterBottom>
                Gallery
              </Typography>
              <Typography typography="p" gutterBottom>
                Upload and organize images in your website gallery.
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LinkButton
                  to="gallery"
                  buttonText="Gallery"
                  color="success"
                  variant="contained"
                  sx={{ color: 'text.secondary' }}
                />
              </CardActions>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
