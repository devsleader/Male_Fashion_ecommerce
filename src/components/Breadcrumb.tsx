// components/Breadcrumb.tsx
import Link from 'next/link';

interface BreadcrumbProps {
  pageTitle: string;
  currentPage: string;
}

const Breadcrumb = ({ pageTitle, currentPage }: BreadcrumbProps) => {
  return (
    <section className="bg-[#f3f2ee] py-10">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">{pageTitle}</h4>
            <div className="text-sm">
              <Link href="/" className="text-gray-900 hover:text-gray-700">
                Home
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="text-gray-500">{currentPage}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Breadcrumb;