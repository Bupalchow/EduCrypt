import React from 'react'
import { useState , useEffect } from 'react'
import { storage ,base } from '../firebase';
import { ref , uploadBytes , listAll ,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";
import{ref as textRef,push, get,update,remove , child} from "firebase/database";
import {Button,Dialog,Card,CardBody,CardFooter,Typography,Input,DialogHeader,DialogBody,DialogFooter} from "@material-tailwind/react";

const Submit = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [users, setUsers] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ytlink, setYtlink] = useState('');
  const [DeploymentLink, setDeplymentLink] = useState('');
  const [reviewData,setReviewData]=useState('');
  const handleOpen = () => setOpen((cur) => !cur);
  const [openc, setOpenc] = React.useState(false);
  const handleOpenc = () => {setOpenc(!openc)};
  const uploadImage =()=>{
    if(imageUpload==null || name=='' || description=='' || ytlink==''){
      alert('fill all required fields');
      return;
    } else{handleOpen();}
    const storageRef = ref(storage, `Educrypt/${imageUpload.name + v4()}`);
    uploadBytes(storageRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
      push(textRef(base, `users/`), {
        name: name,
        description: description,
        ytlink: ytlink,
        DeploymentLink: DeploymentLink,
        imageUrl: url
      });
    })
    })
  }
  const uploadReview=()=>{
    if(reviewData==''){
      alert('Please provide your taughts about this project');
      return;
    } else{handleOpenc();}
    push(textRef(base,`users/${name}/review`),{
      review: reviewData
    })
  }
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await get(textRef(base, 'users/'));
      setUsers(snapshot.val());
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <div className='flex items-center justify-center'>
        <Button className='bg-white text-black' onClick={handleOpen}>Submit</Button>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Project Peer Review
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Submit Your Awesome Web 3 Project
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Project Name
            </Typography>
            <Input label="Name" type='text' size="lg" required onChange={event=>setName(event.target.value)}/>
            <Typography className="-mb-2" variant="h6">
              Prject Description
            </Typography>
            <Input label="Description" type='text' size="lg" required minLength={20} maxLength={300} onChange={event=>setDescription(event.target.value)}/>
            <Typography className="-mb-2" variant="h6">
              Project Deployment Link
            </Typography>
            <Input label="Deployment Link" type='text' size="lg" onChange={event=>setDeplymentLink(event.target.value)}/>
            <Typography className="-mb-2" variant="h6">
              Project Video Link
            </Typography>
            <Input label="YT Link" type='text' size="lg"  required onChange={event=>setYtlink(event.target.value)}/>
            <Typography className="-mb-2" variant="h6">
              Project Image
            </Typography>
            <Input label="Image" type='file' size="lg"  required onChange={(event)=>setImageUpload(event.target.files[0])}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" className='bg-black' onClick={uploadImage}  fullWidth>
              SUbmit
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <Dialog
      size='xl'
        open={openc}
        handler={handleOpenc}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {Object.values(users).map((user) => {
          function getVideoId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }
          return (
            <>
            <DialogHeader className='flex justify-center'>{user.name}</DialogHeader>
            <div id="videocontainer" className='flex items-center justify-center'>
            <iframe width="640" height="360" className='rounded my-5' src={`//www.youtube.com/embed/${getVideoId(user.ytlink)}`} allowFullScreen></iframe>
            </div>
            <div id='TextContainer' className='flex flex-col items-center align-middle'>
              <p className='font-semibold text-xl'>{user.description}</p>
              <a href={user.DeploymentLink} target="_blank" rel="noreferrer" className='font-bold underline text-xl'>Deployment Link</a>
              <Typography className="my-2 " variant="h6">
                Review about this project
              </Typography>
              <Input label="Review"  type='text' required onChange={event=>setReviewData(event.target.value)}/>
            </div>
            </>
          );
        })}
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenc}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" className='bg-black' onClick={uploadReview}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="flex  justify-around gap-5 flex-wrap">
      {Object.values(users).map((user) => {
          return (
            <div key={user.imageUrl} style={{
              width: '200px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '10px',
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              transition: '0.3s'
            }}>
              <img src={user.imageUrl} className='h-40 w-80' alt={user.description} onClick={handleOpenc} style={{
                width: '100%',
                borderRadius: '4px',
                marginBottom: '10px'
              }} />
              <p>{user.name}</p>
            </div>
          );
      })}
      </div>
    </div>
  )
}

export default Submit
