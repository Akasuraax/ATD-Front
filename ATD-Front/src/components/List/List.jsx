import './list.css';
import { useState } from 'react';
import {useTranslation} from "react-i18next";

function List({ data, column, actions, add, filter, itemsPerPage = 50}) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const numPages = Math.ceil(data.length / itemsPerPage);

    const nextPage = () => {
        if(currentPage + 1 <= numPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if(currentPage-1 > 0) setCurrentPage(currentPage - 1);
    };

    const goTo = (index) => {
        if(index > 0 && index <= numPages)setCurrentPage(index);
    }


    const { t } = useTranslation();

    const search = t("list.search")
    const searchPlaceHolder = t("list.searchPlaceHolder")
    const filterTitle = t("list.filter");

    return (
            <div className="list relative overflow-x-auto sm:rounded-lg max-w-5xl">
                <div className="search-zone pb-4 bg-white dark:bg-gray-900 flex items-center">
                    <div>
                        <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"
                                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                                type="button">
                            <span className="sr-only">Action button</span>
                            {filterTitle}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                {filter.map((element, index) => (
                                    Object.entries(element).map(([_, value]) => (
                                        <li key={index}>
                                            <a href="#"
                                               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{value}</a>
                                        </li>
                                    ))
                                ))}
                            </ul>
                        </div>
                    </div>
                    <label htmlFor="table-search" className="sr-only">{search}</label>
                    <div className="relative max-w-72 flex-1">
                        <div
                            className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search"
                               className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder={searchPlaceHolder}/>
                    </div>
                    <div className="flex-grow"></div>
                    {
                        add && add.length > 0 &&
                        <div className="ml-auto mr-2">
                            {add.map((action, actionIndex) => (
                                <button key={actionIndex} onClick={action.onClick}
                                        className="add-btn bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold ml-2 py-2 px-2.5 rounded">
                                    {Object.values(action.label)}
                                </button>
                            ))}
                        </div>
                    }
                </div>

                <table className="mt-5 text-sm text-left">
                    <thead className="">
                    <tr>
                        {column.map((column, index) => (
                            // eslint-disable-next-line no-unused-vars
                            Object.entries(column).map(([_, value]) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {value}
                                </th>
                            ))
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((person, _) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {Object.entries(person).map(([key, value]) => (
                                <td key={key} className="px-6 py-4">
                                    {value}
                                </td>
                            ))}
                            <td className="float-right py-4">
                                {actions.map((action, actionIndex) => (
                                    <button key={actionIndex} onClick={() => action.onClick(person)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-2 py-2 px-4 rounded">
                                        {Object.values(action.label)}
                                    </button>
                                ))}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <nav className="flex justify-center mt-6">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <a onClick={prevPage} href="#"
                               className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" d="M5 1 1 5l4 4"/>
                                </svg>
                            </a>
                        </li>

                        {
                            Array.from({ length: numPages }, (_, index) => (
                            <li key={index}>
                                <a href="#" onClick={()=>{goTo(index+1)}}
                                   className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    {index + 1}
                                </a>
                            </li>
                        ))}


                        <li>
                            <a onClick={nextPage} href="#"
                               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" d="m1 9 4-4-4-4"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
    );
}

export default List;
