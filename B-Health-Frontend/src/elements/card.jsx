import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import hospital from "../assets/hospital-1.jpg"  
import hosp-2
export default function ActionAreaCard() {
  return (
    <> 
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={hospital}
          alt="bangalore"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hospital 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
       Bangalore
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={hospital}
        alt="bangalore"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Hospital 1
        </Typography>
        <Typography variant="body2" color="text.secondary">
     Bangalore
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>

  </>
  );
}
