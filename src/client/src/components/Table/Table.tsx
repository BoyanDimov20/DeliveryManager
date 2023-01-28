import { useNavigate } from "react-router-dom";
import { MouseEvent, useMemo, useState } from 'react'
import Button from "../Button/Button";
import Chip from "../Chip/Chip";

type TableProps = {
    title: string,
    labels: {
        key: string,
        value: string
    }[]
    data: {}[],
    updateHandler: (id: string) => void,
    deleteHandler: (id: string) => void,
    createHandler?: () => void,
    createLabel?: string,
    isEditable: boolean,
    Chips?: JSX.Element[]
};

const Table = ({ title, labels, data, updateHandler, deleteHandler, createHandler, createLabel, isEditable, Chips }: TableProps) => {

    const [filter, setFilter] = useState('');
    function doUpdate(event: MouseEvent<HTMLAnchorElement>, id: string) {
        event.preventDefault();

        updateHandler(id);
    }


    function doDelete(event: MouseEvent<HTMLAnchorElement>, id: string) {
        event.preventDefault();

        deleteHandler(id);
    }

    const filteredData = useMemo(() => filterData(filter), [filter]);

    function filterData(filter: string) {
        const result = [];

        if (filter == '') {
            return data;
        }

        for (const obj of data) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && (obj[key as keyof typeof obj] as string)?.includes(filter)) {
                    result.push(obj);
                }
            }
        }

        return result;
    }

    return (
        <div className="m-4 ">
            <div className="text-lg mb-4">{title}</div>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center pb-4">
                    {createLabel === undefined ? null
                        :
                        <div className="flex gap-5">
                            <Button onClick={createHandler}>{createLabel}</Button>
                            <div className="flex gap-1">{Chips}</div>

                        </div>
                    }

                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" value={filter} onChange={(e) => setFilter(e.target.value)} />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            {labels.map(x =>
                                <th scope="col" className="py-3 px-6" key={x.key}>
                                    {x.value}
                                </th>
                            )}
                            {isEditable ?
                                <th scope="col" className="py-3 px-6">
                                    Действия
                                </th>
                                : null
                            }

                        </tr>
                    </thead>
                    <tbody>

                        {filteredData.map((x, i) =>
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4 w-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>

                                {labels.map(label =>
                                    <td key={label.key} className="py-4 px-6">
                                        {x[label.key as keyof typeof x]}
                                    </td>
                                )}

                                {isEditable ?
                                    <td className="py-4 px-6">
                                        <a onClick={(event) => doUpdate(event, x['id' as keyof typeof x])} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        <a onClick={(event) => doDelete(event, x['id' as keyof typeof x])} className="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                                    </td>
                                    : null
                                }
                            </tr>
                        )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default Table;