import Navigation from "../../components/Navigation/Navigation";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../../components/Button/Button";

const ListIncome = () => {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

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
                    renderInput={(params) => <TextField {...params} />}
                />

                <DatePicker
                    label="Крайна дата"
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button>Покажи</Button>

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
                        <tr className="bg-white border-b border-t">
                            <td className="px-6 py-2 whitespace-nowrap text-sm font-thin text-gray-900">Лозенец</td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Необработени
                            </th>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                В склад
                            </th>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Доставени
                            </th>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-t">
                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Левски Г</td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Необработени
                            </th>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                В склад
                            </th>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Доставени
                            </th>
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" className="px-6 py-3 text-base">Total</th>
                            <td className="px-6 py-3">3</td>
                            <td className="px-6 py-3">21,000</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>

    );
};


export default ListIncome;