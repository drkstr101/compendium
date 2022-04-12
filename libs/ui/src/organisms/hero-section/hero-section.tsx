import { pickDataAttrs, toFieldPath } from '@stackbit/annotations';
import { HeroSectionModel, IActionElement } from '@watheia/molecular.types';
import Markdown from 'markdown-to-jsx';
import { renderElement } from '../../factory';

/* eslint-disable-next-line */
export type HeroSectionProps = JSX.IntrinsicAttributes & HeroSectionModel;

const renderActions = (model: IActionElement, key: number) =>
  renderElement(model, {
    key,
    ...toFieldPath(`.actions.${key}`)
  });

export function HeroSection(props: HeroSectionProps) {
  return (
    <div {...pickDataAttrs(props)} className="hero-container">
      <h1 {...toFieldPath('.heading')} className="hero-heading">
        {props.heading}
      </h1>
      {props.subheading && (
        <Markdown {...toFieldPath('.subheading')} className="hero-subheading">
          {props.subheading}
        </Markdown>
      )}
      {props.actions?.length > 0 && (
        <div className="hero-actions">{props.actions.map(renderActions)}</div>
      )}
    </div>
  );
}

export default HeroSection;
