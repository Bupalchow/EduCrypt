import { useState } from "react";
import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold} from "@google/generative-ai"
function Learn() {
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyAvG3L9jIHuxDjfDuRNblRrnP5vAcnlC1Y";

async function Run(Input) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 5000,
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
    {text: "input: create a solidity program for voting system"},
    {text: "output: // SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract VotingSystem {\n    address public owner;\n    uint256 public votingEndTime;\n    bool public votingClosed;\n\n    mapping(address => bool) public hasVoted;\n    mapping(string => uint256) public votesReceived;\n\n    event Voted(address indexed voter, string candidate);\n    event VotingClosed();\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Only the owner can call this function\");\n        _;\n    }\n\n    modifier votingOpen() {\n        require(!votingClosed && block.timestamp < votingEndTime, \"Voting is closed\");\n        _;\n    }\n\n    constructor(uint256 _votingDurationInMinutes) {\n        owner = msg.sender;\n        votingEndTime = block.timestamp + (_votingDurationInMinutes * 1 minutes);\n    }\n\n    function vote(string memory candidate) external votingOpen {\n        require(!hasVoted[msg.sender], \"You have already voted\");\n        \n        votesReceived[candidate]++;\n        hasVoted[msg.sender] = true;\n\n        emit Voted(msg.sender, candidate);\n    }\n\n    function closeVoting() external onlyOwner {\n        require(block.timestamp >= votingEndTime, \"Voting period is not over yet\");\n        \n        votingClosed = true;\n        emit VotingClosed();\n    }\n}"},
    {text: "input: create a solidity code for storing and retriving data from blockchain"},
    {text: "output: // SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract DataStorage {\n    address public owner;\n    mapping(address => string) public userData;\n\n    event DataStored(address indexed user, string data);\n    event DataRetrieved(address indexed user, string data);\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Only the owner can call this function\");\n        _;\n    }\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    function storeData(string memory data) external {\n        userData[msg.sender] = data;\n        emit DataStored(msg.sender, data);\n    }\n\n    function retrieveData() external view returns (string memory) {\n        return userData[msg.sender];\n    }\n\n    function retrieveDataByAddress(address userAddress) external view returns (string memory) {\n        return userData[userAddress];\n    }\n\n    // Only the owner can set or update data for any address\n    function setUserData(address userAddress, string memory data) external onlyOwner {\n        userData[userAddress] = data;\n        emit DataStored(userAddress, data);\n    }\n}"},
    {text: "input: create a game in any other language than solidity"},
    {text: "output: sorry Iam only trained to provide code in solidity"},
    {text: "input: code in python or cpp"},
    {text: "output: sorry I can only code in solidity as Iam trained only on solidity programming language"},
    {text: "input: code a simple game"},
    {text: "output: // SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract GuessingGame {\n    address public owner;\n    uint8 public secretNumber;\n    bool public gameEnded;\n\n    event GameStarted();\n    event GameEnded(address indexed player, bool won);\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Only the owner can call this function\");\n        _;\n    }\n\n    modifier gameInProgress() {\n        require(!gameEnded, \"The game has already ended\");\n        _;\n    }\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    function startGame() external onlyOwner {\n        require(!gameEnded, \"The game has already ended\");\n\n        // Generate a random number between 1 and 10\n        secretNumber = uint8(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 10 + 1;\n\n        emit GameStarted();\n    }\n\n    function guess(uint8 playerGuess) external gameInProgress {\n        require(playerGuess >= 1 && playerGuess <= 10, \"Please guess a number between 1 and 10\");\n\n        if (playerGuess == secretNumber) {\n            gameEnded = true;\n            emit GameEnded(msg.sender, true);\n        } else {\n            emit GameEnded(msg.sender, false);\n        }\n    }\n\n    function getSecretNumber() external view onlyOwner returns (uint8) {\n        return secretNumber;\n    }\n}"},
    {text: `input: ${Input}`},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  return(response.text())
}
  const [Output,setOutput]=useState('')
  const [input, setInput] = useState('');

  const generateResponse=(event)=>{
    event.preventDefault();
     setInput(document.getElementById('userInput').value);
      Run(input).then(function(response) {
      return response;
  }).then(function(data) {
      setOutput(data);
      setInput('');
  });
  }
  return (
    <div>
      <div className=' h-[80vh] rounded-lg mx-10' style={{ background: 'rgba(255, 255, 255, 0.20)', backdropFilter: 'blur(3px)' }}>
        <div className='rounded-lg absolute mx-10 my-3 p-3 bg-slate-950' style={{  backdropFilter: 'blur(3px)' }}>{Output}</div>
      </div>  
      <form className="flex justify-center gap-10 mt-8 ">
        <input type="text" id="userInput" className="text-black rounded-md border-black border-2"/>
        <button className="relative px-7 py-2 bg-black rounded-lg leading-none "  value={input} onClick={generateResponse}>
          <a href="/Learn">Send</a>
        </button>
      </form>
    </div>
  );
}
export default Learn;
