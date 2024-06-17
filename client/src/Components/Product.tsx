import React, {  useState } from 'react';
import { 
    Box,
    Typography,
    CardContent,
    ButtonGroup,
    Button,
    IconButton
    
} from "@mui/material";

import { useNavigate } from 'react-router-dom';
import { storageUrl, url } from '../utils/baseUrl';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMutation } from '@tanstack/react-query';
import { httpRequest } from '../Interceptor/axiosInterceptor';
import { useAuth } from '../context/Auth';

type ProductProps = {
  title: string;
  image: string;
  description: string;
  price: string;
  productId: string;
  showButton?: boolean;
  showRemove?: boolean;
  isWishlisted?:boolean;
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
    showRemove,
    isWishlisted,
    onDeleteClick,
    onEditClick,
}: ProductProps) {
  
  console.log(isWishlisted);
  const [ wishlisted, setWishlisted] = useState(isWishlisted);
  
  
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { isAuthenticated } = useAuth();

  const images = image ? image.split(',') : [];

  const handleCardClick = () => {
    console.log('Clicked');
    navigate(`/product/${productId}`); 
  };

  const addToWishlist = useMutation({
    mutationFn: () => {
      return httpRequest.post(`${url}/user/wishlist/add`, { productId });
    },
    onSuccess: () => {
        setWishlisted(true);
        console.log("Product added to wishlist");
        // queryClient.invalidateQueries('wishlist');
    },
  }); 

  const removeFromWishlist = useMutation({
    mutationFn: () => {
      return httpRequest.post(`${url}/user/wishlist/remove`, { productId });
    },
    onSuccess: () => {
        setWishlisted(false);
        console.log("Product removed to wishlist");
        // queryClient.invalidateQueries('wishlist');
    },
  }); 


  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (wishlisted) {
      removeFromWishlist.mutate();
    } else {
      addToWishlist.mutate();
    }
  };

  const fullImageUrl = images.length > 0 ? `${storageUrl}${images[0]}?alt=media` : 'default_image_url_here';

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
          
        <Box style={{ position: 'relative' }}>
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

            {isAuthenticated && 
              <IconButton 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    padding: 2,
                    backgroundColor: "#ffff",
                    color: wishlisted ? 'red' : 'gray',
                    
                }} 
                onClick={toggleWishlist}
            >
                {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            }
            
        </Box>

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
              {showRemove ? "Remove" : "Delete"}
            </Button>

            <Button sx={{ flex: 1}} color="primary" startIcon={showRemove ? <ShoppingBagIcon /> :<EditIcon />}
              onClick={(event) => onEditClick && onEditClick(productId, event)}
            >
            {showRemove ? "Buy" : "Edit"}
            </Button>
          </ButtonGroup>
        )}

      </CardContent>


      
    </Box>
  );
}


