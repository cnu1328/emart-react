import React from 'react';
import { 
    Box,
    Typography,
    CardContent,
    ButtonGroup,
    Button,
    
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { storageUrl } from '../utils/baseUrl';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

type ProductProps = {
  title: string;
  image: string;
  description: string;
  price: string;
  productId: string;
  showButton?: boolean;
  onDeleteClick?: (productId: string, event: React.MouseEvent) => void;
  onEditClick?: (productId: string, event: React.MouseEvent) => void;
}

export default function ProductCard({
    title, 
    image,
    description,
    price,
    productId,
    showButton,
    onDeleteClick,
    onEditClick,
}: ProductProps) {

  
  
  const navigate = useNavigate();

  const images = image.split(',');

  const handleCardClick = () => {
    console.log('Clicked');
    navigate(`/product/${productId}`); 
  };

  const fullImageUrl = `${storageUrl}${images[0]}?alt=media`;

  return (
    
    <Box 
        style={{
            width: "270px",
            margin: "20px",
            borderRadius: "12px",
            boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.75)',
            cursor: 'pointer'
        }}
        onClick={handleCardClick}
    >
      <CardContent>
        
          <img
            style={{
                width: '100%',
                height: '160px',
                objectFit: "contain",
                border: '0.1rem solid #cdcdcd',
                borderRadius: "8px",
                boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.5)',
            }}
            src={fullImageUrl}
            alt="Product Image"
          />
        <div className="info">
          
            <Typography
                style={{
                    fontSize: '1.2rem',
                    padding: '8px 0', 
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',  // Prevent text from wrapping
                    overflow: 'hidden',    // Hide overflowing text
                    textOverflow: 'ellipsis',  // Display ellipsis for overflow
                    maxWidth: '250px',
                }}
            >
              {title}
            </Typography>

            <Typography
                style={{
                    fontSize: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,  // Limit to two lines
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: '250px',
                }}
            >
              {description}
            </Typography>
          
          <div 
            style={{
                marginTop: "10px",
                display: 'flex',
                gap: "10px",
            }}
          >

            <span 
                style={{
                    marginLeft: 5,
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 'larger',
                }}  
            >
              Price : 
            </span>
            <span 
                style={{
                    marginLeft: 5,
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 'larger',
                }}  
            >
              ₹ {price}
            </span>
          </div>
        </div>

        {showButton && (
          <ButtonGroup variant="outlined" aria-label="Product Action button group"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: 2,
            }}
          >
            <Button 
              sx={{ flex: 1}}  color="error" startIcon={<DeleteIcon />}
              onClick={(event) => onDeleteClick && onDeleteClick(productId, event)}
            >
              Delete
            </Button>

            <Button sx={{ flex: 1}} color="primary" startIcon={<EditIcon />}
              onClick={(event) => onEditClick && onEditClick(productId, event)}
            >
              Edit
            </Button>
          </ButtonGroup>
        )}

      </CardContent>


      
    </Box>
  );
}


