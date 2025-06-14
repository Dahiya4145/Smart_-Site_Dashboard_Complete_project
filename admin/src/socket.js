// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:7700"); // backend server URL
export default socket;
