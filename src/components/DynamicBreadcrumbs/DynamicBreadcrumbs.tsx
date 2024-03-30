import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // Divide a URL em partes

  const breadcrumbs = pathnames.map((value, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`; // Constrói o caminho dinâmico
    const isLast = index === pathnames.length - 1;

    return isLast ? (
      <Typography key={index} color="text.primary">
        {capitalizeFirstLetter(value)}
      </Typography>
    ) : (
      <Link key={index} to={routeTo}>
        {capitalizeFirstLetter(value)}
      </Link>
    );
  });

  return (
  <Stack spacing={2}>
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  </Stack>
  );
}

export default DynamicBreadcrumbs;
