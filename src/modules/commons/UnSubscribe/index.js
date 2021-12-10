import Button from '@common_button';
import Typography from '@common_typography';
import { unSubscribeNews } from '@core_modules/popular/service/graphql/index';
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Toast from '@core_modules/commons/Toast/index';

const UnSubscribe = () => {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({ message: 'null', code: 0 });

    let res;
    const [gql] = unSubscribeNews();

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const Submit = async () => {
        const { data } = await gql({ variables: { email: value } });
        res = data;
        setOpen(true);
        setState({ message: res.unSubscribe.status.message, code: res.unSubscribe.status.code });
    };
    return (
        <>
            <FormControl>
                <Typography>Unsubscribe Newsletter</Typography>
                <TextField onChange={handleChange} id="email" />
                <Button onClick={Submit}>
                    Unsubscribe
                </Button>
                <Toast
                    variant={state.code === 200 ? 'success' : 'error'}
                    message={state.message}
                    open={open}
                    setOpen={setOpen}
                />

            </FormControl>
        </>
    );
};
export default UnSubscribe;
