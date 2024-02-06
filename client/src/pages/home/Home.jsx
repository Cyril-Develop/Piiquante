import './home.scss';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import Card from '../../components/card/Card';
import Loader from "../../components/loader/Loader";

export default function Home() {

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    const { isLoading, error, data } = useQuery({
        queryKey: ['sauces'],
        queryFn: () =>
            axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces`, {
                headers: {
                    'authorization': `bearer ${token}`
                }
            }).then(res => {
                return res.data;
            })
    });

    return (
        <main className="home">
            {isLoading && <Loader />}
            {error && <p className='home_error'>Impossible de charger le contenu...</p>}
            {data && data.map(sauce =>
                <Card key={sauce._id} content={sauce} />
            )}
        </main>
    )
}