import TextInput from '../../components/TextInput/TextInput';
import { useDebouncedState } from '@mantine/hooks';
import { useState } from 'react';
import Button from '../../components/Button/Button';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmitHandler = () => {
        
    };

    return (
        <form className="flex flex-col justify-center items-center h-screen">
            <div className="mb-5 text-lg">Вход в системата</div>
            <TextInput
                required
                label='Потребител'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder='Въведи потребител..'
                type='text'
            />
            <TextInput
                required
                label='Парола'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Въведи парола.."
                type='password'
            />
            <Button onClick={loginSubmitHandler} className="ml-[10rem] mt-2">Вход</Button>
        </form>
    );
};

export default Login;