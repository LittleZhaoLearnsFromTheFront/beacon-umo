import { loginPath } from "@/constants";
import { useAccess, useModel, history } from "@umijs/max";
import { useEffect } from "react";
const index = () => {
    const { initialState: { isLogin = false } = {} } = useModel('@@initialState');
    const access = useAccess();
    useEffect(() => {
        if (!isLogin) history.push(loginPath);

    })
    return <></>;
};
export default index;
