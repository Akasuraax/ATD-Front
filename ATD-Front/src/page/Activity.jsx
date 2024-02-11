import ActivityComponent from "../components/ActivityComponent.jsx";

function Activity(){
    return(
        <main>
            <div className="homeBody max-w-screen-xl flex flex-nowrap justify-between mx-auto">
                <ActivityComponent></ActivityComponent>
            </div>
        </main>
    );
}

export default Activity;