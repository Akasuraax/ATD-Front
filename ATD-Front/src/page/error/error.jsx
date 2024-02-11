import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function Error() {

    const { t } = useTranslation();

    const numError = "404";
    const textError = t("error.textError");
    const errorDescription = t("error.errorDescription");

    const textButton = t("error.textButton");
    const contact = t("error.contact");

    return (
        <main>
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-base font-semibold text-[#F85866]">{numError}</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{textError}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">{errorDescription}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/"
                              className="rounded-md bg-[#F85866] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#E84856] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {textButton}
                        </Link>
                        <Link to="/Ticket" className="text-sm font-semibold text-gray-900">Contact support <span
                            aria-hidden="true">&rarr;</span></Link>
                    </div>
                </div>
            </div>
        </main>

    )
}