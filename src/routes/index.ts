import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

export default [
  {
    /**
     * path: string | string[]
     * renders <a href="/company/*">
     * renders <a href="/doctor/*">
     * renders <a href="/admin/*">
     * Ref: https://reactrouter.com/web/api/Route/path-string-string
     */
    path: ['/'],
    routes: [
      {
        path: '/company/projects',
        exact: true,
        // component: lazy(() => import())
      }
    ]
  },
]
