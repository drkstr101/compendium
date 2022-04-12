import { pickDataAttrs, toFieldPath } from '@stackbit/annotations';
import { CardModel } from '@watheia/molecular.types';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

export function Card(model: CardModel & JSX.IntrinsicAttributes) {
  return (
    <div className="card">
      <Link href={model.url ?? '/'}>
        <a {...pickDataAttrs(model)} className="card-body">
          <h3 {...toFieldPath('.heading')} className="card-title">
            {model.heading}
          </h3>
          {model.subheading && (
            <Markdown {...toFieldPath('.subheading')}>{model.subheading}</Markdown>
          )}
        </a>
      </Link>
    </div>
  );
}

export default Card;
