import { useContext } from "react";
import QuioscoContex from "../src/context/QuioscoProvider";

const useQuiosco = () => {
    return useContext(QuioscoContex)
}

export default useQuiosco