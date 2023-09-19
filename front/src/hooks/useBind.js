import { useState } from "react";

function useBind(defaultValue) {

    const [value, setValue] = useState(defaultValue);

    const bind = {
        value,
        onChange: e => {
            setValue(e.target.value)
        }
    }

    const reset = () => {
        setValue(defaultValue)
    }

    return [value, bind, reset]
}

export default useBind