import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import ExternalLinkIcon from "./ExternalLinkIcon"

export function Layout({ children }) {
  const externalLinks = [
    {
      link: "https://fnick851.github.io/bananas-screen/",
      name: "Bananas Screen",
    },
    {
      link: "https://fnick851.github.io/scrolly-framer-motion/",
      name: "Page Scroll Animation Effect",
    },
    {
      link: "https://fnick851.github.io/fogs/",
      name: "Fogs",
    },
    {
      link: "https://fnick851.github.io/magic-cube/",
      name: "Magic Cube",
    },
    {
      link: "https://fnick851.github.io/r3f-spring/",
      name: "R3F Deep Dive - Basic Spring",
    },
    {
      link: "https://fnick851.github.io/r3f-saber-model/",
      name: "R3F Deep Dive - Alter Saber",
    },
    {
      link: "https://fnick851.github.io/r3f-ui-events/",
      name: "R3F Deep Dive - UI Events",
    },
    {
      link: "https://fnick851.github.io/r3f-first-scene/",
      name: "R3F Deep Dive - First Scene",
    },
    {
      link: "https://fnick851.github.io/r3f-intro/",
      name: "R3F Deep Dive - Intro",
    },
    {
      link: "https://fnick851.github.io/react-chart-rewrite/",
      name: "NAEP Internship Program Growth",
    },
    {
      link: "https://fnick851.github.io/threejs-journey-baked-scene/",
      name: "Three.js Journey to R3F - Baked Scene",
    },
  ]
  const internalLinks = [
    { link: "/labels", name: "Three.js Journey to R3F - Labels" },
    { link: "/performance", name: "Three.js Journey to R3F - Performance" },
    {
      link: "/post-processing",
      name: "Three.js Journey to R3F - Post Processing",
    },
    { link: "/morphing-head", name: "Three.js Journey to R3F - Morphing Head" },
    { link: "/shader-galaxy", name: "Three.js Journey to R3F - Shader Galaxy" },
    { link: "/shader-water", name: "Three.js Journey to R3F - Shader Water" },
    {
      link: "/shader-patterns",
      name: "Three.js Journey to R3F - Shader Patterns",
    },
    { link: "/shader-flag", name: "Three.js Journey to R3F - Shader Flag" },
    {
      link: "/realistic-helmet",
      name: "Three.js Journey to R3F - Realistic Helmet",
    },
    { link: "/fox-model", name: "Three.js Journey to R3F - Fox Model" },
    { link: "/burger-model", name: "Three.js Journey to R3F - Burger Model" },
    {
      link: "/simple-physics",
      name: "Three.js Journey to R3F - Simple Physics",
    },
    { link: "/raycaster", name: "Three.js Journey to R3F - Raycaster" },
    { link: "/galaxy", name: "Three.js Journey to R3F - Galaxy" },
    { link: "/particles", name: "Three.js Journey to R3F - Particles" },
    { link: "/ghost-house", name: "Three.js Journey to R3F - Ghost House" },
    { link: "/shadows", name: "Three.js Journey to R3F - Shadows" },
    { link: "/lights", name: "Three.js Journey to R3F - Lights" },
    { link: "/github-2020-v2", name: "Github 2020 V2" },
    { link: "/github-2020", name: "Github 2020" },
    { link: "/3d-text", name: "Three.js Journey to R3F - 3D Text" },
    { link: "/materials", name: "Three.js Journey to R3F - Materials" },
    { link: "/textures", name: "Three.js Journey to R3F - Textures" },
    { link: "/leva", name: "Leva" },
    { link: "/geometry", name: "Three.js Journey to R3F - Geometry" },
    { link: "/full-screen", name: "Three.js Journey to R3F - Full Screen" },
    { link: "/animation", name: "Three.js Journey to R3F - Animation" },
    { link: "/transform", name: "Three.js Journey to R3F - Transform" },
    { link: "/basic", name: "Three.js Journey to R3F - Basic" },
  ]

  const router = useRouter()
  const externalMenuItems = externalLinks.map(({ link, name }, i) => (
    <a
      title={name}
      className={`group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50`}
      href={link}
      key={i}
      target="_blank"
    >
      <span className="truncate">{name}</span>
      <ExternalLinkIcon />
    </a>
  ))
  const internalMenuItems = internalLinks.map(({ link, name }, i) => (
    <Link href={link} key={i}>
      <a
        title={name}
        className={`group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 ${
          router.pathname == link ? "text-gray-900 bg-gray-50" : null
        }`}
      >
        <span className="truncate">{name}</span>
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
            " fixed flex flex-col max-h-screen z-17000000 h-full"
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
                    <Link href="/">
                      <a
                        title="Home"
                        className={`group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 ${
                          router.pathname == "/"
                            ? "text-gray-900 bg-gray-50"
                            : null
                        }`}
                      >
                        <span className="truncate">Home</span>
                      </a>
                    </Link>
                    {externalMenuItems}
                    {internalMenuItems}
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
