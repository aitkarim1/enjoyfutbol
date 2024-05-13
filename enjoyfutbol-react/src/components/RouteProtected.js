import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthUser';

// Componente para rutas protegidas
const ProtectedRoute = () => {
    const { user } = useAuth();

    if (!user.length > 0) {
        // return <Navigate to="/login" />;
    }

    return <Outlet />;
};

// Componente para restringir el acceso a login y registro
const PublicRoute = () => {
    const { user } = useAuth();

    if (user.length > 0) { //
        // return <Navigate to="/" />;
    }

    return <Outlet />;
};

export { ProtectedRoute, PublicRoute };