import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUserContext } from '../context/usercontext';
import TextField from '@mui/material/TextField';
import { useState } from 'react'

export default function ProfileField({ field }) {
  const { userData, setUserData, user } = useUserContext();
  const [edit, setEdit] = useState(false);
  let text;
  switch (field) {
    case 'First name':
      text = userData.first;
      break;
    case 'Last name':
      text = userData.last;
      break;
    case 'Gender':
      text = userData.gender;
      break;
    case 'Date of birth':
      text = userData.date;
      break;
    default:
      throw (Error(`unknown profile field props: ${field}`))
  }
  const [newVal, setNewVal] = useState(text === undefined ? 'empty' : text);

  const handleSave = () => {
    async function fetchUser(action, collection, document) {
      const userRes = await fetch(`../api/userdata?action=${action}&collection=${collection}&document=${document}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const userDataNew = await userRes.json();
      setUserData(userDataNew)
    };
    async function editUserData() {
      await fetch('../api/userdata', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field,
          newVal,
          uid: user.uid,
        })
      })
      await fetchUser('getuser', 'userdata', user.uid)
    }
    if (text !== newVal) {
      editUserData()
    }
  }

  return (
    <Card sx={{ width: '70%', margin: '5px' }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Your {field}:
        </Typography>

        {edit ?
          <TextField
            type={field === 'Date of birth' ? 'date' : 'text'}
            id="standard-helperText"
            label="Helper text"
            helperText="Some important text"
            variant="standard"
            value={newVal}
            onChange={(event) => setNewVal(event.target.value)}
          />
          :
          <Typography variant="h5" component="div">
            {text === undefined ? 'empty' : text}
          </Typography>
        }

      </CardContent>
      <CardActions>
        {edit ?
          <Button size="small" onClick={() => (setEdit(false), handleSave())}>Save</Button>
          :
          <Button size="small" onClick={() => setEdit(true)}>Edit</Button>
        }
      </CardActions>
    </Card>
  );
}