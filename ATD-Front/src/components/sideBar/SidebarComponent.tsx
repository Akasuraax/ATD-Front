import {NavLink} from "react-router-dom";
import {useAuth} from "../../AuthProvider.jsx";
import {useTranslation} from 'react-i18next'
import LanguageSelector from '../LanguageSelector.jsx'
import Error from "../../page/error/error";

'use client';

export default function SidebarComponent() {

    const auth = useAuth();
    const {t} = useTranslation();

    function Acces(roles: number[]) {
        if (!auth.token) return false
        return !(!auth.user.roles.some(userRole => roles.includes(userRole.id)) || !(auth.user.status === 1));
    }

    return (
        <div id="drawer-navigation"
             className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
             tabIndex={-1} aria-labelledby="drawer-navigation-label">
            <h5 id="drawer-navigation-label"
                className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">{t("sidebar.menu")}</h5>
            <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close menu</span>
            </button>
            <div className="py-4 overflow-y-auto">
                <aside id="separator-sidebar"
                       className="fixed top-20 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0"
                       style={{height: 'calc(100vh - 40px)'}}
                       aria-label="Sidebar">
                    <div
                        className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
                        <div>
                            {/* Common */}
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <NavLink to={'/'}
                                             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <i className="fi fi-sr-home"></i>
                                        <span className="ms-3">{t("sidebar.home")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/planning'}
                                             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <i className="fi fi-br-calendar-clock"></i>
                                        <span className="ms-3">{t("sidebar.planner")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/activity'}
                                             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <i className="fi fi-br-picture"></i>
                                        <span className="ms-3">{t("sidebar.activities")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/donation'}
                                             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <i className="fi fi-rr-piggy-bank"></i>
                                        <span className="ms-3">{t("sidebar.donation")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <a href="#"
                                       className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <i className="fi fi-bs-home-location-alt"></i>
                                        <span className="ms-3">{t("sidebar.local")}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <i className="fi fi-br-square-info"></i>
                                        <span className="ms-3">{t("sidebar.about")}</span>
                                    </a>
                                </li>
                                {auth.token ? (
                                    <>
                                        <li>
                                            <NavLink to={`/profile/${auth.user.id}`}
                                                     className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <i className="fi fi-ss-user"></i>
                                                <span className="ms-3">{t("sidebar.profile")}</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/demand"
                                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <i className="fi fi-br-edit"></i>
                                                <span className="ms-3">{t("sidebar.activityRequest")}</span>
                                            </NavLink>
                                        </li>
                                    </>
                                ) : null}
                            </ul>

                            {Acces([2]) ? (
                                <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                                    <h5 id="drawer-navigation-label"
                                        className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">{t("sidebar.volunteer")}</h5>
                                    <li>
                                        <NavLink to={"/visit"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-br-users"></i>
                                            <span className="ms-3">{t("sidebar.personVisit")}</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            ) : null}

                            {/* Admin */}
                            {Acces([1]) ? (
                                <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                                    <h5 id="drawer-navigation-label"
                                        className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">{t("sidebar.admin")}</h5>
                                    <li>
                                        <NavLink to={"/back/users"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-br-users"></i>
                                            <span className="ms-3">{t("sidebar.users")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/events"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-br-calendar-pen"></i>
                                            <span className="ms-3">{t("sidebar.activities")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/demands"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-sr-form"></i>
                                            <span className="ms-3">{t("sidebar.demands")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/roles"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-sr-star"></i>
                                            <span className="ms-3">{t("sidebar.roles")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/vehicles"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-bs-cars"></i>
                                            <span className="ms-3">{t("sidebar.vehicles")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/warehouses"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-sr-warehouse-alt"></i>
                                            <span className="ms-3">{t("sidebar.warehouses")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/recipes"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-rr-ballot"></i>
                                            <span className="ms-3">{t("sidebar.recipes")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/products"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-rr-boxes"></i>
                                            <span className="ms-3">{t("sidebar.products")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/annexes"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-ss-garage-car"></i>
                                            <span className="ms-3">{t("sidebar.annexes")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/languages"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-sr-language"></i>
                                            <span className="ms-3">{t("sidebar.language")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/types"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-rr-ballot-check"></i>
                                            <span className="ms-3">{t("sidebar.types")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/back/pieces"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-sr-add-document"></i>
                                            <span className="ms-3">{t("sidebar.pieces")}</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                        {/* Setting */}
                        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            <LanguageSelector/>
                            {(auth.token) ? (
                                <>
                                    <li>
                                        <NavLink to={"/ticket"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-sr-headset"></i>
                                            <span className="ms-3">{t("sidebar.ticket")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/ticket/suivi"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-ss-ticket-alt"></i>
                                            <span className="ms-3">Tickets</span>
                                        </NavLink>
                                    </li>
                                </>
                            ) : null}
                            {!auth.token ? (
                                <>
                                    <li>
                                        <NavLink to={"/login"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-br-sign-in-alt"></i>
                                            <span
                                                className="flex-1 ms-3 whitespace-nowrap">{t("sidebar.signIn")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/register"}
                                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <i className="fi fi-br-edit"></i>
                                            <span className="flex-1 ms-3 whitespace-nowrap">{t("sidebar.signUp")}</span>
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <a
                                        href=""
                                        onClick={auth.logOut}
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <i className="fi fi-br-sign-in-alt"></i>
                                        <span
                                            className="flex-1 ms-3 whitespace-nowrap">{t("sidebar.logOut")}</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
        ;
}
