import { useQuery } from "react-query";
import dayjs from "dayjs";

type PackageHistoryProps = {
    officeId: string,
    officeName: string,
    notProcessed: {
        count: number,
        income: number
    },
    inStorage: {
        count: number,
        income: number
    },
    delivered: {
        count: number,
        income: number
    }
}


const getPackageHistory = (startDate: Date | null, endDate: Date | null) => {

    const startDateStr = dayjs(startDate).format("DD.MM.YYYY").toString();
    const endDateStr = dayjs(endDate).format("DD.MM.YYYY").toString();

    return fetch('/api/packages/history', {
        method: 'POST',
        body: JSON.stringify({
            startDate: startDateStr,
            endDate: endDateStr
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(x => x.json())
        .catch(() => { });

};


export const usePackageHistory = (startDate: Date | null, endDate: Date | null) => {
    const { data } = useQuery(['packageHistory', startDate, endDate], () => getPackageHistory(startDate, endDate), {
        staleTime: 60000,
    });

    return data as PackageHistoryProps[];
};

