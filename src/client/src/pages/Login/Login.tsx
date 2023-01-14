import TextInput from '../../components/TextInput/TextInput';
import { useDebouncedState } from '@mantine/hooks';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import Navigation from '../../components/Navigation/Navigation';
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginSubmitHandler = async () => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if(response.ok) {
            navigate('/');
            return;
        } 
        
        const error = await response.text();
        setError(error);
    };

    return (
        <>
            <Navigation />
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
                <div style={{color: 'red'}}>{error}</div>
                <Button onClick={loginSubmitHandler} className="ml-[10rem] mt-2">Вход</Button>
            </form>
        </>
    );
};

export default Login;