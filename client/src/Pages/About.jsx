import React from 'react'
import AboutEffect from '../components/AboutEffect'
import '../CSS/AboutPage.css'
export default function About() {
  return (
    <div >
      <div style={{transform: 'translate3d(0,0,0)'}}  className='overflow-hidden'>
        <AboutEffect/>
      </div>
      <div className='flex flex-col mx-40   '>
        <p>Welcome to our community-driven education platform where innovation meets learning. At EduCrypt, we're on a mission to revolutionize the way people engage with AI and Web3 technologies. Our platform offers a unique blend of AI-driven learning and a peer-to-peer review system, empowering individuals to enhance their skills, earn tokens, and contribute to a vibrant learning ecosystem.</p>
        <br></br>
        <h1>What Sets Us Apart?</h1>
        <p>Unlike traditional education platforms, Educrypt puts the power in the hands of the community. Through our innovative peer-to-peer review system, users can not only learn from expert-curated content but also engage with their peers, providing feedback and insights to foster collaborative learning.</p>
        <br/>
        <h1>How It Works?</h1>
        <p>Earn tokens by reviewing projects or submitting your own creations. These tokens can then be used to unlock more courses and learning opportunities within our platform. By incentivizing participation and contribution, we create a dynamic ecosystem where everyone has the opportunity to learn, grow, and succeed.</p>
        <br />
        <h1>Together, Let's Shape the Future of Education</h1>
        <p>At EduCrypt, we believe that education should be inclusive, interactive, and empowering. Join us as we harness the power of AI and Web3 technologies to reshape the educational landscape and unlock new opportunities for learners around the globe.

</p>
      </div>
    </div>
  )
}
