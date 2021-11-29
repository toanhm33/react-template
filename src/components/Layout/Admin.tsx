import { Footer, Header } from 'components/Common';
import { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';

export interface AdminProps {
  route: any;
}

export default function Admin(props: AdminProps) {
  return (
    <div className="">
      <Header />
      <div className="lg:w-10/12 w-full min-h-screen mx-auto py-28">
        <Suspense fallback={null}>{renderRoutes(props.route.routes)}</Suspense>
      </div>
      <Footer />
    </div>
  );
}
