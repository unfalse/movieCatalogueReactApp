export const fetchMovies = () =>
    fetch("db.json")
        .then(res => {
            return res.json();
        })
        .catch(e => void console.log(e));
