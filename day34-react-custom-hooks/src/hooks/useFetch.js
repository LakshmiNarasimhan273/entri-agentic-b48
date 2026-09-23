import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url){
// fakestoreapi.com/products
// fakestoreapi.com/users
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        setLoading(true);

        axios.get(url).then((response) => {
            setData(response.data);
            setLoading(false);
        }).catch(() => {
            setError("Something went wrong: API Fetching Failed");
            setLoading(false);
        })
    }, [url]);

    return{
        data, loading, error
    }

}

export default useFetch;