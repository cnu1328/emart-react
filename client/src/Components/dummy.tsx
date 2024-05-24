import React, { useState, useEffect } from "react";
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
import { useTheme, styled } from "@mui/material/styles";
import "./addProduct.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { storage } from "../../Firebase/firebase";
import { nanoid } from "nanoid";
import { ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../../context/Auth";
import { useAppContext } from "../../App";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type AddProductProps = {
    existingProduct?: {
        name: string;
        description: string;
        price: number;
        category: string;
        images: string[];
        _id: string;
    };
    mode: "add" | "edit";
};

export default function AddProduct({ existingProduct, mode }: AddProductProps) {
    const [product, setProduct] = useState(existingProduct?.name || "");
    const [description, setDescription] = useState(existingProduct?.description || "");
    const [price, setPrice] = useState(existingProduct?.price.toString() || "");
    const [category, setCategory] = useState(existingProduct?.category || "");
    
    let imageUrl = "";
    const [imageUrls, setImageUrls] = useState<File[]>([]);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { handleToast } = useAppContext();

    const uploadFile = async () => {
        if(imageUrls.length === 0) return;

        for (const image of imageUrls) {
            if(image === null) return;

            const imageDupli = image.name + nanoid();
            imageUrl += `${imageDupli},`;
            const imageName = `images/${imageDupli}`; 
            const imageRef = ref(storage, imageName);
            await uploadBytes(imageRef, image);
        }
        console.log(imageUrl.split(','));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImages = event.target.files;
        if (selectedImages) {
            const imagesArray = Array.from(selectedImages);
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
            params.append("image", imageUrl);
            return httpRequest.post(`${url}/sell/add`, params);
        },
        queryKey: ["sell", "product"],
        enabled: false,
    });

    const updateProduct = useMutation({
        mutationFn: () => {
            const params = new URLSearchParams();
            params.append("product", product);
            params.append("description", description);
            params.append("price", price);
            params.append("category", category);
            params.append("image", imageUrl);
            return httpRequest.put(`${url}/product/${existingProduct?._id}/update`, params);
        },
        onSuccess: (data) => {
            navigate(`/product/${data.data._id}`);
        },
        onError: () => {
            logout();
            handleToast("Something Error occurred...");
            navigate(`/auth/signin`);
        },
    });

    useEffect(() => {
        if(isError) {
            logout();
            handleToast("Something Error occurred...");
            navigate(`/auth/signin`);
        }

        if(isSuccess) {
            navigate(`/product/${data.data._id}`);
        }
    }, [isSuccess, isError, data, logout, handleToast, navigate]);

    const handleSubmit = async () => {
        if(product && description && price && category && imageUrls.length > 0 ) {
            console.log("Submit The data");
            await uploadFile();

            if (mode === "add") {
                await sellProduct();
            } else {
                await updateProduct.mutate();
            }
        } else {
            handleToast('Please fill all required fields.');
        }
    }

    return (
        <div style={{ width: '80%', margin: "auto", paddingBottom: "50px" }}>
            <Typography variant="h4" gutterBottom sx={{ marginTop: '40px', textAlign: 'center' }}>
                {mode === "add" ? "Sell Your Product" : "Edit Your Product"}
            </Typography>
            <Box sx={{ width: isSmallScreen ? '100%' : "60%", margin: "auto", border: "1px solid #eee", borderRadius: "10px", padding: "20px" }}>
                <FormControl sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
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
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ fontWeight: "bold", color: "black" }}>Select Category</FormLabel>
                        <RadioGroup
                            row
                            aria-label="category"
                            name="row-radio-buttons-group"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <FormControlLabel value="Books" control={<Radio />} label="Books" />
                            <FormControlLabel value="Calculator" control={<Radio />} label="Calculator" />
                            <FormControlLabel value="Drafter" control={<Radio />} label="Drafter" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ width: "100%" }}
                    >
                        Upload Images
                        <input type="file" multiple hidden onChange={handleImageChange} />
                    </Button>
                    {imageUrls.length > 0 && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <strong>Selected Images:</strong>
                            <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                {imageUrls.map((image, index) => (
                                    <p style={{ margin: "4px 0" }} key={index}>
                                        {image.name}
                                        {index < imageUrls.length - 1 && <span><i style={{ fontSize: "10px"}} className="fa-solid fa-circle"></i></span>} 
                                    </p>
                                ))}
                            </Box>
                        </Box>
                    )}
                    <Button variant="contained" sx={{ marginTop: "20px" }} onClick={handleSubmit}>
                        {mode === "add" ? "Sell Now" : "Update Product"}
                    </Button>
                </FormControl>
            </Box>
        </div>
    );
}
