'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ProductCard({ item }) {
  const router = useRouter();

  const handleProductClick = (item) => {
    const serItem = JSON.stringify(item);
    const encodedItem = encodeURIComponent(serItem);
    router.push(`/products/${item.asin}?data=${encodedItem}`);
  };

  return (
    <Card sx={{ maxWidth: 200, maxHeight: 600, margin: 2, zIndex: 0 }}>
      <CardActionArea onClick={() => handleProductClick(item)}>
        <CardMedia
          component="img"
          image={item.imgUrl}
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.price === 0 ? 'Free' : item.price + ' $'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.productDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
