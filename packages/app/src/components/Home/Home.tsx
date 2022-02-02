import React, { useMemo } from 'react';
import {
  DetailsList,
  MessageBar,
  Spinner,
  MessageBarType,
  IColumn,
  DetailsListLayoutMode,
} from '@fluentui/react';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { useApi } from '@backstage/core-plugin-api';
import useAsync from 'react-use/lib/useAsync';

const columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 250,
  },
  {
    key: 'column2',
    name: 'Description',
    fieldName: 'description',
    minWidth: 100,
    maxWidth: 250,
  },
];

export const Home = () => {
  const catalogApi = useApi(catalogApiRef);
  const {
    loading,
    value = { items: [] },
    error,
  } = useAsync(() =>
    catalogApi.getEntities({
      filter: {
        kind: 'Component',
      },
    }),
  );

  const items = useMemo(
    () =>
      value.items.map(item => ({
        key: item.metadata.uid,
        name: item.metadata.name,
        description: item.metadata.description,
      })),
    [value],
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    <MessageBar messageBarType={MessageBarType.error}>
      Encountered an error while fetching records from the catalog.
    </MessageBar>;
  }

  return (
    <DetailsList
      columns={columns}
      items={items}
      layoutMode={DetailsListLayoutMode.justified}
    />
  );
};
