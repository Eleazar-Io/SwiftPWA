import Layout from '@layout';
import { getPopularItems } from '@core_modules/popular/service/graphql/index';
import UnSubscribe from '@core_modules/commons/UnSubscribe/index';

const Popular = (props) => {
    const config = {
        title: 'Popular',
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
        pageType: 'home',
    };

    const { loading, error, data } = getPopularItems();
    if (loading) return (<>loading</>);
    if (error) return (<>error</>);

    return (
        <Layout {...props} pageConfig={config}>
            {
                data.products.items.map((res) => (
                    <>
                        <h5>{res.name}</h5>
                        <img alt={res.name} width="300" height="300" src={res.image.url} />
                    </>
                ))
            }
            <UnSubscribe />
        </Layout>
    );
};

export default Popular;
