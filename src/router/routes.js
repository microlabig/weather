import Weather from '@/components/Weather';
import Search from '@/components/Search';
import Err404 from '@/components/Err404';

export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Search',
            component: Search
        },
        {
            path: '/weather',
            name: 'Weather',
            component: Weather,
            // children: [
            //     {
            //         path: ':city',
            //         name: '', // TODO:
            //         component: null, // TODO:
            //         props: true
            //     }
            // ]
        },
        {
            path: '*',
            name: 'Err404',
            component: Err404
        }

    ]
};