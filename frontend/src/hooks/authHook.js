

const useAuthHook = () => {
const token = window.localStorage.getItem('token')
return {
    isLoggedIn: token ? true : false
}
}

export default useAuthHook