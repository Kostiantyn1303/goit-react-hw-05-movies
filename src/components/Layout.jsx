import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { List, Header, Main } from './Layout.styled';
const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;

  &.active {
    color: orange;
  }
`;
export const Layout = () => {
  return (
    <div>
      <Header>
        <List>
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink to="/movies">Movies</StyledLink>
          </li>
        </List>
      </Header>
      <Main>
        <Suspense>
          <Outlet />
        </Suspense>
      </Main>
    </div>
  );
};
export default Layout;
