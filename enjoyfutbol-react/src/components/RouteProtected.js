import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthUser';
import CircularProgress from '@material-ui/core/CircularProgress';

// Componente para rutas protegidas
const ProtectedRoute = () => {
    const { user } = useAuth();
    console.log(user)
    
    if (user === null) { // Si user es null, muestra un indicador de carga
        return <CircularProgress />;
    }

    if (!user) { // Si user es false, redirige a la página de inicio de sesión
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

// Componente para restringir el acceso a login y registro
const PublicRoute = () => {
    const { user } = useAuth();
    console.log(user)
    if (user === null) { // Si user es null, muestra un indicador de carga
        return <CircularProgress />; 
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export { ProtectedRoute, PublicRoute };