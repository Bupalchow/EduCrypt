import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { BuyCourse } from "./Buy";
   
  export function CourseCard() {
    const CourseList=[
        {Img: 'https://www.bitdegree.org/courses/storage/course-image/learn-solidity-space-doggos.jpg' ,name:'Solidity Interactive Course' ,price: '10 ECR',des:'Learn Solidity with Space Doggo: an Interactive Solidity Tutorial',link:'https://www.bitdegree.org/courses/course/learn-solidity-space-doggos' },
        {Img: 'https://cryptozombies.io/blog/images/cover/cryptozombies-in-full-effect.png' ,name:'cryptozombies' ,price: '10 ECR',des:'Learn to Code Blockchain DApps by Building Simple Games', link:"https://cryptozombies.io/"}
    ]
    return (
    <div className="m-10 flex gap-10 ">
      {CourseList.map((CourseList)=>(
      <Card className="w-96">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={CourseList.Img}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {CourseList.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {CourseList.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {CourseList.des}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            
          >
            <BuyCourse link={CourseList.link}/>
          </Button>
        </CardFooter>
      </Card>
      ))}
      </div>
    );
  }