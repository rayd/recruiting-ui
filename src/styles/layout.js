import styled from 'styled-components/macro';
import { Link } from '@reach/router';

export const Anchor = styled(Link)`
  text-decoration: none;
  font: inherit;
  color: inherit;
`;

export const Shelf = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  width: ${props => props.width || 'auto'};
  margin: ${props => props.margin || '0'};
`; 