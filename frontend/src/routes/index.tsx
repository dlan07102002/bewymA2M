import mainRouter from './mainRouter';
import { ReactNode } from 'react';

interface RouteObject {
  path: string;
  element?: ReactNode;
  Component?: React.ComponentType;
  children?: RouteObject[];
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    icon?: ReactNode;
    roles?: string[];
  };
}

/**
 * Chứa các router public
 */
const publicRouter: RouteObject[] = [ ...mainRouter ];

export { publicRouter };
export type { RouteObject };