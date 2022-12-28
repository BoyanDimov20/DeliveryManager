import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const Login = () => {

    const form = useForm({
        initialValues: {
            username: '',
        },
        validate: {
            username: (value) => value ? null : "Моля въведете потребител"
        }
    })
    return (
        <form className="flex items-center justify-center" onSubmit={() => ''}>
            <TextInput
                withAsterisk
                label="Потребител"
                placeholder=""
            />
        </form>
    );
};

export default Login;