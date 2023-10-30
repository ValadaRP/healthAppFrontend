import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const notify = () => toast.error("Wow so easy !");
    const test: string = import.meta.env.VITE_SPOON_KEY;
    return (
        <div>
            {test}
            <button onClick={notify} type={"submit"} className={"bg-amber-200 p-4 rounded-md m-4 border-amber-300 border-[0.5px]"}>Notify !</button>
        </div>
    );
}

export default App