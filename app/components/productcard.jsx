import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ProductCard({imageURL, price, description}) {
  return (
    <Card sx={{ maxWidth: 200, maxHeight: 600, margin: 2, zIndex: 0}}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={imageURL}
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {price===0 ? 'Free' : price + ' $'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
