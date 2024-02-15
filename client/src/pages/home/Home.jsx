import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import SauceService from "../../services/SauceService";
import "./home.scss";

export default function Home() {
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    const { isLoading, error, data } = useQuery({
        queryKey: ["sauces"], queryFn: async () => {
            return await SauceService.getAllSauces(token);
        }
    });

    return (
        <main className="home">
            {isLoading && <Loader />}
            {error && (
                <p className="home_error">
                    Impossible de charger le contenu...
                </p>
            )}
            {data?.length === 0 ?
                <p className="home_error">Aucune sauce à afficher</p>
                : data?.map(sauce => <Card key={sauce._id} content={sauce} />)
            }
        </main>
    );
}
