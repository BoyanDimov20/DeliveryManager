import { useQuery } from "react-query";
import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";

const List = () => {

    const { data, isLoading } = useQuery('users', getUsers);

    async function getUsers() {
        const response = await fetch('/api/users');
        return await response.json();
    }
    

    return (
        <>
            <Navigation />
            {isLoading ? null : <Table title="Списък с пoтребители" labels={data.labels} data={data.data} />}
        </>
    );
};

export default List;