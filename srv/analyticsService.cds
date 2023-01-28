using { smartcanteen.db as data } from '../db/schema';

service APIAnalytics @(path:'/API_Analytics') {
    /** @insertonly */
    /** exploiting the analytics received from the SAC and than stored to the HANA Cloud*/
    entity timePredicition as projection on data.occupanciesAnalytics;
}