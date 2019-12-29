import axios from 'axios';
const sendreq = axios.create({
    baseURL:'https://react-my-burger-ca3b5.firebaseio.com/'
});

export default sendreq ;