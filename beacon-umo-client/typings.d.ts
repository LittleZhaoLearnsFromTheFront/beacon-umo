import '@umijs/max/typings';
interface FetchOption extends RequestInit {
    blob?: boolean;
    notLoading?: boolean;
}