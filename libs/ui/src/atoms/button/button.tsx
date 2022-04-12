import { pickDataAttrs, toFieldPath } from '@stackbit/annotations';
import { ButtonModel } from '@watheia/molecular.types';
import Link from 'next/link';

export function Button(model: ButtonModel) {
  return (
    <Link href={model.url ?? '/'}>
      <a {...pickDataAttrs(model)} className={`button theme-${model.theme}`}>
        <span {...toFieldPath('.label')}>{model.label}</span>
      </a>
    </Link>
  );
}

export default Button;
