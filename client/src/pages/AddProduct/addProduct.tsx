import React, { useState, useEffect, useRef } from "react";
import { 
    FormControl, 
    Box, 
    Typography,
    TextField,
    useMediaQuery,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormControlLabel,
    Button,
    RadioGroup,
    FormLabel,
    Radio,

} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTheme } from "@mui/material/styles";
import "./addProduct.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "../../Firebase/firebase";
import { nanoid } from "nanoid";
import {
    ref,
    uploadBytes,
} from "firebase/storage";
import { useAuth } from "../../context/Auth";
import { useAppContext } from "../../App";




export default function AddProduct() {
    
    const location = useLocation();

    const { existingProduct, mode } = location.state || {};

    const [product, setProduct] = useState(existingProduct?.name || "");
    const [description, setDescription] = useState(existingProduct?.description || "");
    const [price, setPrice] = useState(existingProduct?.price.toString() || "");
    const [category, setCategory] = useState(existingProduct?.category || "");
    
    
    const imageUrl = useRef("");
    const [imageUrls, setImageUrls] = useState<File[]>([]);

    const navigate = useNavigate();
    const { logout } = useAuth();
    const { handleToast } = useAppContext();


    useEffect(() => {
        if (mode === 'edit' && existingProduct) {
            setProduct(existingProduct.name);
            setDescription(existingProduct.description);
            setPrice(existingProduct.price);
            setCategory(existingProduct.category);
            imageUrl.current = existingProduct.images;
        }
    }, [existingProduct, mode]);


    const uploadFile = async () => {

        if(imageUrls.length === 0) return;

        let uploadedImageUrls = imageUrl.current;

        imageUrls.map(async (image) => {
            if(image === null) return;

            const imageDupli = image.name + nanoid();

            uploadedImageUrls += `${imageDupli},`;

            const imageName = `images/${imageDupli}`; 
            const imageRef = ref(storage, imageName);

            await uploadBytes(imageRef, image);
        });  
        
        imageUrl.current = uploadedImageUrls;

        console.log(imageUrl.current.split(','));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImages = event.target.files;
        if (selectedImages) {
            // Convert FileList to array
            const imagesArray = Array.from(selectedImages);
            // const imageNames = imagesArray.map(image => image.name);
            setImageUrls((prev: File[]) => [...prev, ...imagesArray]);
        }
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { refetch: sellProduct, data, isSuccess, isError } = useQuery({
        queryFn: () => {
          
          const params = new URLSearchParams();
          params.append("product", product);
          params.append("description", description);
          params.append("price", price);
          params.append("category", category);
          params.append("image", imageUrl.current);
          return httpRequest.post(`${url}/sell/add`, params);
        },
        queryKey: ["sell", "product"],
        enabled: false,
    });
    
    const updateProduct = useMutation({
        mutationFn: () => {
            const params = new URLSearchParams();
            params.append("name", product);
            params.append("description", description);
            params.append("price", price);
            params.append("category", category);
            params.append("image", existingProduct.images);
            params.append("productId", existingProduct._id);
            return httpRequest.put(`${url}/sell/update`, params);
        },
        onSuccess: (data) => {
            navigate(`/product/${data.data.product._id}`);
        },
        onError: () => {
            handleToast("Something Error occurred...");
            navigate(`/auth/signin`);
        },
    });

    useEffect(() => {
        if(isError) {
            handleToast("Something Error occurred...");
        }

        if(isSuccess) {
            navigate(`/product/${data.data._id}`);
        }
    }, [isSuccess, isError, data, logout, handleToast, navigate]);


    const handleSubmit = async () => {
        if(product && description && price && category && (mode === "edit" ? true : imageUrls.length > 0) ) {
            console.log("Submit The data");
            

            if(mode === "edit") {
                await updateProduct.mutate();
            } else {
                await uploadFile();
                await sellProduct();
            } 
        }

        else {
            handleToast('Please fill all required fields.');
        }
    }


    if(mode === "edit") 
        console.log("Product Id : ", existingProduct._id);


    return (
        <div style={{ width: '80%', margin: "auto", paddingBottom: "50px" }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    marginTop: '40px',
                    textAlign: 'center',
                }}
            >
                {mode === "edit" ? "Edit Your Product" : "Sell Your Product"}
            </Typography>

            <Box
                sx={{
                    width: isSmallScreen ? '100%' : "60%",
                    margin: "auto",
                    border: "1px solid #eee",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                <FormControl
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <TextField 
                        id="outlined-basic" 
                        label="Product Name" 
                        variant="outlined" 
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Product Description"
                        multiline
                        maxRows={10}
                        sx={{ width: "100%" }}
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                            label="Price"
                            placeholder="Enter Price of the Product"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl component="fieldset">
                        <FormLabel component="legend"
                            sx={{
                                fontWeight: "bold",
                                color: "black"
                            }}
                        >Select Category</FormLabel>
                        <RadioGroup
                            row
                            aria-label="gender"
                            name="row-radio-buttons-group"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <FormControlLabel value="Books" control={<Radio />} label="Books" />
                            <FormControlLabel value="Calculator" control={<Radio />} label="Calculator" />
                            <FormControlLabel value="Drafter" control={<Radio />} label="Drafter" />
                            <FormControlLabel value="Lab" control={<Radio />} label="Lab" />
                            <FormControlLabel value="Acadamic" control={<Radio />} label="Acadamic" />
                            <FormControlLabel value="Sports" control={<Radio />} label="Sports" />
                            <FormControlLabel value="Study Chair" control={<Radio />} label="Study Chair" />
                            <FormControlLabel value="Technical" control={<Radio />} label="Technical" />
                            <FormControlLabel value="Birthday" control={<Radio />} label="Birthday" />
                            <FormControlLabel value="Cloths" control={<Radio />} label="Cloths" />
                            <FormControlLabel value="Bottle" control={<Radio />} label="Bottle" />
                            <FormControlLabel value="Lock" control={<Radio />} label="Lock" />
                            <FormControlLabel value="Extension Box" control={<Radio />} label="Extension Box" />
                            <FormControlLabel value="Laguage Bag" control={<Radio />} label="Laguage Bag" />
                            <FormControlLabel value="Plants" control={<Radio />} label="Plants" />
                            
                        </RadioGroup>
                    </FormControl>

                    { ( mode !== "edit" ) && (
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                width: "100%",
                            }}   
                        >
                            Upload Images
                            <input type="file" multiple hidden onChange={handleImageChange} />
                        </Button>
                    )}

                    

                    {imageUrls.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <strong>Selected Images : </strong>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    flexWrap: "wrap"
                                }}
                            >
                                {imageUrls.map((image, index) => (
                                    <p style={{ margin: "4px 0" }} key={index}>{image.name}&nbsp;&nbsp;

                                        {index < imageUrls.length - 1 && (
                                            <span><i style={{ fontSize: "10px"}} className="fa-solid fa-circle"></i></span>
                                        )} 
                                        
                                    </p>
                                ))}
                            </Box>
                        </Box>
                    )}

                    <Button
                        variant="contained"
                        sx={{
                            marginTop: "20px",
                        }}
                        onClick={handleSubmit}
                    >
                        {mode === "edit" ? "Update Product" : "Sell Now" }
                    </Button>
                </FormControl>
            </Box>
        </div>
    );
}
