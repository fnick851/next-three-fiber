import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div className="antialiased font-sans flex h-screen">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <a href="/">
                <Image
                  src="/images/favicon-logo.png"
                  alt="Picture of the author"
                  width={60}
                  height={60}
                />
              </a>
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
                        className={`group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 ${
                          router.pathname == "/"
                            ? "text-gray-900 bg-gray-50"
                            : null
                        }`}
                      >
                        <span className="truncate">Home</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex-grow flex-col flex">
          <h1 className="text-center my-5">
            Rendering with <code>react-three-fiber</code>, <code>next.js</code>,
            and <code>tailwindcss</code> because it feels good.
          </h1>
          <div className="flex-grow">{children}</div>
        </div>
      </div>
    </>
  );
}
