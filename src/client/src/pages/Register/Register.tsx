import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import TextInput from "../../components/TextInput/TextInput";

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registerSubmitHandler = async () => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                firstName,
                lastName,
                address: address,
                password: password,
                confirmPassword: confirmPassword
            })
        });

        if (response.ok) {

            Swal.fire({
                icon: 'success',
                title: 'Успешно!',
                text: 'Регистрацията беше успешна.',
                timer: 1000
            }).then(() => {
                if (!window.localStorage.getItem('registered'))
                    window.localStorage.setItem('registered', 'true');
                navigate('/login');
            });
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Грешка!',
                text: await response.text(),
                timer: 2000
            });
        }
    };
    return (
        <>
            <Navigation />
            <form className="flex flex-col mt-10 items-center h-screen">
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
                <TextInput type="text"
                    label="Име"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Въведи име.." />
                <TextInput type="text"
                    label="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Въведи фамилия" />
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