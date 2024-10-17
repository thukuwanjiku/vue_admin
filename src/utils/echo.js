import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const pusherKey = '8e37520ff421ebdb4f93';
const pusherCluster = 'ap2';

window.Pusher = Pusher;

const echoInstance = new Echo({
    broadcaster: 'pusher',
    key: pusherKey,
    cluster: pusherCluster,
    encrypted: true,
    forceTLS: true,
});

export default echoInstance;
