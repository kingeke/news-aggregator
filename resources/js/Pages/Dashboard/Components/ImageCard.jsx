import { asset } from '@/Components/Config/Helpers';
import { Box, CardMedia } from '@mui/material';
import { useState } from 'react';

const ImageCard = ({
    item
}) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    const placeholderImage = asset('img/defaultImage.png');
    const actualImage = item?.image_url || placeholderImage;

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: 250,
            }}
        >
            <CardMedia
                component="img"
                src={placeholderImage}
                alt={item?.title}
                loading="lazy"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: imageLoaded ? "translateX(-100%)" : "translateX(0)",
                    transition: "transform 0.5s ease-in-out",
                }}
            />
            <CardMedia
                component="img"
                src={actualImage}
                alt={item?.title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: imageLoaded ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.5s"
                }}
            />
        </Box>
    );
};

export default ImageCard;