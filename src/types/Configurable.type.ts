export type ConfigurableProductOption = {
  uid: string | number | null | undefined;
  attribute_code: string | number;
  label: string;
  values: [
    {
      uid: string | number;
      swatch_data: {
        __typename: string;
        value: string;
      };
      label: string;
    },
  ];
};