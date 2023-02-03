import { useQuery } from "react-query"

type IdentityClaims = {
    isAuthenticated: boolean | undefined,
    username: string | undefined,
    isAdmin: boolean,
    hasAtLeastOnePackage: boolean,
    hasAtLeastOnePackageProcessed: boolean
}

export const useIdentity = () => {
    const { data } = useQuery(['auth', 'me'], getClaims);

    return data as IdentityClaims;
}


function getClaims() {

    return fetch('/api/auth/me')
            .then(x => x.json())
            .catch(() => {});
}