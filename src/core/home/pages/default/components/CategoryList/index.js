/* eslint-disable consistent-return */
import { modules } from '@config';
import gqlService from '../../../../service/graphql';

const CategoryList = ({
    storeConfig, t, CategoryListSkeleton, ErrorInfo, CategoryListView,
}) => {
    const { home } = modules;
    const { loading, data, error } = gqlService.getCategoryList({
        url_key: home.categoryList.url_key,
    });

    if (loading && !data) return <CategoryListSkeleton />;
    if (error) {
        return (
            <ErrorInfo variant="error" text={t('home:errorFetchData')} />
        );
    }
    if (!data || data.categoryList.length === 0) {
        return (
            <ErrorInfo variant="warning" text={t('home:nullData')} />
        );
    }

    if (!loading && data && data.categoryList.length > 0) {
        return (
            <>
                {data.categoryList[0].children.map((category, i) => (
                    <CategoryListView
                        storeConfig={storeConfig}
                        imageSrc={category.image_path}
                        name={category.name}
                        description={category.description}
                        url={category.url_path}
                        key={i}
                    />
                ))}
            </>
        );
    }
};

export default CategoryList;
