import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

export function Layout({ children }) {
  const links = [
    { link: "/", name: "Home" },
    { link: "/raycaster", name: "Raycaster" },
    { link: "/galaxy", name: "Galaxy" },
    { link: "/particles", name: "Particles" },
    { link: "/ghost-house", name: "Ghost House" },
    { link: "/shadows", name: "Shadows" },
    { link: "/lights", name: "Lights" },
    { link: "/github-2020", name: "Github 2020" },
    { link: "/3d-text", name: "3D Text" },
    { link: "/materials", name: "Materials" },
    { link: "/textures", name: "Textures" },
    { link: "/leva", name: "Leva" },
    { link: "/geometry", name: "Geometry" },
    { link: "/full-screen", name: "Full Screen" },
    { link: "/animation", name: "Animation" },
    { link: "/transform", name: "Transform" },
    { link: "/basic", name: "Basic" },
  ]

  const router = useRouter()
  const menuItems = links.map((d, i) => (
    <Link href={d.link} key={i}>
      <a
        className={`group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 ${
          router.pathname == d.link ? "text-gray-900 bg-gray-50" : null
        }`}
      >
        <span className="truncate">{d.name}</span>
      </a>
    </Link>
  ))

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div className="antialiased font-sans h-screen">
        <div
          className="cursor-pointer fixed left-2 top-1 w-1/12 z-10"
          onClick={() => setMenuOpen(true)}
        >
          <Image
            src="/images/favicon-logo.png"
            alt="Picture of the author"
            width={60}
            height={60}
          />
        </div>
        <div
          className={
            (menuOpen ? "" : "hidden") +
            " fixed flex flex-col w-64 max-h-screen z-10 h-full"
          }
        >
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
            <div className="text-center" onClick={() => setMenuOpen(false)}>
              <svg
                className="h-6 w-6 inline-block cursor-pointer"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav
                className="flex-1 px-2 space-y-8 bg-white"
                aria-label="Sidebar"
              >
                <div className="space-y-1">
                  <h3
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    id="projects-headline"
                  ></h3>
                  <div
                    className="space-y-1"
                    role="group"
                    aria-labelledby="projects-headline"
                  >
                    {menuItems}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex-grow flex-col flex">
          <div className="flex-grow h-screen">{children}</div>
        </div>
      </div>
    </>
  )
}
