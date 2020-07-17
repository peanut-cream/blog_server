import React, { useState,useEffect} from 'react';
import { Button, Spin, Input, Card,message } from "antd";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import axios from "../utils/axios"
import "../less/login.less"
const LoginPage = (props) => { 
    const [isLoading, setisLoading] = useState(false);
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    useEffect(() => { 
        console.log(localStorage.getItem("openId"));
        if (localStorage.getItem("openId")) { 
            axios({
                method: "POST",
                url:"/checkOpenID",
                data: {
                    openId:localStorage.getItem("openId"),
                }
            }).then(res => { 
                if (res.data.code === 200) { 
                    props.history.push('/index');
                    message.success(res.data.msg);
                }
            })
        }
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
        axios({
            method: "POST",
            url:"/login",
            data: {
                name: UserName,
                password: Password 
            },
        }).then(res => {
            setisLoading(false);
            if (res.data.code === 200) {
                if (res.data.msg === "登录成功"&&res.data.openId) { 
                    localStorage.setItem("openId", res.data.openId);
                }
                message.success(res.data.msg);
                props.history.push('/index')
            } else { 
                message.error(res.data.msg);
            }
        }).catch((err) => { 
            console.log(err)
            setisLoading(false);
        })
    }
}
export default LoginPage;