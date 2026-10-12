import { useState } from "react";

function useCounter(){
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 5);
    };

    // custome hooks logical part
    return { count, increment }
}

export default useCounter;