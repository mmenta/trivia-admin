import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';

function LoginView(props) {

    // create local state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // componentDidMount alternative
    useEffect(() => {
        // run function & dispatch here
        const listener = (event) => {
            if ( event.code === 'Enter' ) {
                doLogin();
            }
        }

        // submit on enter key
        document.addEventListener('keydown', listener);

        return () => {
            // on unmount
            document.removeEventListener('keydown', listener);
        }
    });

    function handleUsername(e) {
        setUsername(e);
    }

    function handlePassword(e) {
        setPassword(e);
    }   

    function doLogin() {
        // temp hardcode
        let validUser = ['mario', 'rjay'];
        let validPass = ['P8ssword!'];

        // check user / pass in firebase
        if ( (validUser.includes(username)) && (validPass.includes(password)) ) {
            // success
            NotificationManager.success(`Welcome ${username}`, '');
            setTimeout(() => {
                props.data.setLoginStatus(true);
            }, 1000);
        } else {
            // fail
            NotificationManager.error('Invalid user/pass', '');
        }        
    }

    return (
      <div className={['login-container content-container']}>
            <div className={'content-inner'}>
                <div className={'column-header'}>
                    Login
                </div>
                <div className={'section full'}>
                    <div className={['label label-row']}>
                        Username:
                    </div>
                    <div className={'input-full'}>
                        <input 
                            className={'input-normal'}
                            value={username}
                            onChange={(e) => handleUsername(e.target.value)}
                        />    
                    </div>
                </div>
                <div className={'section full'}>
                    <div className={['label label-row']}>
                        Password
                    </div>
                    <div className={'input-full'}>
                        <input 
                            className={'input-normal'}
                            value={password}
                            type={'password'}
                            onChange={(e) => handlePassword(e.target.value)}
                        />    
                    </div>
                </div>
                <div 
                    className={'btn-login btn'}
                    onClick={() => doLogin()}
                >
                    Login
                </div>
            </div>
        </div>
    )
}

export default LoginView;
