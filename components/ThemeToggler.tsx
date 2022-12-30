import MoonIcon from "@heroicons/react/24/solid/MoonIcon"
import SunIcon from "@heroicons/react/24/solid/SunIcon"
import { useTheme } from "next-themes"

const ThemeToggler = () => {

    const { theme, setTheme } = useTheme()

    if(theme === "dark"){
        return (
            <MoonIcon className="w-6 h-6 cursor-pointer" onClick={() => setTheme('light')}/>
        )
    }
    return(
        <SunIcon className="w-6 h-6 cursor-pointer" onClick={() => setTheme('dark')}/>
    )
}

export default ThemeToggler