import { ExpandMore, ExpandLess } from '@mui/icons-material';
import {
  ListItemButton,
  List,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';
import Nestable, { type Item } from 'react-nestable';
import './index.scss';
import { AxiosErrorData } from '../../Models/AxiosResponse';

interface DraggableAreaProps<T> {
  initialItems: T[] | [];
  renderItem: (params: {
    item: Item;
    index: number;
    depth: number;
    isDraggable: boolean;
    collapseIcon: ReactNode;
    handler: ReactNode;
  }) => ReactNode;
  onChange: (updatedItems: T[]) => void;
  idProp: string;
  maxDepth?: number;
  isLoading: boolean;
  error: AxiosErrorData | null;
}

function DraggableArea<T extends Item>({
  initialItems,
  renderItem,
  onChange,
  idProp,
  maxDepth = 2,
  isLoading,
  error,
}: DraggableAreaProps<T>) {
  const renderCollapseIcon = ({
    isCollapsed,
  }: {
    isCollapsed: boolean;
  }): JSX.Element => (
    <ListItemButton>
      {isCollapsed ? <ExpandMore /> : <ExpandLess />}
    </ListItemButton>
  );
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography color="error">Error loading data: {error.message}</Typography>
    );
  }
  return (
    <List>
      <Nestable
        items={initialItems}
        renderItem={renderItem}
        renderCollapseIcon={renderCollapseIcon}
        onChange={({ items }) => onChange(items as T[])}
        idProp={idProp}
        maxDepth={maxDepth}
      />
    </List>
  );
}
export default DraggableArea;
