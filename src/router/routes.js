import Weather from '@/components/pages/Weather';
import City from '@/components/pages/City';
import Err404 from '@/components/pages/Err404';

export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'City',
            component: City
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