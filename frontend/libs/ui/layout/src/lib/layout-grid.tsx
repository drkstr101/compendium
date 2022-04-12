import { Grid, Flex } from '@react-spectrum/layout';
import { GridProps } from '@react-types/layout';
import { Footer, View } from '@react-spectrum/view';

/* eslint-disable-next-line */
export interface LayoutGridProps extends GridProps {}

const gridAreas = {
  base: ['header', 'nav', 'content', 'footer'],
  M: ['header   header', 'nav      content', 'nav      content', 'footer   footer'],
  L: [
    'header header  header',
    'nav    content toc',
    'nav    content toc',
    'footer footer  footer'
  ]
};

const gridColumns = {
  M: ['size-2000', '1fr'],
  L: ['size-2000', '1fr', 'size-2000']
};

const gridGap = 'size-100';

/**
 * Helper component for creating a css grid layout based on slots
 * @returns
 */
export function LayoutGrid({
  areas = gridAreas,
  columns = gridColumns,
  gap = gridGap,
  ...props
}: LayoutGridProps) {
  return (
    <Grid areas={areas} columns={columns} gap={gap} {...props}>
      <View backgroundColor="celery-600" gridArea="header" height="size-1000" />
      <View backgroundColor="blue-600" gridArea="nav">
        <Flex direction={{ base: 'row', M: 'column' }} gap="size-100" margin="size-100">
          <View backgroundColor="static-gray-50" height="size-250" minWidth="size-900" />
          <View backgroundColor="static-gray-50" height="size-250" minWidth="size-900" />
          <View backgroundColor="static-gray-50" height="size-250" minWidth="size-900" />
        </Flex>
      </View>
      <View backgroundColor="purple-600" gridArea="content" height="size-4600" />
      <View
        backgroundColor="magenta-600"
        gridArea="toc"
        minHeight="size-1000"
        isHidden={{ base: true, L: false }}
      />
      <View backgroundColor="seafoam-600" gridArea="footer" height="size-1000">
        <Footer>Copyright © 2022 Watheia Labs, LLC.</Footer>
      </View>
    </Grid>
  );
}

export default LayoutGrid;
