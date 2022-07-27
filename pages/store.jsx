import { useState } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import withAuth from '../lib/withAuth';
import StoreItem from '../components/StoreItem';
import { specialCharsRemove } from '../lib/utils';

const STORE_ITEMS = [
  {
    id: '1',
    title: 'Ananas Nana Chilli',
    desc: 'Prelepog mirisa i sjajne teksture otvoriće apetit i učiniće svakodnevnu hranu uzbudljivijom. Spojem egzotičnih papričica i voća, sa našim tajnim miksom začina, dobili smo notu ukusa koja će ulepšati mnoga jela.',
    price: 400,
    amount: '150ml',
    img: '/store/ananas-nana-chilli.png',
  },
  {
    id: '2',
    title: 'Mango Habanero',
    desc: 'Definitivno najpoznatiji sos na svetu. Kako mnogi kažu savršen spoj ukusa. Koristi se širom sveta u različitim kulturama i kuhinjama. Našim spojem ukusa dobili smo pikantni sos sa intezivnim ukusom manga i posebno odabranih začina.',
    price: 400,
    amount: '150ml',
    img: '/store/mango-habanero.png',
  },
  {
    id: '3',
    title: 'Red Fruit Chilli',
    desc: 'Probali smo uz burito, paste, kao dresing za salate i ne znamo šta nam se više sviđa. Verujemo da ćete pronaći svoj spoj ukusa i da ćete dozvoliti sebi da uživate u novim kombinacijama uzbudljivih jela.',
    price: 400,
    amount: '150ml',
    img: '/store/red-fruit-chilli.png',
  },
  {
    id: '4',
    title: 'Jalapeno Sauce',
    desc: 'Od najpoznatije paprike na svetu, stiže nam Jalapeno sos. Za sve gurmane koji su tražili nešto zbog čega njihova hrana više neće biti dosadna. Pikantnog ukusa, prirodne boje i mirisa koji tera vodu na usta, ovaj sos će biti idealan saputnik uz razna jela.',
    price: 400,
    amount: '150ml',
    img: '/store/jalapeno-sauce.png',
  },
  {
    id: '12',
    title: 'Ananas Nana Chilli ',
    desc: 'Prelepog mirisa i sjajne teksture otvoriće apetit i učiniće svakodnevnu hranu uzbudljivijom. Spojem egzotičnih papričica i voća, sa našim tajnim miksom začina, dobili smo notu ukusa koja će ulepšati mnoga jela.',
    price: 400,
    amount: '400ml',
    img: '/store/ananas-nana-chilli.png',
  },
  {
    id: '22',
    title: 'Mango Habanero',
    desc: 'Definitivno najpoznatiji sos na svetu. Kako mnogi kažu savršen spoj ukusa. Koristi se širom sveta u različitim kulturama i kuhinjama. Našim spojem ukusa dobili smo pikantni sos sa intezivnim ukusom manga i posebno odabranih začina.',
    price: 400,
    amount: '400ml',
    img: '/store/mango-habanero.png',
  },
  {
    id: '32',
    title: 'Red Fruit Chilli',
    desc: 'Probali smo uz burito, paste, kao dresing za salate i ne znamo šta nam se više sviđa. Verujemo da ćete pronaći svoj spoj ukusa i da ćete dozvoliti sebi da uživate u novim kombinacijama uzbudljivih jela.',
    price: 400,
    amount: '400ml',
    img: '/store/red-fruit-chilli.png',
  },
  {
    id: '42',
    title: 'Jalapeno Sauce',
    desc: 'Od najpoznatije paprike na svetu, stiže nam Jalapeno sos. Za sve gurmane koji su tražili nešto zbog čega njihova hrana više neće biti dosadna. Pikantnog ukusa, prirodne boje i mirisa koji tera vodu na usta, ovaj sos će biti idealan saputnik uz razna jela.',
    price: 400,
    amount: '400ml',
    img: '/store/jalapeno-sauce.png',
  },
];

function Store() {
  const [filters, setFilters] = useState({
    amount: false,
    title: false,
    byPrice: false,
    searchTerm: false,
  });

  const filteredProducts = STORE_ITEMS.filter((i) => {
    let show = true;

    if (filters.amount) show = show && i.amount === filters.amount;
    if (filters.title) show = show && i.title === filters.title;
    if (filters.price) show = show && i.price === filters.price;

    if (filters.searchTerm) {
      if (!show) return false;
      const search = specialCharsRemove(filters.searchTerm);
      const inTitle = specialCharsRemove(i.title).includes(search);
      if (inTitle) return true;
      return specialCharsRemove(i.desc).includes(search);
    }

    return show;
  });

  return (
    <main className="IndexPage">
      <Head>
        <title>Sauceboss</title>
        <meta
          name="description"
          content="Sauceboss store. Different categories. Different tastes. Buy now."
        />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          pt: 10,
          px: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          margin: '0 auto',
        }}
        maxWidth="lg"
      >
        <Grid container spacing={4} sx={{ pt: { xs: 2, sm: 4, md: 6 } }}>
          <Grid item md={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <Box sx={{ backgroundColor: 'gray', height: '50px' }} boxShadow={4} borderRadius={4} />
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Box
                  component="img"
                  src="/multiple-sauces.jpeg"
                  sx={{ display: 'block', maxWidth: '100%' }}
                  borderRadius={4}
                  boxShadow={4}
                />
              </Grid>

              {STORE_ITEMS.map((i) => (
                <StoreItem key={i.id} {...i} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}

export default withAuth(Store);
