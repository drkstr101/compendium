import { pickDataAttrs, toFieldPath } from '@stackbit/annotations';
import { CardGridSectionModel, IBlockElement } from '@watheia/molecular.types';
import Markdown from 'markdown-to-jsx';
import { renderElement } from '../../factory';

const renderItems = (model: IBlockElement, key: number) =>
  renderElement(model, {
    key,
    ...toFieldPath(`.items.${key}`)
  });

type CardGridSectionProps = CardGridSectionModel & JSX.IntrinsicAttributes;

export function CardGridSection(props: CardGridSectionProps) {
  return (
    <div {...pickDataAttrs(props)} className="card-grid-container">
      <h2 {...toFieldPath('.heading')} className="card-grid-heading">
        {props.heading}
      </h2>
      {props.subheading && (
        <Markdown {...toFieldPath('.subheading')} className="card-grid-subheading">
          {props.subheading}
        </Markdown>
      )}
      {props.items?.length > 0 && (
        <div className="card-grid-items">{props.items.map(renderItems)}</div>
      )}
    </div>
  );
}

export default CardGridSection;
