import { Route, Routes } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import { ActivateAccountView } from './private/activate/ActivateAccountView';
import { PrivateRoute } from './private/components/PrivateRoute';
import { LogoutView } from './private/logout/LogoutView';
import { ProductsView } from './private/products/ProductsView';
import { ProfileView } from './private/profile/ProfileView';
import { PublicRoute } from './public/components/PublicRoute';
import { HomeView } from './public/HomeView';
import { LoginView } from './public/login/LoginView';
import { PreviewView } from './public/preview/PreviewView';
import { RegisterView } from './public/register/RegisterView';

function App() {
  const { user, setUser } = useUser();

  return (
    <>
      <Routes>
        <Route index element={<HomeView />} />
        <Route path='/' element={<HomeView />} />
        <Route
          element={<PrivateRoute isAllowed={!!user && user.active} redirectPath='/activate' />}
        >
          <Route path='products' element={<ProductsView />} />
          <Route path='profile' element={<ProfileView />} />
          <Route path='logout' element={<LogoutView setUser={setUser} />} />
        </Route>
        <Route element={<PrivateRoute isAllowed={!!user} />}>
          <Route path='activate' element={<ActivateAccountView />} />
        </Route>
        <Route element={<PublicRoute user={user} />}>
          <Route path='login' element={<LoginView setUser={setUser} />} />
          <Route path='register' element={<RegisterView />} />
          <Route path='preview' element={<PreviewView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
