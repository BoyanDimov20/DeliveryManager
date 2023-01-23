import { useQuery } from "react-query"

type IdentityClaims = {
    isAuthenticated: boolean | undefined,
    username: string | undefined,
    isAdmin: boolean
}

export const useIdentity = () => {
    const { data } = useQuery(['auth', 'me'], getClaims);

    return data as IdentityClaims;
}


async function getClaims() {

    const response = await fetch('/api/auth/me');
    return await response.json();
}