import { IBlockElement } from '@watheia/molecular.types';
import dynamic from 'next/dynamic';
import { ComponentType, createElement } from 'react';

/**
 * Map of dynamically imported components.
 */
const components = {
  Button: dynamic(() => import('./atoms/button')),
  Card: dynamic(() => import('./molecules/card')),
  CardGridSection: dynamic(() => import('./organisms/card-grid-section')),
  HeroSection: dynamic(() => import('./organisms/hero-section'))
};

type Key = keyof typeof components;

export type DynamicProps<T> = Record<string, unknown> | ((props: T) => Record<string, unknown>);

export function renderElement<T extends IBlockElement>(model: T, props: DynamicProps<T> = {}) {
  const C = components[model.type as Key] as ComponentType<
    IBlockElement & JSX.IntrinsicAttributes
  >;
  if (!C) {
    throw new Error(`No component registered for type (${model.type})`);
  }
  return createElement(C, { ...model, ...props });
}
