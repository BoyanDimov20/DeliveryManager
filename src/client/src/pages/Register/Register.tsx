import { useState } from "react";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import TextInput from "../../components/TextInput/TextInput";

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registerSubmitHandler = () => {

    };
    return (
        <>
            <Navigation />
            <form className="flex flex-col justify-center items-center h-screen">
                <div className="mb-5 text-lg">Регистрация в системата</div>
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
                    label='Електронна поща'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Example@gmail.com'
                    type='email'
                />
                <TextInput
                    required
                    label='Адрес'
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder='гр. София, ...'
                    type='text'
                    rows
                />
                <TextInput
                    required
                    label='Парола'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Въведи парола.."
                    type='password'
                />
                <TextInput
                    required
                    label='Потвърди парола'
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Потвърди парола.."
                    type='password'
                />
                <Button className="ml-[9rem] mt-2" onClick={registerSubmitHandler}>Подай</Button>
            </form>
        </>
    );
};


export default Register;