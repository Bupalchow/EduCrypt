import React from 'react'
import { useState , useEffect } from 'react'
import { base } from '../firebase';
import{ref as textRef,push, get,set} from "firebase/database";
import {Button,Dialog,Card,CardBody,CardFooter,Typography,Input,DialogHeader,DialogBody,DialogFooter} from "@material-tailwind/react";

const Submit = () => {
  const [users, setUsers] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ytlink, setYtlink] = useState('');
  const [DeploymentLink, setDeplymentLink] = useState('');
  const [reviewData,setReviewData]=useState('');
  const[review,setReview]=useState({});
  const handleOpen = () => setOpen((cur) => !cur);
  const uploadImage =()=>{
    if(name=='' || description=='' || ytlink==''){
      alert('fill all required fields');
      return;
    } else{handleOpen();}

    const userRef = textRef(base, `users/${name}`);
    set(userRef, {
      name: name,
      description: description,
      ytlink: ytlink,
      DeploymentLink: DeploymentLink,
    });
    }
    const uploadReview = (path) => {
      if (reviewData === '') {
        alert('Please provide your thoughts about this project');
        return;
      } 
     
      const userReviewRef = push(textRef(base, `users/${path}/reviews`));
      set(userReviewRef, {
        review: reviewData
      });
    }
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await get(textRef(base, 'users/'));
      setUsers(snapshot.val());
    };

    fetchUsers();
  }, []);
    const getReview=(path)=>{ 
      const fetchReviews = async () => {
        const snapshot = await get(textRef(base, `users/${path}/reviews`));
        setReview(snapshot.val());
      };
    fetchReviews();
  }
  return (
    <div>
      <div className='flex items-center justify-center '>
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
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" className='bg-black' onClick={uploadImage}  fullWidth>
              SUbmit
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      <div className="flex  justify-around gap-5 flex-wrap">
      {Object.values(users).map((user) => {
         function getVideoId(url) {
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = url.match(regExp);
          return (match && match[2].length === 11) ? match[2] : null;
      }
          return (
            <div key={user.description} >
            <h1 className='text-3xl font-bold text-center my-5'>{user.name}</h1>
            <div id="videocontainer" className='flex items-center justify-center flex-wrap'>
            <iframe width="640" height="360" className='rounded my-5' src={`//www.youtube.com/embed/${getVideoId(user.ytlink)}`} allowFullScreen></iframe>
            </div>
            <div id='TextContainer' className='flex flex-col items-center align-middle'>
              <p className='font-semibold text-xl'>{user.description}</p>
              <a href={user.DeploymentLink} target="_blank" rel="noreferrer" className='font-bold underline text-xl'>Deployment Link</a>
              <Typography className="my-2 " variant="h6">
                Review about this project
              </Typography>
              <Input label="Review"  type='text' required onChange={event=>setReviewData(event.target.value)}/>
              <div className='flex gap-10'>
                <Button variant='gradient' className='bg-black mt-3' onClick={()=>getReview(user.name)}>Get Review</Button>
                <Button variant="gradient" className='bg-black mt-3' onClick={()=>uploadReview(user.name)} >submit</Button>
              </div>
              {Object.values(review).map((rev)=>{
                return <p>{rev.review}</p>
              })}
            </div>
            </div>
          );
      })}
      </div>
    </div>
  )
}

export default Submit
