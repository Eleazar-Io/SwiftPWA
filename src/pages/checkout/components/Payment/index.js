import Radio from '@components/Forms/Radio';
import Typography from '@components/Typography';
import TagManager from 'react-gtm-module';
import gqlService from '../../services/graphql';
import DeliveryItem from '../RadioDeliveryItem';

const Payment = ({
    checkout,
    setCheckout,
    updateFormik,
    handleOpenMessage,
    t,
    storeConfig,
    styles,
}) => {
    const { loading, data, selected } = checkout;
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => {} });
    let content;

    const handlePayment = async (val) => {
        const { cart } = checkout.data;
        let state = { ...checkout };
        state.selected.payment = val;
        state.status.backdrop = true;
        setCheckout(state);

        const result = await setPaymentMethod({ variables: { cartId: cart.id, code: val } });

        state = { ...checkout };
        state.status.backdrop = false;
        setCheckout(state);

        if (result) {
            updateFormik(result.data.setPaymentMethodOnCart.cart);
        } else {
            handleOpenMessage({
                variant: 'error',
                text: t('checkout:message:problemConnection'),
            });
        }
        const selectedPayment = data.paymentMethod.filter((item) => item.code === val);
        const dataLayer = {
            event: 'checkout',
            ecommerce: {
                checkout: {
                    actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout' },
                    products: cart.items.map(({ quantity, product, prices }) => ({
                        name: product.name,
                        id: product.sku,
                        price: prices.price.value,
                        category: product.categories.length > 0 ? product.categories[0].name : '',
                        list: product.categories.length > 0 ? product.categories[0].name : '',
                        quantity,
                    })),
                },
                currencyCode: storeConfig.base_currency_code || 'IDR',
            },
        };
        const dataLayerOption = {
            event: 'checkoutOption',
            ecommerce: {
                currencyCode: storeConfig.base_currency_code || 'IDR',
                checkout_option: {
                    actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout_option' },
                },
            },
        };
        TagManager.dataLayer({
            dataLayer,
        });
        TagManager.dataLayer({
            dataLayer: dataLayerOption,
        });
    };

    if (loading.payment || loading.shipping || loading.all) {
        content = <Typography variant="p">Loading</Typography>;
    } else if (data.paymentMethod.length !== 0) {
        content = (
            <>
                <Typography variant="p">{t('checkout:paymentSubtitle')}</Typography>
                <Radio
                    value={selected.payment}
                    onChange={handlePayment}
                    valueData={data.paymentMethod}
                    CustomItem={DeliveryItem}
                    propsItem={{
                        borderBottom: false,
                        RightComponent: true,
                    }}
                />
            </>
        );
    } else {
        content = <Typography variant="p">{t('checkout:noPayment')}</Typography>;
    }

    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:payment')}
            </Typography>
            <div>{content}</div>
        </div>
    );
};

export default Payment;