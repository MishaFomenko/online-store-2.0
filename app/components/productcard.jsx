import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ProductCard() {
  return (
    <Card sx={{ maxWidth: 200, margin: 2, zIndex: 0}}>
      <CardActionArea>
        <CardMedia
          component="img"
          maxHeight="140"
          image="/images/me.png"
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Product
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
