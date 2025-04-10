import { loginPath, templatesPath } from "@/constants";
import { useAccess, useModel, history } from "@umijs/max";
import { useEffect } from "react";
const index = () => {
    const { initialState: { isLogin = false } = {} } = useModel('@@initialState');
    useEffect(() => {
        if (!isLogin) history.push(loginPath);
        history.push(templatesPath)
    })
    return <></>;
};
export default index;
