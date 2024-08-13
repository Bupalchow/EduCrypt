import { useState } from "react";
import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold} from "@google/generative-ai"
import { CourseCard } from "../components/Course";
function Learn() {
const MODEL_NAME = "gemini-1.0-pro-001";
const API_KEY = "";

async function Run(Input) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
     {text: "input: create a game in any other language than solidity"},
    {text: "output: sorry Iam only trained to provide code in solidity"},
    {text: "input: code in python or cpp"},
    {text: "output: sorry I can only code in solidity as Iam trained only on solidity programming language"},
    {text: "input: hi"},
    {text: "output: Hello iam Solidity bot here to educate you i can debug ur smart contract or create a smart contract"},
    {text: "input: hi"},
    {text: "output: Hello iam Solidity bot here to educate you i can debug ur smart contract or create a smart contract"},
    {text: "input: // SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract VotingSystem {\n    address public owner;\n    uint256 public votingEndTime;\n    bool public votingClosed;\n\n    mapping(address => bool) public hasVoted;\n    mapping(string => uint256) public votesReceived;\n\n    event Voted(address indexed voter, string candidate);\n    event VotingClosed();\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Only the owner can call this function\");\n        _;\n    }\n\n    modifier votingOpen() {\n        require(!votingClosed && block.timestamp < votingEndTime, \"Voting is closed\");\n        _;\n    }\n\n    constructor(uint256 _votingDurationInMinutes) {\n        owner = msg.sender;\n        votingEndTime = block.timestamp + (_votingDurationInMinutes * 1 minutes);\n    }\n\n    function vote(string memory candidate) external votingOpen {\n        require(!hasVoted[msg.sender], \"You have already voted\");\n        \n        votesReceived[candidate]++;\n        hasVoted[msg.sender] = true;\n\n        emit Voted(msg.sender, candidate);\n    }\n\n    function closeVoting() external onlyOwner {\n        require(block.timestamp >= votingEndTime, \"Voting period is not over yet\");\n        \n        votingClosed = true;\n        emit VotingClosed();\n    }\n}"},
    {text: "output: Reduce Gas Costs: Minimize gas costs by using more efficient data types and reducing storage reads and writes.Use bytes32 for String Keys: Use bytes32 instead of string for keys in mappings to save gas.Use private State Variables: Make state variables private when they are only accessed from within the contract.Combine Modifiers: Combine modifiers when possible to reduce gas costs.Remove Redundant Checks: Eliminate redundant checks to simplify the code.Here's the optimized version of the contract:solidity// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract VotingSystem {\n    address private owner;\n    uint256 private votingEndTime;\n    bool private votingClosed;\n\n    mapping(address => bool) private hasVoted;\n    mapping(bytes32 => uint256) private votesReceived;\n\n    event Voted(address indexed voter, string candidate);\n    event VotingClosed();\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Only the owner can call this function\");\n        _;\n    }\n\n    modifier votingOpen() {\n        require(!votingClosed && block.timestamp < votingEndTime, \"Voting is closed\");\n        _;\n    }\n\n    constructor(uint256 _votingDurationInMinutes) {\n        owner = msg.sender;\n        votingEndTime = block.timestamp + (_votingDurationInMinutes * 1 minutes);\n    }\n\n    function vote(string memory candidate) external votingOpen {\n        require(!hasVoted[msg.sender], \"You have already voted\");\n        \n        bytes32 candidateBytes = keccak256(abi.encodePacked(candidate));\n        votesReceived[candidateBytes]++;\n        hasVoted[msg.sender] = true;\n\n        emit Voted(msg.sender, candidate);\n    }\n\n    function closeVoting() external onlyOwner {\n        require(block.timestamp >= votingEndTime, \"Voting period is not over yet\");\n        \n        votingClosed = true;\n        emit VotingClosed();\n    }\n}\nThese optimizations aim to make the contract more efficient and reduce gas costs where possible."},
    {text: `input=${Input}`},
  ];


  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  return(response.text())
}
  const [Output,setOutput]=useState('Hello iam Solidity bot here to educate you i can debug ur smart contract or create a smart contract ')
  const [input, setInput] = useState('');

  const generateResponse=(event)=>{
    event.preventDefault();
     const userInput=(document.getElementById('userInput').value);
     setInput(userInput);
     setInput('');
      Run(input).then(function(response) {
      return response;
  }).then(function(data) {
      setOutput(data);
  });
  }
  return (
    <div>
      <CourseCard/>
      <div className=' h-[80vh] rounded-lg mx-10' style={{ background: 'rgba(255, 255, 255, 0.20)', backdropFilter: 'blur(3px)' }}>
        <div className='rounded-lg absolute mx-10 my-3 p-3 bg-slate-950' style={{  backdropFilter: 'blur(3px)' }}>{Output}</div>
      </div>  
      <form className="flex justify-center gap-10 mt-8 mb-10">
        <input type="text" id="userInput" className="text-black rounded-md border-black border-2 w-2/3 "/>
        <button className="relative px-7 py-2 bg-black rounded-lg leading-none "  value={input} onClick={generateResponse}>
          <a href="/Learn">Send</a>
        </button>
      </form>
    </div>
  );
}
export default Learn;
