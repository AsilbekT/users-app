import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';
import Quote from './components/Quote/Quote';
import QuoteTypes from './components/QuoteTypes/QuoteTypes';
import Review from './components/Review/Review';
import { AuthContextProvider } from './contexts/AuthContext';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { QuoteContextProvider } from './contexts/QuoteContext';

function App() {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <QuoteContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quote" element={<QuoteTypes />} />
              <Route
                path="/quote/view/:id"
                element={<Review />}
              />
              <Route path="/quote/:type" element={<Quote />} />
              <Route path="/reviewer" element={<Home />} />
              <Route path="/reviewer/:id" element={<Review />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </QuoteContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

export default App;
