import * as React from 'react';
import { Footer, Header } from 'components/Common';
import Sidebar from 'components/Common/Sidebar';
import { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';

export interface AdminProps {
  route: any;
}

export default function Admin (props: AdminProps) {
  return (
    <div className="bg-gray-50	">
      <Header />
      <div className="w-10/12 min-h-screen mx-auto py-28">
        <Suspense fallback={null}>
            {renderRoutes(props.route.routes)}
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
}
