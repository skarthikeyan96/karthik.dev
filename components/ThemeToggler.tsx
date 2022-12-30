import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
}

  
const ThemeToggler = (props:any) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  const [deviceType, setDeviceType] = useState("");


  // to solve the hydration error -> https://github.com/vercel/next.js/discussions/35773
  useEffect(() => setMounted(true), []);


  // TODO: need to make this as a custom hook
  useEffect(() => {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
                // @ts-ignore

      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        // @ts-ignore
      const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
                // @ts-ignore

        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    if (hasTouchScreen) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("Desktop");
    }
  }, []);




  if (!mounted) return null;

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 capitalize bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm  focus:outline-none focus:ring-2  dark:bg-black dark:text-white">
          {theme}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

  
        <Menu.Items className={classNames(deviceType === "Mobile" ? "relative right-0 z-10 mt-2 origin-top-right w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black dark:text-white bg-white dark:outline dark:outline-1 dark:border dark:border-white" : "absolute bg-white right-0 z-10 mt-2 origin-top-right w-full rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black dark:text-white dark:border dark:border-white")}>
          <div className="py-1 w-full">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "w-full" : "dark:text-white",
                    "block px-4 py-2 text-sm w-full "
                  )}
                  onClick={() => setTheme("light")}
                >
                  Light
                </a>
              )}
            </Menu.Item>

            

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "w-full" : "dark:bgtext-white",
                    "block px-4 py-2 text-sm w-full"
                  )}
                  onClick={() => setTheme("dark")}

                >
                  Dark
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      
    </Menu>
  );
};

export default ThemeToggler;
