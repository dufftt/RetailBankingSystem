import React, {useState} from 'react';
import AuthenticationClient from "../../Client/AuthenticationClient";


const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="min-h-screen flex justify-center bg-gray-200">
            <div className="self-center md:w-1/2 w-full">
                <div
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex-1"
                >
                    <div className="text-2xl text-blue-900 mb-4 font-semibold">
                        Login
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker focus:outline-none"
                            id="email"
                            type="text"
                            placeholder="Username"
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                            required={true}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 focus:outline-none"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            required={true}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            type="button"
                            onClick={() => AuthenticationClient.login(username, password).then(data => {
                                if(data.message!==undefined){
                                    alert(data.message);
                                }else {
                                    props.setUser(data);
                                }
                            })}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Login;