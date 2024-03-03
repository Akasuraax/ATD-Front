import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Error({ numError }: { numError: string }) {
    const { t } = useTranslation();
    let textError: string;
    let errorDescription: string;

    switch (numError) {
        case "404":
            textError = t("error.Error404");
            errorDescription = t("error.Description404");
            break;
        case "403":
            textError = t("error.Error403");
            errorDescription = t("error.Description403");
            break;
        default:
            textError = t("error.textError");
            errorDescription = t("error.errorDescription");
            break;
    }

    const textButton = t("error.textButton");
    const contact = t("error.contact");

    return (
        <div className="App">
            <div className="flex m-auto items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#F85866]">{numError}</h2>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{textError}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">{errorDescription}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/" className="rounded-md bg-[#F85866] px-3.5 py-2.5 p-4 mr-4 text-sm font-semibold text-white shadow-sm hover:bg-[#E84856] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {textButton}
                        </Link>
                        <Link to="/Ticket" className="text-sm font-semibold text-gray-900">{contact}<span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
