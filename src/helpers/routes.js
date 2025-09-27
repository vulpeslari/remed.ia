import { useNavigate } from 'react-router-dom';

const useNavigationHelper = () => {
    const navigate = useNavigate();

    return {
        goHome: () => navigate('/home'),
        goReception: () => navigate('/reception'),
        goPatients: () => navigate('/patients'),
        goPatient: (id) => navigate(`/patients/${id}`),
        goRoot: () => navigate('/'),
        
        goBack: () => navigate(-1),
    };
};

export default useNavigationHelper;
