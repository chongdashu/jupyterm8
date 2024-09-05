import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-200">
            Jupyterm8 - Tools for Jupyter Notebooks
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/notebook-extractor"
                  className="hover:text-blue-200"
                >
                  Notebook Extractor
                </Link>
              </li>
              <li>
                <Link href="/image-pointer" className="hover:text-blue-200">
                  Image Inspector
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
