import Navigation from "../../components/Navigation/Navigation";
import { DatePicker } from "@mui/x-date-pickers";
import { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../../components/Button/Button";
import { usePackageHistory } from "../../services/packageService";
import { useQueryClient } from "react-query";
import useDebounceState from "../../hooks/useDebounceState";

const ListIncome = () => {

    const queryClient = useQueryClient();

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const packageHistory = usePackageHistory(startDate, endDate);
    
    const totalCount = packageHistory?.map(x => x.notProcessed.count + x.inStorage.count + x.delivered.count).reduce((a, b) => a + b, 0);
    const totalIncome = packageHistory?.map(x => x.notProcessed.income + x.inStorage.income + x.delivered.income).reduce((a, b) => a + b, 0);
    return (
        <>
            <Navigation />
            <div className="m-4 flex gap-3">
                <DatePicker
                    label="Начална дата"
                    value={startDate}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />} disableHighlightToday={undefined} showDaysOutsideCurrentMonth={undefined} />

                <DatePicker
                    label="Крайна дата"
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />} disableHighlightToday={undefined} showDaysOutsideCurrentMonth={undefined} />
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg">
                                Статус
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Обработени пратки
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-r-lg">
                                Приход
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageHistory?.map(office =>
                            <Fragment key={office.officeId}>
                                <tr className="bg-white border-b border-t mb-10">
                                    <td className="px-6 py-2 whitespace-nowrap text-sm font-thin text-gray-900">{office.officeName}</td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Необработени
                                    </th>
                                    <td className="px-6 py-4">
                                        {office.notProcessed.count}
                                    </td>
                                    <td className="px-6 py-4">
                                        {office.notProcessed.income.toFixed(2)} лв
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        В склад
                                    </th>
                                    <td className="px-6 py-4">
                                        {office.inStorage.count}
                                    </td>
                                    <td className="px-6 py-4">
                                        {office.inStorage.income.toFixed(2)} лв
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Доставени
                                    </th>
                                    <td className="px-6 py-4">
                                        {office.delivered.count}
                                    </td>
                                    <td className="px-6 py-4">
                                        {office.delivered.income.toFixed(2)} лв
                                    </td>
                                </tr>
                            </Fragment>
                        )}

                    </tbody>
                    <tfoot>
                        <tr className="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" className="px-6 py-3 text-base">Общо</th>
                            <td className="px-6 py-3">{totalCount ?? '0'}</td>
                            <td className="px-6 py-3">{totalIncome?.toFixed(2) ?? '0'} лв</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>

    );
};


export default ListIncome;