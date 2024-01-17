import { createContext, useState} from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [userId, setUserId] = useState("")
    return(
        <AuthContext.Provider value={{userId, setUserId}}>
            {children}
        </AuthContext.Provider>
    )

}


export default AuthContext