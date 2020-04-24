import axios from "axios";
import { formatSeasons } from '../utils/formatSeasons';

export const FetchShow = (setShow, setSeasons) => {
    return axios
        .get(
            "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes"
        )
        .then(res => {
            setShow(res.data);
			setSeasons(formatSeasons(res.data._embedded.episodes))
        })
        .catch( err => {
            console.log("error fetching data from api, error", err)
            return err;
        })
}