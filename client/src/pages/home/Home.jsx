import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.scss";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";

export default function Home() {
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    const { isLoading, error, data } = useQuery({
        queryKey: ["sauces"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces`, {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }).then((res) => res.json()),
    });

    return (
        <main className="home">
            {isLoading && <Loader />}
            {error && (
                <p className="home_error">
                    Impossible de charger le contenu...
                </p>
            )}
            {data?.length === 0 ? (
                <p className="home_error">Aucune sauce à afficher</p>
            ) : (
                data &&
                data.map((sauce) => <Card key={sauce._id} content={sauce} />)
            
            )}
        </main>
    );
}
