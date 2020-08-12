/* eslint-disable jsx-a11y/anchor-is-valid */
import { features } from '@config';
import { getLoginInfo } from '@helpers/auth';
import { setCookies } from '@helpers/cookies';
import { useTranslation } from '@i18n';
import route from 'next/router';
import React from 'react';
import { addWishlist } from '../../services/graphql';
import useStyles from './style';
import ConfigurableOpt from './components/ConfigurableProductItem';

const ProductItem = (props) => {
    const {
        id,
        url_key = '',
        categorySelect,
        review,
        ImageProductView,
        DetailProductView,
        ...other
    } = props;
    const styles = useStyles();
    const { t } = useTranslation(['catalog']);
    const [feed, setFeed] = React.useState(false);
    const [spesificProduct, setSpesificProduct] = React.useState({});

    let isLogin = '';
    if (typeof window !== 'undefined') isLogin = getLoginInfo();
    const [postAddWishlist] = addWishlist();

    const handleFeed = () => {
        if (isLogin && isLogin !== '') {
            postAddWishlist({
                variables: {
                    productId: id,
                },
            })
                .then(async () => {
                    await setFeed(!feed);
                    await window.toastMessage({ open: true, variant: 'success', text: 'add wishlist success' });
                    route.push('/wishlist');
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || 'add wishlist failed',
                    });
                });
        } else if (typeof window.toastMessage !== 'undefined') {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('catalog:wishlist:addWithoutLogin'),
            });
        }
    };

    const handleClick = () => {
        setCookies('lastCategory', categorySelect);
        route.push('/[...slug]', `/${url_key}`);
    };

    const ratingValue = review && review.rating_summary ? parseInt(review.rating_summary, 0) / 20 : 0;
    const DetailProps = {
        spesificProduct, handleClick, handleFeed, ratingValue, feed,
    };
    return (
        <>
            <div className={styles.itemContainer}>
                <div className={styles.imgItem}>
                    <ImageProductView
                        handleClick={handleClick}
                        spesificProduct={spesificProduct}
                        {...other}
                    />
                </div>
                <div className={styles.detailItem}>
                    <DetailProductView
                        {...DetailProps}
                        {...other}
                    />
                    {features.productListing.configurableOptions ? (
                        <ConfigurableOpt
                            setSpesificProduct={setSpesificProduct}
                            {...other}
                        />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ProductItem;