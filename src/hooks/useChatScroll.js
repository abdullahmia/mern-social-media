import { useEffect, useRef } from 'react';

function useChatScroll(dep) {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [dep]);
    return ref;
}

export default useChatScroll;