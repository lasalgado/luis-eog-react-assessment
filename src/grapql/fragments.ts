import { gql } from '@apollo/client';

export const MEASURE_FIELDS = gql`
  fragment measureFields on Measurement {
    metric
    at
    value
    unit
  }
`;
