import React, { useState,useEffect} from 'react';
import { Button, Spin, Input, Card,message } from "antd";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import axios from "../utils/axios"
import "../less/login.less"
const LoginPage = () => { 
    const [isLoading, setisLoading] = useState(false);
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    useEffect(() => { 
    },[])
    return (
        <>
            <div className="login-div">
           
                <Spin tip="Loading..." spinning={isLoading} >
                    <Card title="My Blog  System" bordered={true} style={{ width: 400 }} >
                        <Input
                            id="userName"
                            size="large"
                            placeholder="Enter your userName"
                            prefix={<UserOutlined style={{ color: '#c0c4cc' }}/>}
                            onChange={(e)=>{setUserName(e.target.value)}}
                        /> 
                        <br/><br/>
                        <Input.Password
                            id="password"
                            size="large"
                            placeholder="Enter your password"
                            prefix={<LockOutlined style={{ color: '#c0c4cc' }}/>}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />     
                        <br/><br/>
                        <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                        <span onClick={abc}>wangji</span>
                    </Card>
                </Spin>
            </div>
        </>
    )
    function checkLogin() { 
        setisLoading(true);
        if (!UserName) {
            message.error('用户名不能为空')
            setTimeout(() => { setisLoading(false) }, 1000);
            return 
        }
        if (!Password) {
            message.error('密码不能为空不能为空')
            setTimeout(() => { setisLoading(false) }, 1000);
            return
        }
        console.log("点击");
        axios({
            method: "POST",
            url:"/login",
            data: {
                name: UserName,
                password: Password 
            },
            // withCredentials: true
        }).then(res => { setisLoading(false); }).catch((err) => { 
            console.log(err)
            setisLoading(false);
        })
        // axios.post("/login", { data: { name: UserName, password: Password } }, {withCredentials: true}).then(res => { 
        //     setisLoading(false);
        //     console.log(res);
        // }).catch(() => { setisLoading(false);})
    }
    function abc() { 
        axios({
            method: "GET",
            url:"/",
            // withCredentials: true
        }).then(res => {  })
    }
}
export default LoginPage;