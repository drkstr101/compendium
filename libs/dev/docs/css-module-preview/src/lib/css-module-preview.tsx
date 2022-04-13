/* eslint-disable-next-line */
import { CSSModule } from '@compendium/model.types';
import JSONFormatter from 'json-formatter-js';

export interface CssModulePreviewProps {
  styles: CSSModule;
}

export function CssModulePreview({ styles }: CssModulePreviewProps) {
  const dataContent = new JSONFormatter(styles, 2);
  return (
    <div>
      <div
        ref={(nodeElement) => {
          nodeElement && nodeElement.replaceWith(dataContent.render());
        }}
      />
    </div>
  );
}

export default CssModulePreview;
