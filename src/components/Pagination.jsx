import { default as PaginationControls } from '@mui/material/Pagination';

  const Pagination = ({handleChange, items, page, itemsPerPage}) => {    
            return (
              <PaginationControls
                color="secondary" 
                page={page}
                count={Math.ceil(items.length / itemsPerPage)}
                onChange={(e,v)=> handleChange(e,v,items)}
              />
            );
  };


export default Pagination;